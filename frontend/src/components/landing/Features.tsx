"use client";

import { motion } from "framer-motion";
import { MessageSquare, ShieldCheck, Zap, BarChart3 } from "lucide-react";

const features = [
    {
        title: "Conversational Wallet",
        desc: "Execute swaps, transfers, and stakes using natural language commands. No complex UIs, just chat.",
        icon: MessageSquare,
        gradient: "from-primary/20 to-primary/5",
        border: "border-primary/20"
    },
    {
        title: "Security & Trust",
        desc: "Non-custodial architecture with transaction simulation and session keys. Your keys, your crypto.",
        icon: ShieldCheck,
        gradient: "from-secondary/40 to-secondary/10",
        border: "border-secondary/30"
    },
    {
        title: "Smart Automation",
        desc: "Set up DCA, recurring swaps, and threshold-based triggers that run autonomously on-chain.",
        icon: Zap,
        gradient: "from-accent/20 to-accent/5",
        border: "border-accent/20"
    },
    {
        title: "Portfolio Intelligence",
        desc: "Real-time risk analysis, volatility alerts, and AI-driven rebalancing suggestions.",
        icon: BarChart3,
        gradient: "from-purple-500/20 to-purple-500/5",
        border: "border-purple-500/20"
    }
];

export function Features() {
    return (
        <section className="py-24 bg-black/50">
            <div className="container mx-auto px-4">
                <div className="mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                    >
                        Unlocking <span className="text-primary">Copilot</span> Essentials
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-muted-foreground text-lg max-w-2xl"
                    >
                        Experience the next generation of wallet management with our core pillars of innovation.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative p-8 rounded-2xl border ${feature.border} bg-gradient-to-br ${feature.gradient} backdrop-blur-sm overflow-hidden group hover:border-white/20 transition-colors`}
                        >
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>

                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
