import { Navbar } from "@/components/shared/Navbar";
import { Hero } from "@/components/landing/Hero";
import { About } from "@/components/landing/About";
import { Features } from "@/components/landing/Features";
import { Roadmap } from "@/components/landing/Roadmap";
import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-primary/30">
            <Navbar />
            <Hero />
            <div id="about">
                <About />
            </div>
            <div id="features">
                <Features />
            </div>
            <div id="roadmap">
                <Roadmap />
            </div>
            <div id="economics">
                <Pricing />
            </div>
            <Footer />
        </main>
    );
}
