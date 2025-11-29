import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SolanaWalletProvider } from "@/components/providers/WalletProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Solana Copilot - AI Agent Wallet",
    description: "Your intelligent companion for Solana DeFi",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <QueryProvider>
                        <SolanaWalletProvider>
                            {children}
                            <Toaster position="top-right" richColors />
                        </SolanaWalletProvider>
                    </QueryProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
