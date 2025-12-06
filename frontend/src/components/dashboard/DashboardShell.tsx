"use client";

import React, { useState, useEffect } from "react";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useTheme } from "next-themes";
import { ChatWidget } from "../chat/ChatSidebar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Build class names - dashboard-theme is always applied, dark is added based on theme
    const themeClass = mounted && theme === "dark" ? "dashboard-theme dark" : "dashboard-theme";

    if (!mounted) return null;

    return (
        <div className={`min-h-screen bg-background relative overflow-x-hidden ${themeClass}`}>
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
