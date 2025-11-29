';/use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

declare_id!("DCAvau1tXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

#[program]
pub mod dca_vault {
    use super::*;

    /// Initialize a new DCA vault
    pub fn initialize_vault(
        ctx: Context<InitializeVault>,
        amount_per_cycle: u64,
        frequency_seconds: i64,
        total_cycles: u16,
    ) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        
        vault.owner = ctx.accounts.owner.key();
        vault.source_mint = ctx.accounts.source_mint.key();
        vault.dest_mint = ctx.accounts.dest_mint.key();
        vault.amount_per_cycle = amount_per_cycle;
        vault.frequency_seconds = frequency_seconds;
        vault.total_cycles = total_cycles;
        vault.executed_cycles = 0;
        vault.total_deposited = 0;
        vault.total_received = 0;
        vault.last_execution = Clock::get()?.unix_timestamp;
        vault.next_execution = Clock::get()?.unix_timestamp + frequency_seconds;
        vault.status = VaultStatus::Active;
        vault.bump = ctx.bumps.vault;

        msg!("DCA Vault initialized: {}", vault.key());
        msg!("Amount per cycle: {}", amount_per_cycle);
        msg!("Frequency: {} seconds", frequency_seconds);
        msg!("Total cycles: {}", total_cycles);

        Ok(())
    }

    /// Deposit tokens into vault
    pub fn deposit(ctx: Context<DepositToVault>, amount: u64) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        
        require!(
            vault.status == VaultStatus::Active,
            ErrorCode::VaultNotActive
        );

        // Transfer tokens from user to vault
        let cpi_accounts = Transfer {
            from: ctx.accounts.user_token_account.to_account_info(),
            to: ctx.accounts.vault_token_account.to_account_info(),
            authority: ctx.accounts.owner.to_account_info(),
        };
        
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        
        token::transfer(cpi_ctx, amount)?;

        vault.total_deposited += amount;

        msg!("Deposited {} tokens to vault", amount);
        msg!("Total deposited: {}", vault.total_deposited);

        Ok(())
    }

    /// Execute DCA swap (called by backend worker with session key)
    pub fn execute_dca(ctx: Context<ExecuteDCA>) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        let clock = Clock::get()?;

        // Validate execution timing
        require!(
            clock.unix_timestamp >= vault.next_execution,
            ErrorCode::TooEarlyToExecute
        );

        require!(
            vault.executed_cycles < vault.total_cycles,
            ErrorCode::AllCyclesCompleted
        );

        require!(
            vault.status == VaultStatus::Active,
            ErrorCode::VaultNotActive
        );

        // Validate sufficient balance
        let vault_balance = ctx.accounts.vault_token_account.amount;
        require!(
            vault_balance >= vault.amount_per_cycle,
            ErrorCode::InsufficientBalance
        );

        // Transfer tokens for swap (simplified - in production, integrate with Jupiter)
        let seeds = &[
            b"vault",
            vault.owner.as_ref(),
            vault.source_mint.as_ref(),
            vault.dest_mint.as_ref(),
            &[vault.bump],
        ];
        let signer = &[&seeds[..]];

        let cpi_accounts = Transfer {
            from: ctx.accounts.vault_token_account.to_account_info(),
            to: ctx.accounts.swap_program_account.to_account_info(),
            authority: vault.to_account_info(),
        };

        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);

        token::transfer(cpi_ctx, vault.amount_per_cycle)?;

        // Update vault state
        vault.executed_cycles += 1;
        vault.last_execution = clock.unix_timestamp;
        vault.next_execution = clock.unix_timestamp + vault.frequency_seconds;

        // Check if all cycles complete
        if vault.executed_cycles >= vault.total_cycles {
            vault.status = VaultStatus::Completed;
        }

        msg!("DCA executed - Cycle {}/{}", vault.executed_cycles, vault.total_cycles);
        msg!("Next execution: {}", vault.next_execution);

        Ok(())
    }

    /// Pause vault
    pub fn pause_vault(ctx: Context<UpdateVault>) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        vault.status = VaultStatus::Paused;
        
        msg!("Vault paused");
        Ok(())
    }

    /// Resume vault
    pub fn resume_vault(ctx: Context<UpdateVault>) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        
        require!(
            vault.status == VaultStatus::Paused,
            ErrorCode::VaultNotPaused
        );

        vault.status = VaultStatus::Active;
        vault.next_execution = Clock::get()?.unix_timestamp + vault.frequency_seconds;
        
        msg!("Vault resumed");
        Ok(())
    }

    /// Close vault and withdraw remaining funds
    pub fn close_vault(ctx: Context<CloseVault>) -> Result<()> {
        let vault = &ctx.accounts.vault;
        
        // Transfer all remaining tokens back to owner
        let vault_balance = ctx.accounts.vault_token_account.amount;
        
        if vault_balance > 0 {
            let seeds = &[
                b"vault",
                vault.owner.as_ref(),
                vault.source_mint.as_ref(),
                vault.dest_mint.as_ref(),
                &[vault.bump],
            ];
            let signer = &[&seeds[..]];

            let cpi_accounts = Transfer {
                from: ctx.accounts.vault_token_account.to_account_info(),
                to: ctx.accounts.owner_token_account.to_account_info(),
                authority: vault.to_account_info(),
            };

            let cpi_program = ctx.accounts.token_program.to_account_info();
            let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);

            token::transfer(cpi_ctx, vault_balance)?;
        }

        msg!("Vault closed - {} tokens returned", vault_balance);
        Ok(())
    }
}

