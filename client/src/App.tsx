import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import TransferForm from './components/TransferForm';

const App: React.FC = () => {
  const [accountNo, setAccountNo] = useState<string | null>(null);

  const handleLogin = (accountNo: string) => {
    setAccountNo(accountNo);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      {accountNo ? <TransferForm accountNo={accountNo} /> : <LoginForm onLogin={handleLogin} />}
    </div>
  );
};

export default App;
