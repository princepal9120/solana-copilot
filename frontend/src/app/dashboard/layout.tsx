import React from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <DashboardShell>{children}</DashboardShell>;
}
