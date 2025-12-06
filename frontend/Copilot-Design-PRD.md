# SOLANA COPILOT — FRONTEND & DESIGN PRD
## Applying the Core 1% Concept

**Document Version:** 1.0  
**Last Updated:** December 6, 2025  
**Audience:** Design, Frontend Engineering, Product Teams  
**Framework:** Core 1% Concept (Function, Vibe, Layout)

---

## TABLE OF CONTENTS

1. [Executive Overview](#executive-overview)
2. [Design Philosophy](#design-philosophy)
3. [Core 1% Framework Breakdown](#core-1-framework-breakdown)
4. [Landing Page Architecture](#landing-page-architecture)
5. [Page-by-Page Design Specs](#page-by-page-design-specs)
6. [Design System & Components](#design-system--components)
7. [Interaction Patterns](#interaction-patterns)
8. [Performance & Accessibility](#performance--accessibility)
9. [Implementation Guide](#implementation-guide)

---

## EXECUTIVE OVERVIEW

### Challenge
Solana Copilot is a sophisticated AI-powered wallet automation tool. Without clear design direction, we risk:
- ❌ Generic, overwhelming UI (scary for beginners)
- ❌ Technical jargon overload (confusing for non-technical users)
- ❌ Lack of differentiation (competes poorly with Phantom, Magic Eden)

### Solution: The Core 1% Framework
By deliberately choosing our **Function**, **Vibe**, and **Layout**, we create a cohesive, memorable product that stands out.

### Design Thesis
**"Solana Copilot is a SaaS dashboard that feels like talking to a smart financial advisor—intelligent, trustworthy, never intimidating."**

---

## DESIGN PHILOSOPHY

### Core Principles

1. **Trustworthiness First**
   - Finance = trust. Every pixel must communicate safety.
   - Clear, readable typography with plenty of whitespace.
   - No dark patterns; explicit approvals, not dark defaults.

2. **Complexity Hidden, Power Visible**
   - AI orchestration handles complex workflows; users see simple buttons.
   - Advanced features available but not shoved in faces.
   - Progressive disclosure: novice → expert.

3. **Conversational Over Clinical**
   - Tone: Helpful financial advisor, not bank robot.
   - Copy: "Let's rebalance your portfolio" not "Initiate portfolio rebalancing."
   - Chat-first interface makes tech feel approachable.

4. **Speed Without Sacrifice**
   - Real-time price updates, instant approvals.
   - Zero loading spinners—skeleton screens instead.
   - Responsive across mobile, tablet, desktop.

5. **Accessibility as Feature**
   - WCAG 2.1 AA compliance from day one.
   - Color contrast, keyboard nav, screen reader support.
   - Inclusive design attracts broader user base.

---

## CORE 1% FRAMEWORK BREAKDOWN

### Step 1: Define the Function (The "What")

#### Primary Function
**SaaS Dashboard + Conversational Interface**
- Dashboard: Real-time portfolio tracking, risk metrics, automation history
- Chat Interface: Natural language commands (primary interaction model)
- Automation Control Center: DCA, recurring swaps, rebalancing rules

#### Secondary Functions
- Portfolio Analysis: Risk scoring, PnL tracking, volatility alerts
- Transaction History: Full audit trail with AI reasoning
- Settings: Automation management, session keys, preferences

#### What This Means for Design
✅ **Dashboard-centric layout** (data visualization takes priority)  
✅ **Chat always visible** (either sidebar or floating widget)  
✅ **Action buttons prominent** (swap, stake, automate are 1-click away)  
✅ **Clear call-to-actions** (every page has 2-3 primary CTAs)

---

### Step 2: Choose the Aesthetic (The "Vibe")

#### Aesthetic Framework: "Glass Clarity"

**Why Not:**
- ❌ Neo-Brutalism (too edgy for finance)
- ❌ Dark Academia (too academic)
- ❌ Y2K (too playful)

**Why "Glass Clarity":**
- ✅ **Glassmorphism** (frosted glass + transparency = modern + trustworthy)
- ✅ **Aurora Gradients** (soft, premium feel; not harsh)
- ✅ **High Contrast Text** (accessibility + clarity)
- ✅ **Generous Whitespace** (reduces cognitive load)

#### Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary | Teal | #2080A0 | CTAs, active states, highlights |
| Secondary | Slate Blue | #64748B | Borders, secondary buttons, accents |
| Success | Emerald | #10B981 | Positive numbers, confirmations |
| Warning | Amber | #F59E0B | Cautions, pending states |
| Error | Rose | #F43F5E | Losses, errors, deletions |
| Neutral BG | Off-White | #F8FAFC | Light backgrounds, cards |
| Neutral Text | Charcoal | #1E293B | Primary text |

#### Typography

| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| Logo/Hero | Inter | 48px | 700 | 1.2 |
| Page Title | Inter | 32px | 700 | 1.3 |
| Section Header | Inter | 20px | 600 | 1.4 |
| Body Text | Inter | 14px | 400 | 1.6 |
| Small Text/Labels | Inter | 12px | 500 | 1.5 |
| Code/Numbers | IBM Plex Mono | 13px | 400 | 1.5 |

#### Visual Effects

1. **Glassmorphism Cards**
   - Background: `rgba(255, 255, 255, 0.7)` with backdrop blur
   - Border: `1px solid rgba(0, 0, 0, 0.1)`
   - Shadow: Soft glow (no harsh shadows)
   - Used for: Main dashboard cards, modals, overlays

2. **Aurora Gradients**
   - Bottom: Teal → Slate Blue
   - Applied to: Hero sections, CTAs, accent backgrounds
   - Opacity: 0.3–0.5 (subtle, not overwhelming)

3. **Micro-interactions**
   - Hover: +5% lightness, +2px shadow
   - Click: -5% lightness, inset shadow
   - Load: Skeleton screens (no spinners)
   - Success: Checkmark animation (500ms bounce)

---

### Step 3: Define the Layout (The "How")

#### Chosen Layout: "Bento Grid with Chat Sidebar"

**Why This Layout:**
- ✅ Bento grids organize data dashboards (features, holdings, metrics)
- ✅ Chat sidebar keeps conversation always accessible
- ✅ Split-attention friendly (data + conversation in one view)
- ✅ Mobile-responsive (sidebar collapses on small screens)

#### Layout Breakdown

```
┌─────────────────────────────────────┬──────────────┐
│                                     │              │
│   LEFT: MAIN DASHBOARD              │  RIGHT: CHAT │
│   (Bento Grid)                      │   SIDEBAR    │
│                                     │              │
│  ┌──────────┬──────────┐           │  ┌─────────┐ │
│  │ Portfolio│Risk Score│           │  │ AI Chat │ │
│  │  Value   │  Gauge   │           │  │         │ │
│  └──────────┴──────────┘           │  │ [Input] │ │
│                                     │  └─────────┘ │
│  ┌──────────┬──────────┐           │              │
│  │Holdings  │Automation│           │              │
│  │ Donut    │ Timeline │           │              │
│  └──────────┴──────────┘           │              │
│                                     │              │
│  ┌──────────────────────┐          │              │
│  │ Trending Alerts      │          │              │
│  └──────────────────────┘          │              │
│                                     │              │
└─────────────────────────────────────┴──────────────┘
```

**Desktop (1200px+):** 70% content, 30% chat  
**Tablet (768px-1199px):** 60% content, 40% chat (or full-width tabs)  
**Mobile (<768px):** 100% full-width, chat as modal overlay

---

## LANDING PAGE ARCHITECTURE

### Landing Page Purpose
Convert visitors → authenticated users. Primary CTA: **"Start Trading Smarter"**

### Hero Section

#### Copy
**Headline:** "Your AI Financial Advisor on Solana"  
**Subheading:** "Execute swaps, automate DCAs, analyze portfolio risk—all through natural language. No gas wars, no complexity."

#### Visual
- **Hero Image:** Animated mockup of AI chat + dashboard interaction (loop 4s)
- **Overlay Gradient:** Aurora gradient (20% opacity)
- **CTA Button:** Large "Start Free" button (Teal, with arrow icon)
- **Secondary CTA:** "Explore Docs" (text link)

#### Copy Tone
✅ Conversational ("Your AI Financial Advisor")  
✅ Benefit-focused ("Execute swaps...analyze risk")  
✅ Action-oriented ("Start Free")  
✅ No tech jargon ("No gas wars" = relatable, not "optimize RPC calls")

---

### Feature Section

#### Layout: Bento Grid of 6 Cards

```
┌──────────────────────────────────────────────────┐
│                 FEATURES                         │
├──────────────┬──────────────┬──────────────┐     │
│   1. Chat    │   2. DCA     │ 3. Portfolio │     │
│   Commands   │  Automation  │   Analytics  │     │
│   (2x1 box)  │   (1x1 box)  │  (1x1 box)   │     │
├──────────────┼──────────────┴──────────────┤     │
│ 4. Risk      │ 5. Multi-Sig │ 6. API       │     │
│ Scoring      │ (DAO Ready)  │ Framework    │     │
│ (1x1 box)    │ (1x1 box)    │ (1x1 box)    │     │
└──────────────┴──────────────┴──────────────┘     │
```

#### Feature Card Template

**Card Design:**
- Glassmorphic background (frosted glass effect)
- Icon (Feather icons, 48px)
- Title (20px, bold)
- 1-line description (14px, neutral gray)
- "Learn More →" link (hover: teal)

**Card Example:**

```
┌─────────────────────────────┐
│  💬 Natural Language Chat   │
│                             │
│  "Swap 20 USDC to SOL"      │
│  AI handles routing,        │
│  simulation, execution.     │
│                             │
│  Learn More →               │
└─────────────────────────────┘
```

---

### Social Proof Section

#### Layout: Three-Column Testimonial Grid

```
┌─────────────────────────────────────┐
│         USER TESTIMONIALS           │
├──────────────┬──────────────┬───────┤
│ "Reduced my   │ "Finally a  │ "DAOs │
│  trading      │  wallet     │  can  │
│  time by 80%"  │  that gets  │  auto-│
│                │  me"        │  mate"│
│ — Alex, Trader │— Jamie, New│— Morgan│
│                │  User      │  Treasurer
└──────────────┴──────────────┴───────┘
```

**Design:**
- Quote marks in teal (20px, 30% opacity)
- Name + title in small text (12px, charcoal)
- No photos (privacy), just initials in circle
- Hover: Slight lift + shadow

---

### Pricing Section

#### Table Design

| Feature | Free | Pro | Enterprise |
|---------|------|-----|-----------|
| Chat Trading | ✓ | ✓ | ✓ |
| DCA (limit) | 3 | ∞ | ∞ |
| Risk Analytics | ✓ | ✓ | ✓ |
| API Access | - | ✓ | ✓ |
| Support | Email | Priority | Dedicated |
| Price | $0 | $9/mo | Custom |

**Design:**
- Glassmorphic cards
- Pro tier highlighted (Aurora gradient background)
- CTA buttons per tier ("Get Started", "Upgrade", "Contact")
- Toggle: Monthly/Yearly (yearly = 20% discount)

---

### CTA Section (Bottom)

**Copy:** "Join 50K+ Traders Automating Their Portfolios"  
**Button:** Large "Start Free" (Teal) + "View Docs" (Secondary)  
**Subtext:** "No credit card required. 100% non-custodial."

---

## PAGE-BY-PAGE DESIGN SPECS

### Page 1: Dashboard

#### Hero Area
```
┌──────────────────────────────────────┐
│  Portfolio Overview                  │
│  Updated 2 seconds ago               │
│                                      │
│  Total Value: $15,234.50             │
│  24h Change: +$123.45 (+0.8%)       │
│  [Risk Gauge: ●●●○○ Medium]         │
│                                      │
│  [Quick Actions: Swap | Stake | Send]│
└──────────────────────────────────────┘
```

#### Bento Grid Layout

**Cell 1: Holdings** (2x1, left)
- Donut chart (SOL 60%, USDC 30%, Other 10%)
- Hover: Show percentage overlay
- Click: Expand to table

**Cell 2: Portfolio Performance** (2x1, right)
- Line chart (7d, 30d, YTD tabs)
- Moving average line (teal)
- Filled area under curve (aurora gradient, 20% opacity)

**Cell 3: Active Automations** (1x1, bottom-left)
- Next DCA execution timer
- Cards: "Daily $100 DCA (SOL)" with status badge
- [Pause] [Edit] buttons

**Cell 4: Recent Transactions** (1x1, bottom-right)
- Table: Date | Action | Amount | Fee | Status
- Success (emerald ✓), Pending (amber ⏳), Failed (rose ✗)
- Infinite scroll

---

### Page 2: Chat/Trade Interface

#### Chat Sidebar (Right)

**Chat Window:**
```
┌─────────────────────────────────────┐
│ AI Chat                    [Minimize]│
├─────────────────────────────────────┤
│                                     │
│ [AI] Hi! How can I help you trade?  │
│                                     │
│ [You] Swap 20 USDC to SOL           │
│                                     │
│ [AI] I'll swap 20 USDC for ~0.048   │
│ SOL via Orca. Estimated fee: $0.01. │
│ [SIMULATE] [APPROVE]                │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ [Type your message...] [Send ▶] │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Design Notes:**
- User messages: Right-aligned, teal background
- AI messages: Left-aligned, glassmorphic background
- Interactive elements (buttons) have cursor pointer + hover state
- Loading state: Typing indicator (...) with dots animation

---

### Page 3: Portfolio Analysis

#### Risk Dashboard

```
┌──────────────────────────────────────┐
│ Portfolio Risk Analysis              │
├──────────────────────────────────────┤
│                                      │
│ Risk Score: 45/100 [●●●○○] Medium   │
│                                      │
│ Metrics:                             │
│ ├─ Volatility: 8.5% (yellow)         │
│ ├─ Max Drawdown: -12.3% (orange)     │
│ ├─ Concentration: 70% SOL (red)      │
│ └─ Correlation: 0.82 (neutral)       │
│                                      │
│ AI Insights:                         │
│ "High SOL concentration (70%) exposes │
│  you to single-token risk. Consider  │
│  diversifying to 50/30/20."          │
│                                      │
│ [Rebalance Portfolio] [Learn More]   │
└──────────────────────────────────────┘
```

**Design:**
- Gauge chart (0-100) with color gradient (green→red)
- Icon + metric + visual bar for each metric
- "AI Insights" in italic quote style
- CTA buttons below insights

---

### Page 4: Automations

#### Automation Management

```
┌──────────────────────────────────────┐
│ My Automations                       │
├──────────────────────────────────────┤
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ Daily $100 DCA (USDC → SOL)      │ │
│ │ Status: ● Active                 │ │
│ │ Next: Nov 30, 00:00 UTC          │ │
│ │ Total Volume: $5,000 (50 executions)
│ │                                  │ │
│ │ [Pause] [Edit] [History] [Delete]│ │
│ └──────────────────────────────────┘ │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ Weekly Rebalance (50/50)         │ │
│ │ Status: ● Active                 │ │
│ │ Next: Dec 3, 09:00 UTC           │ │
│ │ ...                              │ │
│ └──────────────────────────────────┘ │
│                                      │
│ [+ Create New Automation]            │
└──────────────────────────────────────┘
```

**Design:**
- Card per automation (glassmorphic)
- Status badge (green dot = active, gray = paused)
- Countdown timer (next execution)
- Action buttons (hover reveals secondary options)

---

### Page 5: Settings

#### Settings Structure

```
Navigation (Left Sidebar):
├─ Account
├─ Security
├─ Automations
├─ Notifications
├─ Appearance
└─ Developer (API Keys)

Content (Right Panel):
[Settings form for selected category]
```

**Appearance Settings Example:**
```
┌──────────────────────────────────────┐
│ Appearance                           │
├──────────────────────────────────────┤
│                                      │
│ Theme:                               │
│ ○ Light  ● Dark  ○ Auto              │
│                                      │
│ Currency: [USD ▼]                    │
│                                      │
│ Chart Style:                         │
│ ● Candlestick  ○ Line  ○ Area        │
│                                      │
│ Notification Sound: ✓ Enabled        │
│                                      │
│ [Save Changes]                       │
└──────────────────────────────────────┘
```

---

## DESIGN SYSTEM & COMPONENTS

### Component Library

#### 1. Buttons

**Primary Button (CTA)**
```
Background: Teal (#2080A0)
Text: White, 14px, bold
Padding: 12px 24px
Border Radius: 8px
Hover: Aurora gradient overlay, +2px shadow
Active: Inset shadow, -2% lightness
```

**Secondary Button**
```
Background: Transparent
Border: 2px solid Slate (#64748B)
Text: Slate, 14px, bold
Padding: 10px 22px
Hover: Background becomes 10% slate
```

**Tertiary (Text Link)**
```
Text: Teal, 14px, underlined
Hover: Darker teal, thicker underline
```

---

#### 2. Input Fields

**Text Input**
```
Border: 1px solid #E2E8F0 (light gray)
Padding: 10px 12px
Border Radius: 6px
Font: 14px, Inter
Focus: Border becomes teal, glow shadow
Error State: Border red, error icon right
```

**Dropdown Select**
```
Border: Same as text input
Background: Off-white with dropdown arrow
Hover: Slight shadow
Open: Border teal, dropdown visible
```

---

#### 3. Cards

**Standard Card**
```
Background: rgba(255, 255, 255, 0.7) with backdrop blur
Border: 1px solid rgba(0, 0, 0, 0.1)
Padding: 16px
Border Radius: 12px
Hover: +4px shadow, +2% lightness
Shadow: 0 4px 12px rgba(0, 0, 0, 0.04)
```

**Highlighted Card (Featured)**
```
Background: Aurora gradient (teal → slate blue, 20% opacity)
Border: 1px solid teal
Padding: 16px
Ring: 2px solid teal (optional, very subtle)
```

---

#### 4. Badges & Status Indicators

**Status Badge**
```
Active: ● Green (emerald)
Paused: ● Gray (slate)
Pending: ● Amber (yellow)
Error: ● Red (rose)
Font: 12px, bold, uppercase
Padding: 4px 12px
Border Radius: 16px
Background: Status color at 10% opacity
```

---

#### 5. Modals & Overlays

**Modal Dialog**
```
Overlay: 0 0 0 / 50% (rgba black)
Modal: Glassmorphic card (same as above)
Max Width: 600px
Padding: 32px
Title: 32px, bold
Close: X icon (top-right), hover red
```

**Transaction Approval Modal**
```
Title: "Confirm Transaction"
Content: 
  ├─ From: 20 USDC
  ├─ To: ~0.048 SOL
  ├─ Fee: $0.0015
  ├─ Route: Orca
  └─ Price Impact: 0.05%
Buttons: [Cancel] [Approve]
```

---

### Animation Guidelines

| Trigger | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Hover Button | Scale 1.02 + shadow | 200ms | ease-out |
| Click Button | Scale 0.98 + inset | 100ms | ease-in |
| Load Cards | Fade in + slide up | 400ms | ease-out |
| Success | Checkmark bounce | 500ms | cubic-bezier |
| Loading | Skeleton pulse | 2s | infinite |
| Alert Slide | Slide from top | 300ms | ease-out |

---

## INTERACTION PATTERNS

### Pattern 1: Chat-to-Action Flow

```
User Types in Chat:
"Swap 20 USDC to SOL"
    ↓
AI Classifies Intent
    ↓
Show Preview Inline:
"I'll swap 20 USDC for ~0.048 SOL via Orca. 
Estimated fee: $0.0015. [SIMULATE] [APPROVE]"
    ↓
User Clicks [SIMULATE]:
Modal Shows Full Breakdown
    ↓
User Clicks [APPROVE]:
Transaction Executes (no additional signing if session key valid)
    ↓
Success Message:
"✓ Swap complete! 20 USDC → 0.048 SOL. Tx: [link]"
```

---

### Pattern 2: Approval Levels

| Risk Level | Approval Method | UX |
|------------|-----------------|-----|
| Low (<$100, known token) | Auto (session key) | Toast: "Swap complete" |
| Medium ($100-$1K) | Explicit approval | Modal: "Confirm?" |
| High (>$1K, new token) | Double confirm | Modal: "⚠️ High-risk. Confirm?" + checkbox |

---

### Pattern 3: Real-Time Updates

**Price Updates:**
- Every 1 second (no full page refresh)
- Delta indicator: ↑ (green) or ↓ (red)
- Example: "$200.45 ↑ +2.1% (24h)"

**Portfolio Value:**
- Updates on transaction
- Smooth number animation (500ms)
- Example: "$15,234.50" → "$15,358.95"

---

## PERFORMANCE & ACCESSIBILITY

### Performance Targets

| Metric | Target | How |
|--------|--------|-----|
| Largest Contentful Paint (LCP) | <2.5s | Image optimization, Next.js streaming |
| Cumulative Layout Shift (CLS) | <0.1 | Skeleton loaders, fixed dimensions |
| First Input Delay (FID) | <100ms | Debounced handlers, Web Workers |
| Time to Interactive (TTI) | <3s | Code splitting, lazy loading |

---

### Accessibility Requirements

| Standard | Requirement | Implementation |
|----------|-------------|-----------------|
| WCAG 2.1 AA | Color contrast ≥4.5:1 | Test with WAVE, Axe DevTools |
| Keyboard Nav | Tab through all elements | Focus visible rings (2px teal) |
| Screen Readers | Semantic HTML + ARIA labels | `aria-label`, `role` attributes |
| Motion | Respect `prefers-reduced-motion` | CSS: `@media (prefers-reduced-motion)` |
| Form Labels | Associated with inputs | `<label for="id">` pattern |

---

## IMPLEMENTATION GUIDE

### Tech Stack

**Frontend:**
- Next.js 14 (App Router, Server Components)
- TypeScript
- TailwindCSS (pre-configured with design system)
- Shadcn/UI (unstyled components for customization)
- Recharts (data visualization)
- Zustand (state management)

**Design Handoff:**
- Figma file with all components (link: [TBD])
- Component library (Storybook): [TBD]
- Design tokens (CSS variables): Pre-built in tailwind.config.js

---

### File Structure

```
/frontend
├── /app
│   ├── layout.tsx
│   ├── page.tsx (landing)
│   ├── /dashboard
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── /portfolio
│   │   └── page.tsx
│   ├── /automations
│   │   └── page.tsx
│   └── /settings
│       └── page.tsx
├── /components
│   ├── /ui (shared)
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── ...
│   ├── /chat
│   │   ├── ChatWidget.tsx
│   │   ├── ChatMessage.tsx
│   │   └── ChatInput.tsx
│   ├── /dashboard
│   │   ├── PortfolioOverview.tsx
│   │   ├── HoldingsChart.tsx
│   │   └── ...
├── /styles
│   ├── globals.css (design system tokens)
│   └── animations.css
├── /hooks
│   ├── usePortfolio.ts
│   ├── useChat.ts
│   └── ...
└── /lib
    ├── utils.ts
    └── constants.ts
```

---

### Design Token Export (CSS Variables)

```css
/* /styles/globals.css */

:root {
  /* Colors */
  --primary: #2080A0;
  --primary-hover: #1A6585;
  --secondary: #64748B;
  --success: #10B981;
  --warning: #F59E0B;
  --error: #F43F5E;
  --neutral-bg: #F8FAFC;
  --neutral-text: #1E293B;
  
  /* Typography */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 20px;
  --font-size-xl: 32px;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Border Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 12px 24px rgba(0, 0, 0, 0.12);
}
```

---

### Responsive Breakpoints

```typescript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'mobile': '320px',
      'tablet': '768px',
      'desktop': '1024px',
      'wide': '1280px',
      'ultra': '1920px',
    },
  },
};
```

---

### Component Example: Button

```typescript
// components/ui/Button.tsx
import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled,
}) => {
  const baseStyles = 'font-semibold transition-all duration-200 ease-out';
  
  const variantStyles = {
    primary: 'bg-primary text-white hover:shadow-lg active:inset-shadow',
    secondary: 'border-2 border-secondary text-secondary hover:bg-slate-100',
    tertiary: 'text-primary underline hover:text-primary-hover',
  };
  
  const sizeStyles = {
    sm: 'px-12 py-4 text-12px',
    md: 'px-24 py-12 text-14px',
    lg: 'px-32 py-16 text-16px',
  };
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
```

---

### Component Example: Chat Message

```typescript
// components/chat/ChatMessage.tsx
interface ChatMessageProps {
  role: 'user' | 'ai';
  content: string;
  actions?: { label: string; onClick: () => void }[];
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  role,
  content,
  actions,
}) => {
  const isUser = role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-12`}>
      <div
        className={`
          max-w-md px-12 py-8 rounded-lg
          ${isUser
            ? 'bg-primary text-white rounded-br-none'
            : 'bg-white/70 border border-gray-200 rounded-bl-none'
          }
        `}
      >
        <p className="text-14px leading-relaxed">{content}</p>
        
        {actions && (
          <div className="flex gap-8 mt-12">
            {actions.map((action) => (
              <button
                key={action.label}
                onClick={action.onClick}
                className="text-12px font-semibold hover:underline"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
```

---

## DESIGN EVOLUTION ROADMAP

### Phase 1 (MVP): Glass Clarity Foundation
- ✅ Core design system (colors, typography, spacing)
- ✅ Landing page
- ✅ Dashboard (bento grid layout)
- ✅ Chat interface
- ✅ Basic components (buttons, cards, modals)

### Phase 2 (Alpha): Enhanced UX
- 🔄 Data visualization improvements (Recharts integration)
- 🔄 Dark mode toggle
- 🔄 Mobile app design
- 🔄 Animation polish

### Phase 3 (Beta): Advanced
- 🔄 Accessibility audit (WCAG 2.1 AAA)
- 🔄 Performance optimization
- 🔄 Design tokens API (for partners)
- 🔄 Branded component library

---

## CONCLUSION

By applying the **Core 1% Concept**:

| Dimension | Choice | Benefit |
|-----------|--------|---------|
| **Function** | SaaS Dashboard + Chat | Data-heavy, interaction-rich, modern |
| **Vibe** | Glass Clarity | Premium, trustworthy, contemporary |
| **Layout** | Bento Grid + Chat Sidebar | Information hierarchy, conversational |

We create a **cohesive, differentiated product** that stands out in the crowded wallet/DeFi space while remaining accessible and intuitive.

---

## APPENDIX: FIGMA LINKS & RESOURCES

- **Figma Design System:** [Link TBD]
- **Component Library (Storybook):** [Link TBD]
- **Design Tokens JSON:** `tokens.json` (GitHub repo)
- **Brand Guidelines:** [Link TBD]

---

**Document Owner:** Design Team  
**Last Reviewed:** December 6, 2025  
**Next Review:** January 15, 2026
