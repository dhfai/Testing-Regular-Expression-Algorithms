import React, { useState } from 'react';
import { useNasabah, Mutasi } from '../hooks/useNasabah';

const TransferForm: React.FC<{ accountNo: string }> = ({ accountNo }) => {
  const { nasabah, isLoading, isError, mutate } = useNasabah(accountNo);
  const [toAccountNo, setToAccountNo] = useState('');
  const [amount, setAmount] = useState('');
  const [fromBank, setFromBank] = useState('BRI');
  const [toBank, setToBank] = useState('BRI');
  const [message, setMessage] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('/api/transfer-funds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fromAccountNo: accountNo, toAccountNo, amount: parseFloat(amount), fromBank, toBank }),
    });

    const result = await response.json();
    setMessage(result.message);
    setDetails(result.details || '');

    if (result.success) {
      mutate();
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading nasabah data</div>;

  return (
    <div className="container mx-auto max-w-lg bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Bank Transfer</h1>
      <div className="mb-4">
        <h2 className="text-xl font-bold">Nasabah Info</h2>
        <p>Name: {nasabah?.name}</p>
        <p>Account No: {nasabah?.accountNo}</p>
        <p>Balance: {nasabah?.balance}</p>
      </div>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={nasabah?.accountNo}
          readOnly
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="From Account ID"
        />
        <select
          value={fromBank}
          onChange={(e) => setFromBank(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        >
          <option value="BRI">BRI</option>
          <option value="BNI">BNI</option>
          <option value="Sulselbar">Sulselbar</option>
        </select>
        <input
          type="text"
          value={toAccountNo}
          onChange={(e) => setToAccountNo(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="To Account ID"
        />
        <select
          value={toBank}
          onChange={(e) => setToBank(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        >
          <option value="BRI">BRI</option>
          <option value="BNI">BNI</option>
          <option value="Sulselbar">Sulselbar</option>
        </select>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="Amount"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Transfer
        </button>
      </form>
      {message && <p className={`text-xl ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
      {details && <p className="text-red-500 mt-2">{details}</p>}
      <div className="mt-4">
        <h2 className="text-xl font-bold">Mutasi</h2>
        {nasabah?.mutasi?.length ? (
          nasabah.mutasi.map((mutasi: Mutasi) => (
            <div key={mutasi.id} className="border border-gray-300 rounded p-2 mb-2">
              <p>Type: {mutasi.type}</p>
              <p>Amount: {mutasi.amount}</p>
              <p>Date: {new Date(mutasi.createdAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default TransferForm;
