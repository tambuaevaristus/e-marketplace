import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import FormItem from "@/shared/FormItem";

import React, { useState, useEffect } from "react";
import { CiCircleCheck } from "react-icons/ci";

interface Debt {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  date: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  debts: Debt[];
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onRequestClose,
  debts,
}) => {
  const [selectedDebts, setSelectedDebts] = useState<string[]>([]);
  const [paymentAmounts, setPaymentAmounts] = useState<{ [key: string]: number }>({});
  const [payInFull, setPayInFull] = useState<{ [key: string]: boolean }>({});
  const [paymentMethod, setPaymentMethod] = useState<"mobileMoney" | "orangeMoney">("mobileMoney");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(120); // 2 minutes in seconds

  const handleDebtSelection = (id: string) => {
    setSelectedDebts((prev) =>
      prev.includes(id) ? prev.filter((debtId) => debtId !== id) : [...prev, id]
    );
  };

  const handlePaymentAmountChange = (id: string, amount: number) => {
    setPaymentAmounts((prev) => ({
      ...prev,
      [id]: amount,
    }));
    setPayInFull((prev) => ({ ...prev, [id]: false })); // Uncheck pay in full if a custom amount is entered
  };

  const handlePayInFullToggle = (id: string, amount: number) => {
    setPayInFull((prev) => ({ ...prev, [id]: !prev[id] }));
    setPaymentAmounts((prev) => ({
      ...prev,
      [id]: !payInFull[id] ? amount : 0, // Set the amount to full if checked, else reset to 0
    }));
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setCountdown(120); // Start the 2-minute countdown
  };

  const getDaysLeft = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const timeDiff = due.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const getProgressBarColor = (daysLeft: number) => {
    if (daysLeft < 5) return "bg-red-500";
    if (daysLeft < 15) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getTodalDays = (startDate: string, dueDate: string) => {
    const start = new Date(startDate);
    const due = new Date(dueDate);
    return Math.ceil((due.getTime() - start.getTime()) / (1000 * 3600 * 24));
  };

  // Countdown timer effect
  useEffect(() => {
    if (isSubmitting && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isSubmitting, countdown]);

  // Format countdown time as MM:SS
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? "block" : "hidden"}`}
    >
      <div className="mt-10 w-full max-w-lg rounded-lg bg-white p-6 shadow-lg max-h-[90vh] overflow-y-auto py-6">
        <h2 className="mb-4 text-center text-2xl font-semibold">
          Select arrears to Pay
        </h2>
        <form onSubmit={handlePaymentSubmit} className="grid grid-cols-1 gap-6">
          {debts.map((debt) => {
            const daysLeft = getDaysLeft(debt.dueDate);
            const progressBarColor = getProgressBarColor(daysLeft);
            const isSelected = selectedDebts.includes(debt.id);
            const totalDays = getTodalDays(debt.date, debt.dueDate);

            const percentage = Math.round(
              ((daysLeft > 0 ? daysLeft : 0) * 100) / (totalDays ?? 1)
            );

            return (
              <div
                key={debt.id}
                className={`mb-4 cursor-pointer rounded-lg border p-4 shadow-md ${
                  isSelected ? "border-green-500" : "border-gray-300"
                }`}
                onClick={() => handleDebtSelection(debt.id)}
              >
                <div className="flex items-center justify-between flex-wrap">
                  <h3 className="text-sm font-semibold">{debt.description}</h3>
                  {isSelected && (
                    <CiCircleCheck className="size-8 text-green-500" />
                  )}
                </div>
                <p className="text-lg font-semibold text-yellow-500">
                  Amount: {debt.amount} XAF
                </p>
                <p className="text-lg font-semibold">
                  Due Date: {debt.dueDate}
                </p>
                <div className="mt-2 flex items-center">
                  <div className="bg-gray relative h-2 w-10 rounded">
                    <div
                      className={`absolute h-full ${progressBarColor} rounded`}
                      style={{
                        width: `${percentage > 100 ? 100 : percentage}%`,
                      }}
                    />
                  </div>
                  <span className="text-gray-600 ml-2 text-sm">
                    {daysLeft} days left
                  </span>
                </div>

                {isSelected && (
                  <div className="mt-4">
                    <input
                      type="number"
                      className="w-full border rounded-md p-2 mb-2"
                      placeholder="Enter amount"
                      value={paymentAmounts[debt.id] || ""}
                      onChange={(e) => handlePaymentAmountChange(debt.id, parseFloat(e.target.value))}
                      onClick={(e) => e.stopPropagation()} // Prevent input click from triggering card selection
                    />
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        checked={payInFull[debt.id] || false}
                        className="mr-2"
                        onChange={() => handlePayInFullToggle(debt.id, debt.amount)}
                        onClick={(e) => e.stopPropagation()} // Prevent checkbox click from triggering card selection
                      />
                      <label className="text-sm" style={{ color: "#A9A9A9" }}>
                        Pay in Full
                      </label>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Conditionally render phone number and payment method inputs */}
          {selectedDebts.length > 0 && (
            <>
              <FormItem label="Phone Number">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full rounded-md border p-2"
                  placeholder="Enter your phone number"
                  required
                />
              </FormItem>

              <FormItem label="Payment Method">
                <select
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value as "mobileMoney" | "orangeMoney"
                    )
                  }
                  className="w-full rounded-xl border border-neutral-300 p-2"
                  required
                >
                  <option value="mobileMoney">Mobile Money</option>
                  <option value="orangeMoney">Orange Money</option>
                </select>
              </FormItem>
            </>
          )}

          <div className="mb-4">
            <p className="text-gray-600 text-sm">
              Note: If you pay in full within 5 days, you will receive a 2%
              discount.
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <ButtonPrimary
              type="submit"
              sizeClass="px-6 py-3"
              disabled={selectedDebts.length === 0}
              className={`${
                selectedDebts.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Submit Payment
            </ButtonPrimary>
            <ButtonSecondary
              type="button"
              onClick={onRequestClose}
              className="mt-4 md:ml-4 md:mt-0 border border-primary text-primary"
            >
              Close
            </ButtonSecondary>
          </div>

          {isSubmitting && (
            <p className="text-primary text-center text-sm font-semibold">
              Please confirm the payment on your device within {formatCountdown(countdown)}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;

