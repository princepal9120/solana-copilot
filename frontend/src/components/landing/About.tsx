"use client";

import { motion } from "framer-motion";

export function About() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-lg p-8 md:p-16"
                >
                    {/* Background Gradients */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                Bridging Digital Worlds: <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                                    The Power of Connection
                                </span>
                            </h2>
                        </div>
                        <div className="glass-card p-8 rounded-2xl border border-white/10 bg-black/20">
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Solana Copilot acts as your intelligent bridge to the blockchain.
                                By combining advanced AI agents with the speed of Solana, we create
                                a seamless experience that empowers you to manage your digital assets
                                with unprecedented ease and security.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
