"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/shared/Sidebar";
import { useAuthStore } from "@/lib/store/authStore";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Sidebar />
            <main className="pl-64 min-h-screen">
                <div className="container mx-auto p-8 max-w-7xl">
                    {children}
                </div>
            </main>
        </div>
    );
}
