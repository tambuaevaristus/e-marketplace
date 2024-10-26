"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

import PaymentModal from "@/components/DebtPayment";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

const AccountScreen = () => {
  const [kycCompleted, setKycCompleted] = useState(false);
  const [balance, setBalance] = useState(0); // XAF balance
  const [hasDebt, setHasDebt] = useState(false);
  const [debtAmount, setDebtAmount] = useState(0); // Debt amount
  const [creditScore, setCreditScore] = useState<number | null>(null);
  const [showDebtDetails, setShowDebtDetails] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setKycCompleted(true);
    setBalance(1500);
    setDebtAmount(500);
    setCreditScore(25);
  }, []);

  useEffect(() => {
    setHasDebt(debtAmount > 0);
  }, [debtAmount]);

  const profileCompletion = () => {
    let completed = 0;
    if (kycCompleted) completed += 1;
    if (balance >= 2000) completed += 1;
    if (debtAmount === 0) completed += 1;
    return (completed / 3) * 100;
  };

  const getProgressBarColor = () => {
    const percentage = profileCompletion();
    if (percentage === 100) return "bg-green-600";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-red-600";
  };

  const renderDebtDetailsModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-3/4 max-w-lg rounded-lg bg-white p-5 shadow-lg">
        <h3 className="mb-4 text-lg font-semibold">Arrears Transaction Details</h3>
        <ul className="space-y-2">
          <li className="rounded bg-neutral-100 p-3">
            Transaction 1 - 250 XAF
          </li>
          <li className="rounded bg-neutral-100 p-3">
            Transaction 2 - 250 XAF
          </li>
        </ul>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2   w-full items-center justify-center gap-5">
          <ButtonPrimary onClick={() => setIsOpen(true)}>
            Pay arrears
          </ButtonPrimary>
          <ButtonSecondary
            onClick={() => setShowDebtDetails(false)}
            className="border border-primary text-primary outline"
          >
            Close
          </ButtonSecondary>
        </div>
      </div>
    </div>
  );

  const kycStatusColor = kycCompleted ? "text-green-600" : "text-red-600";
  const debtStatusColor = hasDebt ? "text-red-600" : "text-green-600";
  let creditScoreColor;

  switch (creditScore) {
    case null:
      creditScoreColor = "text-neutral-400";
      break;
    default:
      if (creditScore >= 80) {
        creditScoreColor = "text-green-600";
      } else if (creditScore >= 50) {
        creditScoreColor = "text-yellow-500";
      } else {
        creditScoreColor = "text-red-600";
      }
  }

  return (
    <div className="container mx-auto my-10 rounded-2xl bg-white p-5 shadow-md">
      <h2 className="mb-6 text-3xl font-semibold text-primary">
        Account Summary
      </h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Eligability for credit</h3>
        <div className="flex items-center">
          <div className="h-2 w-full rounded-full bg-neutral-200">
            <div
              className={`h-2 rounded-full ${getProgressBarColor()}`}
              style={{ width: `${profileCompletion()}%` }}
            />
          </div>
          <span className="ml-2 text-sm">
            {Math.round(profileCompletion())}%
          </span>
        </div>
        <p className="mt-1 text-sm text-neutral-500">
          Complete your KYC, have at least 2,000 XAF balance, and clear
          outstanding balance.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg bg-neutral-100 p-4">
          <div>
            <h3 className="text-lg font-semibold">KYC Status</h3>
            <p className={`text-sm ${kycStatusColor}`}>
              {kycCompleted ? "KYC Completed" : "KYC Not Completed"}
            </p>
          </div>
          {!kycCompleted && (
            <Link href="/kyc" className="text-blue-600 underline">
              Complete KYC
            </Link>
          )}
        </div>

        <div className="flex items-center justify-between rounded-lg bg-neutral-100 p-4">
          <div>
            <h3 className="text-lg font-semibold">Account Balance</h3>
            <p className="text-sm text-neutral-600">
              <strong>{balance} XAF</strong> (Minimum Required: 2,000 XAF)
            </p>
          </div>
          <p
            className={`text-sm ${balance >= 2000 ? "text-green-600" : "text-red-600"}`}
          >
            {balance >= 2000 ? "Sufficient Balance" : "Balance Below Minimum"}
          </p>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-neutral-100 p-4">
          <div>
            <h3 className="text-lg font-semibold">Arrears Status</h3>
            <p className={`text-sm ${debtStatusColor}`}>
              {hasDebt ? `Outstanding balance: ${debtAmount} XAF` : "No outstanding balance"}
            </p>
          </div>
          {hasDebt && (
            <ButtonSecondary
              onClick={() => setShowDebtDetails(true)}
              className="text-blue-600 underline"
            >
              View Details
            </ButtonSecondary>
          )}
        </div>

        <div className="flex items-center justify-between rounded-lg bg-neutral-100 p-4">
          <div>
            <h3 className="text-lg font-semibold">Credit Score</h3>
            <p className={`text-sm ${creditScoreColor}`}>
              {creditScore !== null
                ? `${creditScore} / 100`
                : "Not Calculated Yet"}
            </p>
          </div>
        </div>
      </div>
      <PaymentModal
        debts={[
          {
            id: "1",
            amount: 2000,
            dueDate: "2025-01-01",
            description: "Dept for gas bottle",
            date: "2024-10-10",
          },
          {
            id: "2",
            amount: 2000,
            dueDate: "2024-10-28",
            description: "Dept for gas bottle",
            date: "2024-09-19",
          },
        ]}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      />
      {showDebtDetails && renderDebtDetailsModal()}
    </div>
  );
};

export default AccountScreen;
