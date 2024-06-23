import React, { useState } from 'react';

const LoginForm: React.FC<{ onLogin: (accountNo: string) => void }> = ({ onLogin }) => {
  const [accountNo, setAccountNo] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accountNo, password }),
    });

    const result = await response.json();
    setMessage(result.message);

    if (result.success) {
      onLogin(accountNo);
    }
  };

  return (
    <div className="container mx-auto max-w-lg bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={accountNo}
          onChange={(e) => setAccountNo(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="Account Number"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="Password"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>
      {message && (
        <p className={`text-xl ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default LoginForm;
