import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import LoginError from './components/LoginError';
import Dashboard from './components/Dashboard';
import RedeemView from './components/RedeemView';
import { fetchCustomerData } from './services/mockDb';
import { CustomerData } from './types';

function App() {
  const [user, setUser] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'login' | 'dashboard' | 'error' | 'redeem'>('login');
  const [redeemParams, setRedeemParams] = useState<{ phone: string; rank: number } | null>(null);

  useEffect(() => {
    // Check URL parameters for redemption mode
    const params = new URLSearchParams(window.location.search);
    const redeemPhone = params.get('redeem');
    const rank = params.get('rank');

    if (redeemPhone && rank) {
      setRedeemParams({ phone: redeemPhone, rank: parseInt(rank) });
      setView('redeem');
    }
  }, []);

  const handleLogin = async (phone: string) => {
    setLoading(true);
    try {
      const data = await fetchCustomerData(phone);
      if (data) {
        setUser(data);
        setView('dashboard');
      } else {
        setView('error');
      }
    } catch (error) {
      console.error("Login error", error);
      setView('error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setView('login');
  };

  const handleRetry = () => {
    setView('login');
  };

  const handleBackFromRedeem = () => {
    // Clear URL parameters and go to login
    window.history.replaceState({}, '', window.location.pathname);
    setView('login');
  };

  return (
    <>
      {view === 'login' && <Login onLogin={handleLogin} loading={loading} />}
      {view === 'error' && <LoginError onRetry={handleRetry} />}
      {view === 'dashboard' && user && <Dashboard data={user} onLogout={handleLogout} />}
      {view === 'redeem' && redeemParams && (
        <RedeemView 
          phone={redeemParams.phone} 
          rank={redeemParams.rank} 
          onBack={handleBackFromRedeem} 
        />
      )}
    </>
  );
}

export default App;