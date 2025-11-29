import { Navbar } from "@/components/shared/Navbar";
import { Hero } from "@/components/landing/Hero";

export default function Home() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-primary/30">
            <Navbar />
            <Hero />

            {/* Footer */}
            <footer className="border-t border-white/10 py-12 bg-black">
                <div className="container mx-auto px-4 text-center text-muted-foreground">
                    <p>&copy; 2024 Solana Copilot. All rights reserved.</p>
                </div>
            </footer>
        </main>
    );
}
