'use client';

import React, { useState, useEffect } from "react";

interface Transaction {
    id: number | string;
    description: string;
    amount: number;
    dateCreated: string;
    datePaid: string;
}

// Generate sample data
const transactionsData: Transaction[] = [
    { id: 1, description: "Loan 1", amount: 25000, dateCreated: "2023-08-01", datePaid: "2023-08-04" },
    { id: 2, description: "Loan 2", amount: 50000, dateCreated: "2023-08-10", datePaid: "2023-08-17" },
    { id: 3, description: "Loan 3", amount: 30000, dateCreated: "2023-07-01", datePaid: "2023-08-15" },
    { id: 4, description: "Loan 4", amount: 15000, dateCreated: "2023-05-01", datePaid: "2023-05-05" },
    { id: 5, description: "Loan 5", amount: 65000, dateCreated: "2023-06-10", datePaid: "2023-06-30" },
    { id: 6, description: "Loan 6", amount: 45000, dateCreated: "2023-02-15", datePaid: "2023-02-28" },
    { id: 7, description: "Loan 7", amount: 55000, dateCreated: "2023-01-20", datePaid: "2023-02-25" },
    { id: 8, description: "Loan 8", amount: 90000, dateCreated: "2023-03-01", datePaid: "2023-03-15" },
    { id: 9, description: "Loan 9", amount: 40000, dateCreated: "2023-04-10", datePaid: "2023-05-12" },
    { id: 10, description: "Loan 10", amount: 70000, dateCreated: "2023-06-25", datePaid: "2023-07-20" },
    { id: 11, description: "Loan 11", amount: 60000, dateCreated: "2023-07-15", datePaid: "2023-08-10" },
    { id: 12, description: "Loan 12", amount: 32000, dateCreated: "2023-08-01", datePaid: "2023-08-20" },
    { id: 13, description: "Loan 13", amount: 10000, dateCreated: "2023-04-20", datePaid: "2023-05-02" },
    { id: 14, description: "Loan 14", amount: 25000, dateCreated: "2023-05-10", datePaid: "2023-06-05" },
    { id: 15, description: "Loan 15", amount: 75000, dateCreated: "2023-06-15", datePaid: "2023-07-10" },
    { id: 16, description: "Loan 16", amount: 42000, dateCreated: "2023-07-05", datePaid: "2023-08-15" },
    { id: 17, description: "Loan 17", amount: 58000, dateCreated: "2023-03-25", datePaid: "2023-04-20" },
    { id: 18, description: "Loan 18", amount: 36000, dateCreated: "2023-01-15", datePaid: "2023-03-01" },
    { id: 19, description: "Loan 19", amount: 98000, dateCreated: "2023-04-01", datePaid: "2023-05-01" },
    { id: 20, description: "Loan 20", amount: 83000, dateCreated: "2023-02-20", datePaid: "2023-03-18" },
];

// Calculate the weight based on the number of days it took to repay
const calculateWeight = (daysTaken: number): number => {
    if (daysTaken <= 5) return 10;
    if (daysTaken <= 10) return 9.5;
    if (daysTaken <= 15) return 9;
    if (daysTaken <= 20) return 8.5;
    if (daysTaken <= 25) return 8;
    if (daysTaken <= 30) return 7.5;
    if (daysTaken <= 35) return 7;
    if (daysTaken <= 40) return 6.5;
    if (daysTaken <= 45) return 6;
    if (daysTaken <= 50) return 5;
    if (daysTaken <= 55) return 4;
    if (daysTaken <= 60) return 3;
    if (daysTaken <= 65) return 2;
    if (daysTaken <= 70) return 1;
    return 0;
};

// Calculate the credit score
const calculateCreditScore = (transactions: Transaction[]): string => {
    let weightedSum = 0;
    let accumulatedAmount = 0;

    transactions.forEach((transaction) => {
        const dateCreated = new Date(transaction.dateCreated);
        const datePaid = new Date(transaction.datePaid);
        const daysTaken = Math.floor(
            (datePaid.getTime() - dateCreated.getTime()) / (1000 * 60 * 60 * 24)
        );
        const weight = calculateWeight(daysTaken);
        weightedSum += weight * transaction.amount;
        accumulatedAmount += transaction.amount;
    });

    return accumulatedAmount > 0 ? (weightedSum / accumulatedAmount).toFixed(2) : "N/A";
};

const TransactionDetailsScreen: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [displayedTransactions, setDisplayedTransactions] = useState<Transaction[]>([]);
    const [creditScore, setCreditScore] = useState<string>("N/A");
    const [showAll, setShowAll] = useState<boolean>(false);

    useEffect(() => {
        const sortedTransactions = [...transactionsData].sort((a, b) =>
            new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
        );

        setTransactions(sortedTransactions); // Set sorted transactions
        setDisplayedTransactions(sortedTransactions.slice(0, 5)); // Display top 5

    }, []);

    useEffect(() => {
        const score = calculateCreditScore(transactions);
        setCreditScore(score);
    }, [transactions])

    useEffect(() => {
        const displayed = showAll ? transactions : transactions.slice(0, 5);
        setDisplayedTransactions(displayed);
    }, [showAll, transactions]);

    return (
        <div className="container mx-auto my-10 rounded-2xl bg-white p-5 shadow-md">
            <h2 className="mb-6 text-3xl font-semibold text-primary">
                Transaction Details
            </h2>

            <div className="mb-6 p-4 rounded-lg bg-neutral-100">
                <h3 className="text-lg font-semibold">Credit Score</h3>
                <p className="text-xl font-bold text-green-600">{creditScore} / 10</p>
            </div>

            <div className="space-y-4">
                {displayedTransactions.map((transaction) => (
                    <div
                        key={transaction.id}
                        className="rounded-lg bg-neutral-100 p-4 shadow-sm"
                    >
                        <h3 className="text-lg font-semibold">{transaction.description}</h3>
                        <p className="text-sm text-neutral-600">
                            Amount: <strong>{transaction.amount} XAF</strong>
                        </p>
                        <p className="text-sm text-neutral-600">
                            Date Created:{" "}
                            {new Date(transaction.dateCreated).toLocaleDateString("en-GB")}
                        </p>
                        <p className="text-sm text-neutral-600">
                            Date Paid: {new Date(transaction.datePaid).toLocaleDateString("en-GB")}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-6 w-full text-center">
                <button
                    className="text-blue-500 underline"
                    onClick={() => setShowAll(!showAll)}
                >
                    {showAll ? "View Less" : "View More"}
                </button>
            </div>
        </div>
    );
};

export default TransactionDetailsScreen;
