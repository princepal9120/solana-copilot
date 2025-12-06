import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "highlight" | "dark";
}

export function GlassCard({ children, className, variant = "default", ...props }: GlassCardProps) {
    return (
        <div
            className={cn(
                "rounded-xl border backdrop-blur-md transition-all duration-300",
                {
                    "bg-white/70 border-white/50 shadow-[0_4px_24px_rgba(32,128,160,0.08)] hover:shadow-[0_8px_32px_rgba(32,128,160,0.12)]": variant === "default",
                    "bg-primary/5 border-primary/20 shadow-[0_4px_24px_rgba(32,128,160,0.15)]": variant === "highlight",
                    "bg-black/40 border-white/10 shadow-lg": variant === "dark",
                },
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
