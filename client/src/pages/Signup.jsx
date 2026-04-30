import { apiFetch } from "../api";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Signup = ({ user, handleLogout }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await apiFetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        navigate('/login-success');
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden transition-colors duration-300">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1920" 
          alt="Signup Background" 
          className="w-full h-full object-cover blur-sm scale-110" 
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
      </div>

      <main className="flex-grow flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-2xl">
          <div className="glass p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
            
            <div className="text-center mb-10">
              <div className="gradient-logo w-16 h-16 rounded-[1.5rem] mx-auto mb-6 flex items-center justify-center shadow-2xl -rotate-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h1 className="text-4xl font-black mb-3 tracking-tight">Create <span className="gradient-text">Account</span></h1>
              <p className="text-secondary font-medium">Join our community of world travelers.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-secondary ml-2">First Name</label>
                  <input 
                    type="text" 
                    name="firstName" 
                    value={formData.firstName} 
                    onChange={handleChange} 
                    required 
                    className="w-full px-6 py-4 glass rounded-2xl border-0 focus:ring-4 focus:ring-indigo-500/20 text-lg transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-secondary ml-2">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName" 
                    value={formData.lastName} 
                    onChange={handleChange} 
                    required 
                    className="w-full px-6 py-4 glass rounded-2xl border-0 focus:ring-4 focus:ring-indigo-500/20 text-lg transition-all" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-secondary ml-2">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-6 py-4 glass rounded-[1.5rem] border-0 focus:ring-4 focus:ring-indigo-500/20 text-lg transition-all" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-secondary ml-2">Secure Password</label>
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-6 py-4 glass rounded-[1.5rem] border-0 focus:ring-4 focus:ring-indigo-500/20 text-lg transition-all" 
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl text-center text-sm font-bold">
                  {error}
                </div>
              )}

              <button type="submit" className="btn-primary w-full py-5 text-lg font-black mt-4">
                Begin Journey
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-glass-border text-center">
              <p className="text-secondary font-medium mb-6">Already a member?</p>
              <Link to="/login" className="glass px-10 py-4 rounded-2xl font-black hover:bg-white/10 transition-all border-white/10">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
