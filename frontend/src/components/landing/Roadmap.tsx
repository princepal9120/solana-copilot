"use client";

import { motion } from "framer-motion";

const roadmap = [
    {
        phase: "Phase 1: Foundation",
        title: "MVP Launch",
        items: [
            "Conversational Wallet Interface",
            "Basic Swaps & Transfers",
            "Portfolio Balance Aggregation",
            "Transaction Simulation Engine"
        ]
    },
    {
        phase: "Phase 2: Automation",
        title: "Smart Capabilities",
        items: [
            "DCA & Recurring Swaps",
            "Portfolio Risk Scoring",
            "DAO Multi-Sig Integration",
            "Public Developer API"
        ]
    },
    {
        phase: "Phase 3: Expansion",
        title: "Ecosystem Growth",
        items: [
            "Cross-Chain Support",
            "Advanced Yield Agents",
            "AI Agent Marketplace",
            "Institutional Compliance Suite"
        ]
    }
];

export function Roadmap() {
    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-white mb-6"
                        >
                            Copilot's Path <br />
                            to <span className="text-accent">Success</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-muted-foreground text-lg mb-8"
                        >
                            Our roadmap is designed to progressively unlock autonomous financial capabilities,
                            moving from simple chat interactions to complex, agent-driven portfolio management.
                        </motion.p>

                        <div className="relative w-64 h-64 rounded-full border border-accent/20 flex items-center justify-center">
                            <div className="absolute inset-0 bg-accent/5 rounded-full animate-pulse" />
                            <div className="text-2xl font-bold text-accent">Expansion</div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {roadmap.map((phase, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.2 }}
                                viewport={{ once: true }}
                                className="relative pl-8 border-l border-white/10"
                            >
                                <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-accent" />
                                <div className="text-sm text-primary font-mono mb-2">{phase.phase}</div>
                                <h3 className="text-xl font-bold text-white mb-3">{phase.title}</h3>
                                <ul className="space-y-2">
                                    {phase.items.map((item, j) => (
                                        <li key={j} className="flex items-center gap-2 text-muted-foreground">
                                            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
