import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Shield, Zap, TrendingUp, Activity, Check, Quote } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import HeroChatPreview from "@/components/landing/HeroChatPreview";

const testimonials = [
    {
        quote: "Reduced my trading time by 80%. The AI just gets what I want to do.",
        name: "Alex Chen",
        role: "DeFi Trader",
        initials: "AC",
    },
    {
        quote: "Finally a wallet that understands me. No more clicking through 10 screens.",
        name: "Jamie Rodriguez",
        role: "New to Crypto",
        initials: "JR",
    },
    {
        quote: "Our DAO treasury management is now fully automated. Game changer.",
        name: "Morgan Smith",
        role: "DAO Treasurer",
        initials: "MS",
    },
];

const pricingPlans = [
    {
        name: "Free",
        price: "$0",
        period: "forever",
        description: "Perfect for getting started",
        features: ["Chat Trading", "3 DCA Automations", "Risk Analytics", "Email Support"],
        cta: "Get Started",
        highlighted: false,
    },
    {
        name: "Pro",
        price: "$9",
        period: "/month",
        description: "For active traders",
        features: ["Everything in Free", "Unlimited Automations", "API Access", "Priority Support", "Advanced Analytics"],
        cta: "Upgrade to Pro",
        highlighted: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "For teams and DAOs",
        features: ["Everything in Pro", "Multi-sig Support", "Dedicated Account Manager", "Custom Integrations", "SLA Guarantee"],
        cta: "Contact Sales",
        highlighted: false,
    },
];

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
            {/* Navbar */}
            <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-white/70 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <Sparkles className="text-white h-5 w-5" />
                        </div>
                        <span className="font-bold text-xl text-slate-800">Solana Copilot</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="#features" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Features</Link>
                        <Link href="#testimonials" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Testimonials</Link>
                        <Link href="#pricing" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Pricing</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Link href="/login">
                            <Button variant="ghost" className="text-slate-600 hover:text-primary">Log In</Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                                Launch App
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 relative z-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                            <Sparkles className="h-4 w-4" />
                            <span>AI-Powered DeFi Automation</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight">
                            Your AI Financial <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400">Advisor on Solana</span>
                        </h1>
                        <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
                            Execute swaps, automate DCAs, and analyze portfolio risk—all through natural language. No gas wars, no complexity.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/dashboard">
                                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white h-12 px-8 text-base shadow-xl shadow-primary/20 w-full sm:w-auto">
                                    Start Trading Smarter <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Button size="lg" variant="outline" className="h-12 px-8 text-base border-slate-300 text-slate-700 hover:bg-slate-50 w-full sm:w-auto">
                                View Documentation
                            </Button>
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200" />
                                ))}
                            </div>
                            <p className="text-sm text-slate-500">Trusted by <span className="font-bold text-slate-900">50,000+</span> traders</p>
                        </div>
                    </div>

                    {/* Hero Visual - Animated Chat Preview */}
                    <HeroChatPreview />
                </div>
            </section>

            {/* Features Grid (Bento) */}
            <section id="features" className="py-20 px-6 bg-slate-50/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to trade smarter</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Replace your complex trading terminal with a simple conversation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <GlassCard className="md:col-span-2 p-8 bg-white/60">
                            <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                                <Sparkles className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Natural Language Trading</h3>
                            <p className="text-slate-600">
                                "Swap 20 USDC to SOL." The AI handles routing, slippage, and execution instantly.
                            </p>
                        </GlassCard>
                        <GlassCard className="p-8 bg-white/60">
                            <div className="h-12 w-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                                <Zap className="h-6 w-6 text-amber-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">DCA Automation</h3>
                            <p className="text-slate-600">
                                Set up recurring buys or sells with simple commands.
                            </p>
                        </GlassCard>
                        <GlassCard className="p-8 bg-white/60">
                            <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                <Shield className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Risk Analysis</h3>
                            <p className="text-slate-600">
                                Real-time portfolio scoring and volatility alerts.
                            </p>
                        </GlassCard>
                        <GlassCard className="md:col-span-2 p-8 bg-white/60">
                            <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                                <Activity className="h-6 w-6 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Portfolio Tracking</h3>
                            <p className="text-slate-600">
                                Advanced analytics and PnL tracking across all your Solana wallets.
                            </p>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* Social Proof / Testimonials */}
            <section id="testimonials" className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Loved by traders worldwide</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            See what our users are saying about Solana Copilot.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <GlassCard key={index} className="p-6 bg-white/60 hover:shadow-lg transition-shadow">
                                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                                <p className="text-slate-700 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                        {testimonial.initials}
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900 text-sm">{testimonial.name}</p>
                                        <p className="text-slate-500 text-xs">{testimonial.role}</p>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 px-6 bg-slate-50/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Simple, transparent pricing</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Start free, upgrade when you need more power.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {pricingPlans.map((plan, index) => (
                            <GlassCard
                                key={index}
                                className={`p-8 ${plan.highlighted
                                    ? "bg-gradient-to-br from-primary/10 to-teal-500/10 border-primary/30 ring-2 ring-primary/20"
                                    : "bg-white/60"
                                    }`}
                            >
                                {plan.highlighted && (
                                    <div className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-4">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-2">
                                    <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                                    <span className="text-slate-500 text-sm">{plan.period}</span>
                                </div>
                                <p className="text-slate-600 text-sm mb-6">{plan.description}</p>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                                            <Check className="h-4 w-4 text-emerald-500" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    className={`w-full ${plan.highlighted
                                        ? "bg-primary hover:bg-primary/90 text-white"
                                        : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                                        }`}
                                >
                                    {plan.cta}
                                </Button>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA Section */}
            <section className="py-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-teal-500/5" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">
                        Join 50,000+ traders automating their portfolios
                    </h2>
                    <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                        Start trading smarter today. No credit card required. 100% non-custodial.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/dashboard">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white h-14 px-10 text-lg shadow-xl shadow-primary/20">
                                Start Free <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-slate-300 text-slate-700 hover:bg-slate-50">
                            View Documentation
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-slate-200">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <Sparkles className="text-white h-5 w-5" />
                        </div>
                        <span className="font-bold text-xl text-slate-800">Solana Copilot</span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-slate-600">
                        <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Docs</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Support</Link>
                    </div>
                    <p className="text-sm text-slate-500">© 2025 Solana Copilot. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
