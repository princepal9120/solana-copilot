"use client";

import React, { useState, useEffect } from "react";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ChatWidget } from "../chat/ChatSidebar";
import { DashboardThemeProvider, useDashboardTheme } from "@/components/providers/DashboardThemeProvider";

function DashboardContent({ children }: { children: React.ReactNode }) {
    const { resolvedTheme } = useDashboardTheme();
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <div className={`min-h-screen bg-background relative overflow-x-hidden dashboard-theme ${resolvedTheme === 'dark' ? 'dark' : ''}`}>
            {/* Background Aurora Effect */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[80px]" />
            </div>

            {/* Left Navigation (Sidebar) */}
            <DashboardNav />

            {/* Main Content Area */}
            <main className="relative z-10 transition-all duration-300 ease-in-out min-h-screen ml-64 flex flex-col">
                {/* Top Navbar */}
                <DashboardHeader />

                {/* Page Content */}
                <div className="flex-1 p-8 max-w-7xl mx-auto w-full">
                    {children}
                </div>
            </main>

            {/* Right Chat Sidebar - Overlay, doesn't take space */}
            <ChatWidget isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
        </div>
    );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <DashboardThemeProvider>
            <DashboardContent>{children}</DashboardContent>
        </DashboardThemeProvider>
    );
}

