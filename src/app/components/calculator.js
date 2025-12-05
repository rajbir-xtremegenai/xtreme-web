"use client"
import React, { useState } from 'react';

const Calculator = () => {
  const [price, setPrice] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateFinancing = (e) => {
    e.preventDefault();

    const p = parseFloat(price);
    const r = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const n = parseFloat(loanTerm) * 12; // Total number of payments
    const d = parseFloat(downPayment);

    if (isNaN(p) || isNaN(r) || isNaN(n) || isNaN(d) || p <= d) {
      setMonthlyPayment('Invalid input');
      return;
    }

    const principal = p - d;
    const monthlyPaymentValue = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    setMonthlyPayment(monthlyPaymentValue.toFixed(2));
  };

  return (
    <div className="p-6 bg-blue-100 rounded-lg shadow-md mt-10">
      {/* Calculator title */}

      <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">Financing Calculator</h2>
      <form onSubmit={calculateFinancing}>

        {/* Input for interest rate */}

        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="mb-4 md:w-1/2">
            <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
              Price ($):
            </label>
            <input
              type="number"
              id="price"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 md:w-1/2">
            <label htmlFor="interestRate" className="block text-gray-700 text-sm font-bold mb-2">
              Interest Rate (%):
            </label>
            <input
              type="number"
              id="interestRate"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              required
              step="0.01"
            />
          </div>
        </div>
        {/* Input for loan term */}

        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="mb-4 md:w-1/2">
            <label htmlFor="loanTerm" className="block text-gray-700 text-sm font-bold mb-2">
              Loan Term (year):
            </label>
            <input
              type="number"
              id="loanTerm"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 md:w-1/2">
            <label htmlFor="downPayment" className="block text-gray-700 text-sm font-bold mb-2">
              Down Payment ($):
            </label>
            <input
              type="number"
              id="downPayment"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Calculate
          </button>
        </div>
        {/* Button to trigger calculation */}

      </form>
      {monthlyPayment !== null && (
        <div className="mt-6 text-center">
          {monthlyPayment === 'Invalid input' ? (
            <p className="text-red-500 text-lg font-semibold">{monthlyPayment}</p>
          ) : (
            <p className="text-gray-800 text-lg font-semibold">
              Estimated Monthly Payment: <span className="text-blue-600">${monthlyPayment}</span>
            </p>
          )}
        </div>
      )}
      {/* Display calculated monthly payment or error message */}

      <div className="mt-6 text-gray-700 text-sm text-center">
        <p>This is an estimation and may not reflect the exact figures from a lender.</p>
        <p>Taxes, fees, and other costs may apply.</p>
      </div>
    </div>
  );
};

{/* Disclaimer */ }

export default Calculator;
