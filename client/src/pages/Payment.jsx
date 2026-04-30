import { apiFetch } from "../api";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Payment = ({ user, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const hotelName = searchParams.get('hotelName') || 'Premium Escape';
  const checkIn = searchParams.get('checkIn') || new Date().toISOString().split('T')[0];
  const checkOut = searchParams.get('checkOut') || 'N/A';
  const initialGuests = searchParams.get('guests') || '1';
  
  const [guests, setGuests] = useState(initialGuests);
  const [total, setTotal] = useState(2500);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleGuestChange = (e) => {
    const selectedGuests = e.target.value;
    setGuests(selectedGuests);
    const priceMap = {
      '1': 2500,
      '2': 5000,
      '3': 7500,
      '4': 10000
    };
    setTotal(priceMap[selectedGuests]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiFetch('/api/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guests, total, checkIn, checkOut, hotelName })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        navigate('/thankyou');
      } else {
        alert(data.error || 'Payment failed.');
      }
    } catch (err) {
      alert('Error processing payment.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <main className="flex-grow container mx-auto px-6 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-black tracking-tight mb-4">Complete Your <span className="gradient-text">Booking</span></h1>
          <p className="text-secondary font-medium text-lg">Secure your stay with our encrypted payment portal.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
          {/* Payment Details */}
          <div className="lg:col-span-7">
            <div className="glass p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
              
              <h2 className="text-2xl font-black mb-10 flex items-center gap-4">
                <span className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </span>
                Payment Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-secondary ml-4">Cardholder Name</label>
                  <input type="text" placeholder="John Doe" className="w-full px-8 py-5 glass rounded-3xl border-0 focus:ring-4 focus:ring-indigo-500/20 transition-all font-bold" required />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-secondary ml-4">Card Number</label>
                  <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-8 py-5 glass rounded-3xl border-0 focus:ring-4 focus:ring-indigo-500/20 transition-all font-bold tracking-[0.2em]" required />
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-black text-secondary ml-4">Expiry Date</label>
                    <input type="text" placeholder="MM/YY" className="w-full px-8 py-5 glass rounded-3xl border-0 focus:ring-4 focus:ring-indigo-500/20 transition-all font-bold" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-black text-secondary ml-4">CVV Code</label>
                    <input type="text" placeholder="123" className="w-full px-8 py-5 glass rounded-3xl border-0 focus:ring-4 focus:ring-indigo-500/20 transition-all font-bold" required />
                  </div>
                </div>

                <div className="pt-6 space-y-4">
                  <div className="flex items-center gap-4 text-secondary text-xs px-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Payments are SSL encrypted and secure.
                  </div>
                  <button type="submit" className="btn-primary w-full py-6 text-xl font-black">
                    Confirm & Pay ₹{total}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Stay Summary */}
          <div className="lg:col-span-5">
            <div className="glass p-12 rounded-[3.5rem] shadow-xl sticky top-24">
              <h2 className="text-2xl font-black mb-10">Stay Summary</h2>
              
              <div className="space-y-8 mb-10">
                <div className="p-6 bg-indigo-500/5 rounded-3xl space-y-2">
                  <div className="text-[10px] uppercase tracking-widest font-black text-indigo-500">Destination</div>
                  <div className="text-2xl font-black">{hotelName}</div>
                </div>

                <div className="grid grid-cols-2 gap-6 px-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest font-black text-secondary">Check-In</span>
                    <div className="font-bold">{checkIn}</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest font-black text-secondary">Check-Out</span>
                    <div className="font-bold">{checkOut}</div>
                  </div>
                </div>

                <div className="space-y-4 px-4">
                  <div className="flex justify-between items-center text-secondary font-medium">
                    <span className="text-sm">Guest Configuration</span>
                    <select value={guests} onChange={handleGuestChange} className="bg-transparent border-0 font-black text-indigo-500 cursor-pointer focus:ring-0">
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                    </select>
                  </div>
                  <div className="flex justify-between items-center text-secondary font-medium">
                    <span className="text-sm">Base Rate</span>
                    <span className="font-black text-content">₹{total}</span>
                  </div>
                  <div className="flex justify-between items-center text-secondary font-medium">
                    <span className="text-sm">Taxes & Fees</span>
                    <span className="font-black text-green-500 uppercase text-[10px] tracking-widest">Included</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-glass-border flex justify-between items-end px-4">
                <div>
                  <div className="text-[10px] uppercase tracking-widest font-black text-secondary">Grand Total</div>
                  <div className="text-4xl font-black tracking-tight">₹{total}</div>
                </div>
                <div className="text-[10px] uppercase tracking-widest font-black text-secondary mb-2">INR</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;
