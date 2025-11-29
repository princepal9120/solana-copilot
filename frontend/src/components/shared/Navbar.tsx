"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Bot, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: "Features", href: "/#features" },
        { name: "How it Works", href: "/#how-it-works" },
        { name: "Pricing", href: "/#pricing" },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        Solana Copilot
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" className="text-white hover:bg-white/10">
                            Sign In
                        </Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                            Launch App
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-black/95 border-b border-white/10 p-4 flex flex-col gap-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-lg font-medium text-white/80 hover:text-white"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-2 mt-4">
                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button variant="outline" className="w-full justify-center">
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button className="w-full justify-center">Launch App</Button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