// ============================================
// Account Contexts
// ============================================

#[derive(Accounts)]
pub struct InitializeVault<'info> {
    #[account(
        init,
        payer = owner,
        space = 8 + Vault::LEN,
        seeds = [
            b"vault",
            owner.key().as_ref(),
            source_mint.key().as_ref(),
            dest_mint.key().as_ref(),
        ],
        bump
    )]
    pub vault: Account<'info, Vault>,

    #[account(mut)]
    pub owner: Signer<'info>,

    /// CHECK: Source token mint
    pub source_mint: AccountInfo<'info>,
    
    /// CHECK: Destination token mint
    pub dest_mint: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DepositToVault<'info> {
    #[account(
        mut,
        seeds = [
            b"vault",
            vault.owner.as_ref(),
            vault.source_mint.as_ref(),
            vault.dest_mint.as_ref(),
        ],
        bump = vault.bump,
        has_one = owner,
    )]
    pub vault: Account<'info, Vault>,

    #[account(mut)]
    pub owner: Signer<'info>,

    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub vault_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct ExecuteDCA<'info> {
    #[account(
        mut,
        seeds = [
            b"vault",
            vault.owner.as_ref(),
            vault.source_mint.as_ref(),
            vault.dest_mint.as_ref(),
        ],
        bump = vault.bump,
    )]
    pub vault: Account<'info, Vault>,

    /// CHECK: Session key authority (validated in backend)
    pub session_authority: Signer<'info>,

    #[account(mut)]
    pub vault_token_account: Account<'info, TokenAccount>,

    /// CHECK: Swap program account
    #[account(mut)]
    pub swap_program_account: AccountInfo<'info>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct UpdateVault<'info> {
    #[account(
        mut,
        seeds = [
            b"vault",
            vault.owner.as_ref(),
            vault.source_mint.as_ref(),
            vault.dest_mint.as_ref(),
        ],
        bump = vault.bump,
        has_one = owner,
    )]
    pub vault: Account<'info, Vault>,

    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct CloseVault<'info> {
    #[account(
        mut,
        seeds = [
            b"vault",
            vault.owner.as_ref(),
            vault.source_mint.as_ref(),
            vault.dest_mint.as_ref(),
        ],
        bump = vault.bump,
        has_one = owner,
        close = owner
    )]
    pub vault: Account<'info, Vault>,

    #[account(mut)]
    pub owner: Signer<'info>,

    #[account(mut)]
    pub vault_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub owner_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

// ============================================
// State
// ============================================

#[account]
pub struct Vault {
    pub owner: Pubkey,              // 32
    pub source_mint: Pubkey,        // 32
    pub dest_mint: Pubkey,          // 32
    pub amount_per_cycle: u64,      // 8
    pub frequency_seconds: i64,     // 8
    pub total_cycles: u16,          // 2
    pub executed_cycles: u16,       // 2
    pub total_deposited: u64,       // 8
    pub total_received: u64,        // 8
    pub last_execution: i64,        // 8
    pub next_execution: i64,        // 8
    pub status: VaultStatus,        // 1
    pub bump: u8,                   // 1
}

impl Vault {
    pub const LEN: usize = 32 + 32 + 32 + 8 + 8 + 2 + 2 + 8 + 8 + 8 + 8 + 1 + 1;
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum VaultStatus {
    Active,
    Paused,
    Completed,
    Cancelled,
}

// ============================================
// Errors
// ============================================

#[error_code]
pub enum ErrorCode {
    #[msg("Vault is not active")]
    VaultNotActive,
    
    #[msg("Too early to execute DCA")]
    TooEarlyToExecute,
    
    #[msg("All cycles have been completed")]
    AllCyclesCompleted,
    
    #[msg("Insufficient balance in vault")]
    InsufficientBalance,
    
    #[msg("Vault is not paused")]
    VaultNotPaused,
}
