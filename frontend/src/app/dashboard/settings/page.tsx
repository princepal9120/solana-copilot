"use client";

import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    User, Bell, Shield, Palette, Wallet, Globe,
    Moon, Sun, ChevronRight, ExternalLink, Key,
    Smartphone, Mail, AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();

    const settingsSections = [
        {
            title: "Account",
            icon: User,
            items: [
                { label: "Email", value: "user@example.com", type: "text" },
                { label: "Display Name", value: "Solana Trader", type: "text" },
            ]
        },
        {
            title: "Security",
            icon: Shield,
            items: [
                { label: "Two-Factor Authentication", value: true, type: "toggle" },
                { label: "Transaction Signing", value: true, type: "toggle" },
                { label: "Session Timeout", value: "30 minutes", type: "select" },
            ]
        },
        {
            title: "Notifications",
            icon: Bell,
            items: [
                { label: "Price Alerts", value: true, type: "toggle" },
                { label: "Trade Confirmations", value: true, type: "toggle" },
                { label: "Automation Updates", value: true, type: "toggle" },
                { label: "Email Notifications", value: false, type: "toggle" },
            ]
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-foreground">Settings</h1>
                <p className="text-muted-foreground">Manage your account preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Settings */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Theme Toggle */}
                    <GlassCard className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-xl">
                                    <Palette className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">Appearance</h3>
                                    <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                                <button
                                    onClick={() => setTheme("light")}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all",
                                        theme === "light"
                                            ? "bg-background text-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <Sun className="h-4 w-4" />
                                    Light
                                </button>
                                <button
                                    onClick={() => setTheme("dark")}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all",
                                        theme === "dark"
                                            ? "bg-background text-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <Moon className="h-4 w-4" />
                                    Dark
                                </button>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Settings Sections */}
                    {settingsSections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <GlassCard key={section.title} className="p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-primary/10 rounded-xl">
                                        <Icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <h3 className="font-semibold text-foreground">{section.title}</h3>
                                </div>
                                <div className="space-y-4">
                                    {section.items.map((item, i) => (
                                        <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                                            <Label className="text-foreground">{item.label}</Label>
                                            {item.type === "toggle" ? (
                                                <Switch defaultChecked={item.value as boolean} />
                                            ) : item.type === "text" ? (
                                                <Input
                                                    defaultValue={item.value as string}
                                                    className="max-w-[200px] text-right"
                                                />
                                            ) : (
                                                <span className="text-sm text-muted-foreground">{item.value}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </GlassCard>
                        );
                    })}

                    {/* Danger Zone */}
                    <GlassCard className="p-6 border-destructive/30">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-destructive/10 rounded-xl">
                                <AlertTriangle className="h-5 w-5 text-destructive" />
                            </div>
                            <h3 className="font-semibold text-destructive">Danger Zone</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-3">
                                <div>
                                    <p className="text-foreground font-medium">Delete Account</p>
                                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                                </div>
                                <Button variant="destructive" size="sm">Delete</Button>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Connected Wallets */}
                    <GlassCard className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Wallet className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold text-foreground">Connected Wallets</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">P</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">Phantom</p>
                                        <p className="text-xs text-muted-foreground">8xK4...j9Pm</p>
                                    </div>
                                </div>
                                <span className="text-xs text-emerald-500 font-medium">Active</span>
                            </div>
                            <Button variant="outline" className="w-full">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Wallet
                            </Button>
                        </div>
                    </GlassCard>

                    {/* Quick Links */}
                    <GlassCard className="p-6">
                        <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
                        <div className="space-y-2">
                            {[
                                { label: "API Keys", icon: Key },
                                { label: "Mobile App", icon: Smartphone },
                                { label: "Help Center", icon: Globe },
                                { label: "Contact Support", icon: Mail },
                            ].map((link) => (
                                <button
                                    key={link.label}
                                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <link.icon className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm text-foreground">{link.label}</span>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                </button>
                            ))}
                        </div>
                    </GlassCard>

                    {/* Version Info */}
                    <GlassCard className="p-4">
                        <div className="text-center text-sm text-muted-foreground">
                            <p>Solana Copilot v1.0.0</p>
                            <a href="#" className="text-primary hover:underline flex items-center justify-center gap-1 mt-1">
                                View Changelog <ExternalLink className="h-3 w-3" />
                            </a>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}

function Plus(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    );
}
