"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-black">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-50" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] opacity-30" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-sm font-medium text-white/80">
                            AI-Powered Solana Intelligence
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
                    >
                        Your Intelligent Companion for{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                            Solana DeFi
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl text-muted-foreground mb-10 max-w-2xl"
                    >
                        Execute swaps, manage portfolios, and automate strategies using natural language.
                        Experience the future of non-custodial wallet management.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center gap-4"
                    >
                        <Link href="/dashboard">
                            <Button size="lg" className="h-12 px-8 text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
                                Get Started <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="https://github.com/yourusername/solana-copilot" target="_blank">
                            <Button size="lg" variant="outline" className="h-12 px-8 text-lg border-white/10 hover:bg-white/5">
                                View on GitHub
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Feature Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full"
                    >
                        {[
                            {
                                icon: Bot,
                                title: "Natural Language",
                                desc: "Chat with your wallet to execute complex transactions",
                            },
                            {
                                icon: Shield,
                                title: "Non-Custodial",
                                desc: "You maintain full control of your private keys",
                            },
                            {
                                icon: Zap,
                                title: "Automated Actions",
                                desc: "Set up DCA, recurring swaps, and rebalancing",
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors text-left"
                            >
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <feature.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
