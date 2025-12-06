"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, AlertTriangle, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TransactionDetails {
    fromToken: string;
    fromAmount: number;
    toToken: string;
    toAmount: number;
    fee: number;
    route: string;
    priceImpact: number;
    riskLevel: "low" | "medium" | "high";
}

interface TransactionApprovalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSimulate: () => void;
    onApprove: () => void;
    transaction: TransactionDetails;
    isSimulating?: boolean;
    isApproving?: boolean;
    simulationResult?: {
        success: boolean;
        message: string;
    } | null;
}

export function TransactionApprovalModal({
    isOpen,
    onClose,
    onSimulate,
    onApprove,
    transaction,
    isSimulating = false,
    isApproving = false,
    simulationResult = null,
}: TransactionApprovalModalProps) {
    if (!isOpen) return null;

    const getRiskStyles = (level: string) => {
        switch (level) {
            case "low":
                return "text-emerald-600 bg-emerald-50 border-emerald-200";
            case "medium":
                return "text-amber-600 bg-amber-50 border-amber-200";
            case "high":
                return "text-red-600 bg-red-50 border-red-200";
            default:
                return "text-slate-600 bg-slate-50 border-slate-200";
        }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 6,
        }).format(value);
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
                <div className="bg-background border border-border rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-border">
                        <h2 className="text-xl font-bold text-foreground">Confirm Transaction</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                            <X className="h-5 w-5 text-muted-foreground" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Swap Preview */}
                        <div className="flex items-center justify-center gap-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-foreground">{transaction.fromAmount}</p>
                                <p className="text-sm text-muted-foreground">{transaction.fromToken}</p>
                            </div>
                            <div className="p-2 bg-primary/10 rounded-full">
                                <ArrowRight className="h-5 w-5 text-primary" />
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-foreground">~{transaction.toAmount}</p>
                                <p className="text-sm text-muted-foreground">{transaction.toToken}</p>
                            </div>
                        </div>

                        {/* Transaction Details */}
                        <div className="space-y-3 p-4 bg-muted/50 rounded-xl">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Route</span>
                                <span className="font-medium text-foreground">{transaction.route}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Network Fee</span>
                                <span className="font-medium text-foreground">{formatCurrency(transaction.fee)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Price Impact</span>
                                <span className={cn(
                                    "font-medium",
                                    transaction.priceImpact > 1 ? "text-amber-600" : "text-foreground"
                                )}>
                                    {transaction.priceImpact.toFixed(2)}%
                                </span>
                            </div>
                            <div className="flex justify-between text-sm items-center">
                                <span className="text-muted-foreground">Risk Level</span>
                                <span className={cn(
                                    "px-2 py-0.5 rounded-full text-xs font-medium capitalize border",
                                    getRiskStyles(transaction.riskLevel)
                                )}>
                                    {transaction.riskLevel}
                                </span>
                            </div>
                        </div>

                        {/* High Risk Warning */}
                        {transaction.riskLevel === "high" && (
                            <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl">
                                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-red-700 dark:text-red-400">High-Risk Transaction</p>
                                    <p className="text-xs text-red-600 dark:text-red-400/80 mt-1">
                                        This transaction has high price impact or involves a new/unknown token. Please verify before approving.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Simulation Result */}
                        {simulationResult && (
                            <div className={cn(
                                "flex items-center gap-3 p-4 rounded-xl border",
                                simulationResult.success
                                    ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20"
                                    : "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20"
                            )}>
                                <Check className={cn(
                                    "h-5 w-5",
                                    simulationResult.success ? "text-emerald-600" : "text-red-600"
                                )} />
                                <p className={cn(
                                    "text-sm font-medium",
                                    simulationResult.success ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"
                                )}>
                                    {simulationResult.message}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="p-6 border-t border-border flex gap-3">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={onSimulate}
                            disabled={isSimulating || isApproving}
                        >
                            {isSimulating ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Simulating...
                                </>
                            ) : (
                                "Simulate"
                            )}
                        </Button>
                        <Button
                            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                            onClick={onApprove}
                            disabled={isSimulating || isApproving}
                        >
                            {isApproving ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Approving...
                                </>
                            ) : (
                                "Approve"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

// Export a hook for easier usage
export function useTransactionModal() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isSimulating, setIsSimulating] = React.useState(false);
    const [isApproving, setIsApproving] = React.useState(false);
    const [simulationResult, setSimulationResult] = React.useState<{ success: boolean; message: string } | null>(null);
    const [transaction, setTransaction] = React.useState<TransactionDetails | null>(null);

    const openModal = (tx: TransactionDetails) => {
        setTransaction(tx);
        setSimulationResult(null);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setTransaction(null);
        setSimulationResult(null);
    };

    const simulate = async () => {
        setIsSimulating(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setSimulationResult({
            success: true,
            message: "Simulation successful. Transaction will likely succeed.",
        });
        setIsSimulating(false);
    };

    const approve = async (onSuccess?: () => void) => {
        setIsApproving(true);
        // Simulate approval
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsApproving(false);
        closeModal();
        onSuccess?.();
    };

    return {
        isOpen,
        isSimulating,
        isApproving,
        simulationResult,
        transaction,
        openModal,
        closeModal,
        simulate,
        approve,
    };
}
