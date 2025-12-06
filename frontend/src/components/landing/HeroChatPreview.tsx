"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MESSAGES = [
    { role: "user", text: "What's my SOL balance across all wallets?" },
    { role: "ai", text: "You have 12.42 SOL across 3 wallets. Total USD value: $2,410." },
    { role: "user", text: "Show my staking rewards." },
    { role: "ai", text: "You're earning 7.49% APY. Next reward arrives in 18 hours." },
];

const TYPING_SPEED = 40;
const MESSAGE_DELAY = 1200;
const CURSOR_BLINK_SPEED = 530;

export default function HeroChatPreview() {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const [showCursor, setShowCursor] = useState(true);
    const [visibleMessages, setVisibleMessages] = useState([]);

    // Cursor blink effect
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, CURSOR_BLINK_SPEED);
        return () => clearInterval(cursorInterval);
    }, []);

    // Typing animation
    useEffect(() => {
        const currentMessage = MESSAGES[currentMessageIndex];
        if (!currentMessage) return;

        if (displayedText.length < currentMessage.text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(currentMessage.text.slice(0, displayedText.length + 1));
            }, TYPING_SPEED);
            return () => clearTimeout(timeout);
        } else {
            setIsTyping(false);
            const timeout = setTimeout(() => {
                // Add completed message to visible messages
                setVisibleMessages((prev) => {
                    const updated = [...prev, { ...currentMessage, id: Date.now() }];
                    // Keep only last 3 messages visible
                    return updated.slice(-3);
                });

                // Move to next message
                const nextIndex = (currentMessageIndex + 1) % MESSAGES.length;

                // Reset if looping back
                if (nextIndex === 0) {
                    setVisibleMessages([]);
                }

                setCurrentMessageIndex(nextIndex);
                setDisplayedText("");
                setIsTyping(true);
            }, MESSAGE_DELAY);
            return () => clearTimeout(timeout);
        }
    }, [displayedText, currentMessageIndex]);

    const currentMessage = MESSAGES[currentMessageIndex];

    return (
        <motion.div
            className="relative w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
        >
            {/* Gradient glow background - Adjusted to Teal/Blue */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-blue-400/20 to-teal-400/20 rounded-2xl blur-[60px] animate-pulse" />

            {/* Chat container - GlassCard Default Style (Light) */}
            <div className="relative z-10 rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl p-5 shadow-[0_8px_32px_rgba(32,128,160,0.12)]">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200/60">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center shadow-md">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                    </div>
                    <div>
                        <p className="text-slate-900 font-semibold text-sm">Solana Copilot</p>
                        <p className="text-primary text-xs font-medium">Online • AI Agent</p>
                    </div>
                </div>

                {/* Messages container */}
                <div className="space-y-3 min-h-[180px]">
                    <AnimatePresence mode="popLayout">
                        {/* Previously completed messages */}
                        {visibleMessages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm shadow-sm ${msg.role === "user"
                                        ? "bg-primary text-white rounded-br-md"
                                        : "bg-white text-slate-700 rounded-bl-md border border-slate-100"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </motion.div>
                        ))}

                        {/* Currently typing message */}
                        {currentMessage && (
                            <motion.div
                                key={`typing-${currentMessageIndex}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className={`flex ${currentMessage.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm shadow-sm ${currentMessage.role === "user"
                                        ? "bg-primary text-white rounded-br-md"
                                        : "bg-white text-slate-700 rounded-bl-md border border-slate-100"
                                        }`}
                                >
                                    <span>{displayedText}</span>
                                    <span
                                        className={`inline-block w-0.5 h-4 ml-0.5 align-middle ${currentMessage.role === "user" ? "bg-white/80" : "bg-primary"
                                            } ${showCursor && isTyping ? "opacity-100" : "opacity-0"}`}
                                        style={{ transition: "opacity 0.1s" }}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Input area mock */}
                <div className="mt-4 pt-3 border-t border-slate-200/60">
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                        <input
                            type="text"
                            placeholder="Ask anything about your wallet..."
                            disabled
                            className="flex-1 bg-transparent text-sm text-slate-500 placeholder:text-slate-400 outline-none cursor-not-allowed"
                        />
                        <button
                            disabled
                            className="p-2 rounded-lg bg-primary/10 text-primary opacity-60 cursor-not-allowed"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Floating stats badge */}
            <motion.div
                className="absolute -bottom-4 -left-4 px-4 py-2.5 rounded-xl bg-white/90 backdrop-blur-lg border border-white/50 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
            >
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-xs text-slate-700 font-medium">Live on Solana</span>
                </div>
            </motion.div>

            {/* Floating portfolio badge */}
            <motion.div
                className="absolute -top-3 -right-3 px-3 py-2 rounded-xl bg-white/90 backdrop-blur-lg border border-white/50 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
            >
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="text-xs text-emerald-600 font-bold">+24.5%</span>
                </div>
            </motion.div>
        </motion.div>
    );
}
