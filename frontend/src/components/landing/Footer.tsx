"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Twitter, Github, Disc } from "lucide-react";

export function Footer() {
    return (
        <footer className="relative bg-black pt-24 pb-12 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-muted-foreground mb-4"
                    >
                        Begin your journey
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-bold text-white mb-8"
                    >
                        Ready when you are
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <Button size="lg" className="h-14 px-10 text-lg bg-accent text-black hover:bg-accent/90 rounded-full">
                            Launch App
                        </Button>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-4 gap-12 border-t border-white/10 pt-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-accent" />
                            <span className="text-xl font-bold text-white">Solana Copilot</span>
                        </div>
                        <p className="text-muted-foreground max-w-sm">
                            The intelligent interface for Solana DeFi. Automate your financial future with AI-driven agents.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Platform</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-muted-foreground hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-white transition-colors">Roadmap</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-white transition-colors">Economics</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Connect</h4>
                        <div className="flex gap-4">
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                                <Twitter className="w-5 h-5 text-white" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                                <Github className="w-5 h-5 text-white" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                                <Disc className="w-5 h-5 text-white" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 text-center text-muted-foreground text-sm">
                    <p>&copy; 2024 Solana Copilot. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
