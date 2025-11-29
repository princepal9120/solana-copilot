"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Wallet,
    History,
    Zap,
    Bot,
    LogOut,
    Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/button";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Portfolio", href: "/portfolio", icon: Wallet },
    { name: "Transactions", href: "/transactions", icon: History },
    { name: "Automations", href: "/automations", icon: Zap },
];

export function Sidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();

    return (
        <div className="w-64 h-screen bg-black border-r border-white/10 flex flex-col fixed left-0 top-0">
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-white/10">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg text-white">Solana Copilot</span>
                </Link>
            </div>

            {/* Nav Items */}
            <div className="flex-1 py-6 px-3 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href}>
                            <div
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary/10 text-primary border border-primary/20"
                                        : "text-muted-foreground hover:text-white hover:bg-white/5"
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-white/10 space-y-2">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground hover:text-white"
                >
                    <Settings className="w-5 h-5 mr-3" />
                    Settings
                </Button>
                <Button
                    variant="ghost"
                    className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/10"
                    onClick={logout}
                >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                </Button>
            </div>
        </div>
    );
}
