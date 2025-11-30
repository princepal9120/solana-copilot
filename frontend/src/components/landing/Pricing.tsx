"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const plans = [
    {
        name: "Starter",
        price: "Free",
        desc: "Perfect for manual trading and portfolio tracking",
        features: ["Conversational Interface", "Basic Swaps & Transfers", "Portfolio Dashboard", "Transaction Simulation"],
        gradient: "from-white/10 to-transparent",
        border: "border-white/10"
    },
    {
        name: "Pro",
        price: "0.1%",
        sub: "per automation",
        desc: "Unlock the power of autonomous agents",
        features: ["Unlimited DCA Automations", "Recurring Swaps", "Risk Analysis Alerts", "Priority Execution"],
        gradient: "from-accent/20 to-transparent",
        border: "border-accent/50",
        popular: true
    },
    {
        name: "DAO",
        price: "Custom",
        desc: "Enterprise-grade solutions for treasuries",
        features: ["Multi-Sig Integration", "Governance Workflows", "Compliance Reporting", "Dedicated Support"],
        gradient: "from-primary/20 to-transparent",
        border: "border-primary/50"
    }
];

export function Pricing() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Cards Column */}
                    <div className="space-y-6">
                        {plans.map((plan, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className={`relative p-8 rounded-2xl border ${plan.border} bg-gradient-to-r ${plan.gradient} backdrop-blur-sm group hover:bg-white/5 transition-all`}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-bold text-white">{plan.price}</span>
                                            {plan.sub && <span className="text-sm text-muted-foreground">{plan.sub}</span>}
                                        </div>
                                    </div>
                                    {plan.popular && (
                                        <span className="px-3 py-1 rounded-full bg-accent text-black text-xs font-bold">
                                            POPULAR
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Text Column */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-white mb-6"
                        >
                            Understanding the <br />
                            <span className="text-primary">Copilot Economy</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-muted-foreground text-lg mb-8"
                        >
                            We believe in fair, transparent pricing. Our core wallet features are free forever,
                            while our advanced automation agents charge a small fee on successful executions.
                        </motion.p>

                        <div className="space-y-4">
                            <div className="flex justify-between py-4 border-b border-white/10">
                                <span className="text-white">Manual Trades</span>
                                <span className="text-accent">0% Fee</span>
                            </div>
                            <div className="flex justify-between py-4 border-b border-white/10">
                                <span className="text-white">Portfolio Analysis</span>
                                <span className="text-accent">Free</span>
                            </div>
                            <div className="flex justify-between py-4 border-b border-white/10">
                                <span className="text-white">Automation Success Fee</span>
                                <span className="text-accent">0.1%</span>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                            className="mt-10"
                        >
                            <Button size="lg" className="w-full md:w-auto bg-gradient-to-r from-primary to-accent text-white border-0">
                                Start Trading Now
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
