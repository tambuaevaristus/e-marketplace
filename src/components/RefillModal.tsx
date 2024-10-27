"use client"

import React, { useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";

interface RefillModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onSubmit: (amount: number, mobileNumber: string) => void;
}

const RefillModal: React.FC<RefillModalProps> = ({
    isOpen,
    onRequestClose,
    onSubmit,
}) => {
    const [amount, setAmount] = useState<number>(0);
    const [mobileNumber, setMobileNumber] = useState<string>("");

    if (!isOpen) return null;

    const handleRefill = () => {
        if (amount > 0 && mobileNumber) {
            onSubmit(amount, mobileNumber);
            onRequestClose();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-3/4 max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-semibold">Refill Balance</h3>
                <input
                    type="text"
                    placeholder="Enter mobile money number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full mb-4 rounded border p-2"
                />
                <input
                    type="number"
                    placeholder="Enter amount (XAF)"
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                    className="w-full mb-4 rounded border p-2"
                />
                <div className="flex justify-between">
                    <ButtonPrimary onClick={handleRefill}>Confirm Refill</ButtonPrimary>
                    <ButtonSecondary onClick={onRequestClose}>Cancel</ButtonSecondary>
                </div>
            </div>
        </div>
    );
};

export default RefillModal;
