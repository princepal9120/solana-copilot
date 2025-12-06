"use client";

import React, { useState, useEffect } from "react";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { useTheme } from "next-themes";

export function DashboardShell({ children }: { children: React.ReactNode }) {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Build class names - dashboard-theme is always applied, dark is added based on theme
    const themeClass = mounted && theme === "dark" ? "dashboard-theme dark" : "dashboard-theme";

    return (
        <div className={`min-h-screen bg-background relative overflow-x-hidden ${themeClass}`}>
            {/* Background Aurora Effect */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[80px]" />
            </div>

            {/* Left Navigation */}
            <DashboardNav />

            {/* Main Content Area - Full width, chat is overlay */}
            <main className="relative z-10 transition-all duration-300 ease-in-out pt-6 pb-12 px-8 min-h-screen ml-64">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>

            {/* Right Chat Sidebar - Overlay, doesn't take space */}
            <ChatSidebar isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
        </div>
    );
}
