import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Payment from './pages/Payment';
import ThankYou from './pages/ThankYou';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';

import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.className = theme === 'light' ? 'light-theme' : '';
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/home');
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout');
      if (res.ok) {
        setUser(null);
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center transition-colors duration-300">
        <div className="w-20 h-20 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-8 shadow-2xl"></div>
        <div className="text-sm font-black uppercase tracking-[0.4em] text-indigo-500 animate-pulse">Initializing Portal</div>
      </div>
    );
  }

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <Router>
      <ScrollToTop />
      <Navbar user={user} handleLogout={handleLogout} theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home user={user} handleLogout={handleLogout} />} />
        <Route path="/about" element={<About user={user} handleLogout={handleLogout} />} />
        <Route path="/contact" element={<Contact user={user} handleLogout={handleLogout} />} />
        <Route path="/login" element={<Login user={user} handleLogin={handleLogin} handleLogout={handleLogout} />} />
        <Route path="/signup" element={<Signup user={user} handleLogout={handleLogout} />} />
        <Route path="/dashboard" element={<Dashboard user={user} handleLogout={handleLogout} />} />
        <Route path="/payment" element={<Payment user={user} handleLogout={handleLogout} />} />
        <Route path="/thankyou" element={<ThankYou user={user} handleLogout={handleLogout} />} />
        
        <Route path="/forgot-password" element={
          <div className="min-h-screen flex items-center justify-center p-6 relative">
            <div className="absolute inset-0 bg-indigo-500/5 backdrop-blur-3xl"></div>
            <div className="glass p-16 rounded-[4rem] text-center max-w-xl relative z-10 shadow-2xl">
              <div className="w-20 h-20 bg-indigo-500/10 rounded-[2rem] flex items-center justify-center mx-auto mb-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-black mb-6">Inbound Sent</h2>
              <p className="text-secondary font-medium text-lg leading-relaxed mb-10">Check your secure inbox for reset instructions. They should arrive within the next 60 seconds.</p>
              <Link to="/login" className="btn-primary px-12 py-4 text-sm font-black">Return to Login</Link>
            </div>
          </div>
        } />
        
        <Route path="/login-success" element={
          <div className="min-h-screen flex items-center justify-center p-6 relative">
            <div className="absolute inset-0 bg-green-500/5 backdrop-blur-3xl"></div>
            <div className="glass p-16 rounded-[4rem] text-center max-w-xl relative z-10 shadow-2xl border-green-500/10">
              <div className="w-20 h-20 bg-green-500/10 rounded-[2rem] flex items-center justify-center mx-auto mb-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-black mb-6">Entry Authorized</h2>
              <p className="text-secondary font-medium text-lg leading-relaxed mb-10">Your digital identity has been successfully registered on our ledger.</p>
              <Link to="/login" className="btn-primary bg-green-500 hover:bg-green-600 px-12 py-4 text-sm font-black">Proceed to Entry</Link>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
