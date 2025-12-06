"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LineChart, Zap, Settings, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const navItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: LineChart, label: "Portfolio", href: "/dashboard/portfolio" },
    { icon: Zap, label: "Automations", href: "/dashboard/automations" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function DashboardNav() {
    const pathname = usePathname();

    return (
        <nav className="w-64 h-screen fixed left-0 top-0 border-r border-border bg-card/50 backdrop-blur-xl flex flex-col z-40">
            {/* Logo */}
            <div className="p-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                    <Wallet className="text-primary-foreground h-5 w-5" />
                </div>
                <span className="font-bold text-xl text-foreground tracking-tight">Solana Copilot</span>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 px-4 py-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-primary/10 text-primary font-medium shadow-sm"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "h-5 w-5 transition-colors",
                                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                )}
                            />
                            {item.label}
                        </Link>
                    );
                })}
            </div>

            {/* Wallet Connection */}
            <div className="p-4 border-t border-border flex justify-center">
                <div className="wallet-adapter-button-trigger w-full">
                    <WalletMultiButton className="!bg-primary hover:!bg-primary/90 !h-12 !rounded-xl !font-medium !px-6 !w-full !justify-center" />
                </div>
            </div>
        </nav>
    );
}
