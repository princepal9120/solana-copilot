"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Zap, Plus, Clock, TrendingUp, TrendingDown, RefreshCw, Pause, Play, Trash2, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface Automation {
    id: string;
    type: "DCA" | "Stop-Loss" | "Take-Profit" | "Rebalance";
    name: string;
    description: string;
    status: "active" | "paused" | "completed";
    progress?: number;
    nextRun?: string;
    config: {
        amount?: string;
        frequency?: string;
        targetPrice?: string;
        allocation?: string;
    };
}

const automations: Automation[] = [
    {
        id: "1",
        type: "DCA",
        name: "Daily SOL Accumulation",
        description: "Buy $100 worth of SOL every day",
        status: "active",
        progress: 65,
        nextRun: "2h 15m",
        config: { amount: "$100", frequency: "Daily" }
    },
    {
        id: "2",
        type: "Stop-Loss",
        name: "SOL Protection",
        description: "Sell all SOL if price drops below $130",
        status: "active",
        config: { targetPrice: "$130" }
    },
    {
        id: "3",
        type: "Take-Profit",
        name: "BONK Profit Target",
        description: "Sell 50% BONK at 2x gains",
        status: "active",
        config: { targetPrice: "+100%" }
    },
    {
        id: "4",
        type: "Rebalance",
        name: "Monthly Rebalance",
        description: "Maintain 60% SOL, 30% USDC, 10% Others",
        status: "paused",
        nextRun: "15 days",
        config: { allocation: "60/30/10", frequency: "Monthly" }
    },
];

const typeConfig = {
    "DCA": { icon: RefreshCw, color: "bg-blue-500", bgColor: "bg-blue-100", textColor: "text-blue-700" },
    "Stop-Loss": { icon: TrendingDown, color: "bg-amber-500", bgColor: "bg-amber-100", textColor: "text-amber-700" },
    "Take-Profit": { icon: TrendingUp, color: "bg-emerald-500", bgColor: "bg-emerald-100", textColor: "text-emerald-700" },
    "Rebalance": { icon: RefreshCw, color: "bg-purple-500", bgColor: "bg-purple-100", textColor: "text-purple-700" },
};

export default function AutomationsPage() {
    const [automationList, setAutomationList] = useState(automations);

    const toggleStatus = (id: string) => {
        setAutomationList(prev => prev.map(a =>
            a.id === id ? { ...a, status: a.status === "active" ? "paused" : "active" } : a
        ));
    };

    const activeCount = automationList.filter(a => a.status === "active").length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Automations</h1>
                    <p className="text-muted-foreground">Manage your trading rules and strategies</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Plus className="h-4 w-4 mr-2" />
                    New Automation
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <GlassCard className="p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Active</p>
                            <h3 className="text-2xl font-bold text-foreground mt-1">{activeCount}</h3>
                        </div>
                        <div className="p-3 bg-emerald-100 rounded-xl">
                            <Play className="h-5 w-5 text-emerald-600" />
                        </div>
                    </div>
                </GlassCard>
                <GlassCard className="p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Paused</p>
                            <h3 className="text-2xl font-bold text-foreground mt-1">{automationList.filter(a => a.status === "paused").length}</h3>
                        </div>
                        <div className="p-3 bg-amber-100 rounded-xl">
                            <Pause className="h-5 w-5 text-amber-600" />
                        </div>
                    </div>
                </GlassCard>
                <GlassCard className="p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Executed Today</p>
                            <h3 className="text-2xl font-bold text-foreground mt-1">3</h3>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-xl">
                            <Zap className="h-5 w-5 text-blue-600" />
                        </div>
                    </div>
                </GlassCard>
                <GlassCard className="p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Total Value Managed</p>
                            <h3 className="text-2xl font-bold text-foreground mt-1">$12,450</h3>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-xl">
                            <TrendingUp className="h-5 w-5 text-purple-600" />
                        </div>
                    </div>
                </GlassCard>
            </div>

            {/* Quick Create */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Object.entries(typeConfig).map(([type, config]) => {
                    const Icon = config.icon;
                    return (
                        <GlassCard key={type} className="p-4 cursor-pointer hover:border-primary/50 transition-all group">
                            <div className="flex items-center gap-3">
                                <div className={cn("p-2 rounded-lg", config.bgColor)}>
                                    <Icon className={cn("h-5 w-5", config.textColor)} />
                                </div>
                                <div>
                                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">{type}</p>
                                    <p className="text-xs text-muted-foreground">Create new</p>
                                </div>
                            </div>
                        </GlassCard>
                    );
                })}
            </div>

            {/* Automations List */}
            <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                        <Zap className="h-5 w-5 text-primary" />
                        Your Automations
                    </h3>
                </div>

                <div className="space-y-4">
                    {automationList.map((automation) => {
                        const typeInfo = typeConfig[automation.type];
                        const Icon = typeInfo.icon;

                        return (
                            <div
                                key={automation.id}
                                className={cn(
                                    "p-4 border rounded-xl transition-all",
                                    automation.status === "active"
                                        ? "border-border bg-card hover:border-primary/30"
                                        : "border-border/50 bg-muted/30"
                                )}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className={cn("p-3 rounded-xl", typeInfo.bgColor)}>
                                            <Icon className={cn("h-5 w-5", typeInfo.textColor)} />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-medium text-foreground">{automation.name}</h4>
                                                <span className={cn(
                                                    "text-xs px-2 py-0.5 rounded-full font-medium",
                                                    typeInfo.bgColor, typeInfo.textColor
                                                )}>
                                                    {automation.type}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{automation.description}</p>

                                            {/* Config details */}
                                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                                {automation.config.amount && (
                                                    <span>Amount: <strong className="text-foreground">{automation.config.amount}</strong></span>
                                                )}
                                                {automation.config.frequency && (
                                                    <span>Frequency: <strong className="text-foreground">{automation.config.frequency}</strong></span>
                                                )}
                                                {automation.config.targetPrice && (
                                                    <span>Target: <strong className="text-foreground">{automation.config.targetPrice}</strong></span>
                                                )}
                                                {automation.nextRun && (
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        Next: <strong className="text-foreground">{automation.nextRun}</strong>
                                                    </span>
                                                )}
                                            </div>

                                            {/* Progress bar for DCA */}
                                            {automation.progress !== undefined && (
                                                <div className="mt-3 w-64">
                                                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                                        <span>Progress</span>
                                                        <span>{automation.progress}%</span>
                                                    </div>
                                                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-primary rounded-full transition-all"
                                                            style={{ width: `${automation.progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Switch
                                            checked={automation.status === "active"}
                                            onCheckedChange={() => toggleStatus(automation.id)}
                                        />
                                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                                            <Settings className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </GlassCard>
        </div>
    );
}
