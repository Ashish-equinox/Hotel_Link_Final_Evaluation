import { apiFetch } from "../api";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = ({ user, handleLogin, handleLogout }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await apifetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        handleLogin(data.user);
        navigate('/');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden transition-colors duration-300">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1920" 
          alt="Login Background" 
          className="w-full h-full object-cover blur-sm scale-110" 
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
      </div>

      <main className="flex-grow flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-lg">
          <div className="glass p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
            
            <div className="text-center mb-12">
              <div className="gradient-logo w-20 h-20 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl rotate-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-4xl font-black mb-3 tracking-tight">Welcome <span className="gradient-text">Back</span></h1>
              <p className="text-secondary font-medium">Your next adventure is just a login away.</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-secondary ml-2">Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  placeholder="name@example.com" 
                  className="w-full px-8 py-5 glass rounded-3xl border-0 focus:ring-4 focus:ring-indigo-500/20 text-lg transition-all"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-secondary">Password</label>
                  <Link to="/forgot-password" size="sm" className="text-[10px] uppercase tracking-widest font-black text-indigo-500 hover:text-indigo-400">Forgot?</Link>
                </div>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  placeholder="••••••••" 
                  className="w-full px-8 py-5 glass rounded-3xl border-0 focus:ring-4 focus:ring-indigo-500/20 text-lg transition-all"
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl text-center text-sm font-bold">
                  {error}
                </div>
              )}

              <button type="submit" className="btn-primary w-full py-5 text-lg font-black mt-4">
                Enter Portal
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-glass-border text-center">
              <p className="text-secondary font-medium mb-6">New to Hotel Link?</p>
              <Link to="/signup" className="glass px-10 py-4 rounded-2xl font-black hover:bg-white/10 transition-all border-white/10">
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
