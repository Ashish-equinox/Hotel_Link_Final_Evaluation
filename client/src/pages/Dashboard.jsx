import { apiFetch } from "../api";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = ({ user, handleLogout }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const fetchProfile = async () => {
      try {
        const res = await apiFetch('/dashboard');
        const data = await res.json();
        if (res.ok && data.user) {
          setProfile(data.user);
        } else {
          setError('Failed to load dashboard data.');
        }
      } catch (err) {
        setError('Error connecting to server.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [user, navigate]);

  const cancelBooking = async (index) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
      const res = await apiFetch('/api/cancel-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingIndex: index })
      });
      const data = await res.json();
      console.log('Cancellation response:', res.status, data);
      if (res.ok && data.success) {
        const updatedBookings = [...profile.bookings];
        updatedBookings.splice(index, 1);
        setProfile({ ...profile, bookings: updatedBookings });
        alert('Booking cancelled successfully.');
      } else {
        alert(data.error || 'Could not cancel booking.');
      }
    } catch (err) {
      alert('Error cancelling booking.');
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="glass p-12 rounded-[3rem] text-center">
        <div className="text-red-500 text-5xl mb-6">!</div>
        <h2 className="text-2xl font-black mb-4">{error}</h2>
        <button onClick={() => window.location.reload()} className="btn-primary px-8 py-3">Try Again</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <main className="flex-grow container mx-auto px-4 py-12">
        <header className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <h1 className="text-5xl font-black tracking-tight mb-2">Hello, <span className="gradient-text">{profile?.firstName}</span></h1>
              <p className="text-lg text-secondary font-medium">Manage your portfolio and upcoming escapes.</p>
            </div>
            <div className="flex gap-4">
              <Link to="/" className="glass px-8 py-3 rounded-2xl font-bold text-sm hover:bg-white/5 transition-all">Explore New</Link>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 md:mx-0 mx-4">
          {[
            { label: 'Total Bookings', value: profile?.bookings?.length || 0, icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
            { label: 'Active Stays', value: profile?.bookings?.length > 0 ? 1 : 0, icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
            { label: 'Loyalty Tier', value: 'Gold', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-1.947 3.42 3.42 0 014.438 0c.601.602 1.34 1.258 1.946 1.947a3.42 3.42 0 010 4.438c-.602.601-1.34 1.346-1.947 1.946a3.42 3.42 0 01-4.438 0c-.601-.601-1.311-1.345-1.946-1.946a3.42 3.42 0 010-4.438z' }
          ].map((stat, i) => (
            <div key={stat.label} className="glass p-8 rounded-[2.5rem] relative overflow-hidden group hover:scale-[1.02] transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-700"></div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest font-black text-secondary">{stat.label}</div>
                  <div className="text-3xl font-black">{stat.value}</div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Bookings Section */}
        <section className="mb-20 px-4 md:px-0">
          <h2 className="text-3xl font-black mb-10">Your Upcoming <span className="text-indigo-500">Escapes</span></h2>

          {profile?.bookings && profile.bookings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {profile.bookings.map((booking, index) => (
                <div key={index} className="group relative rounded-[3rem] overflow-hidden glass border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt="Hotel"
                    />
                    <div className="absolute inset-0 card-overlay"></div>
                    <div className="absolute bottom-6 left-8">
                      <h3 className="text-2xl font-black text-content">{booking.hotelName}</h3>
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-widest font-black text-secondary">Check In</span>
                        <div className="font-bold text-sm">{booking.checkIn}</div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-widest font-black text-secondary">Check Out</span>
                        <div className="font-bold text-sm">{booking.checkOut}</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-4 border-y border-glass-border">
                      <div className="flex gap-4">
                        <div className="text-center">
                          <div className="text-xs font-black text-secondary uppercase">Guests</div>
                          <div className="text-lg font-black">{booking.guests}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-black text-secondary uppercase">Paid</div>
                        <div className="text-xl font-black text-indigo-500">₹{booking.total}</div>
                      </div>
                    </div>

                    <button 
                      onClick={() => cancelBooking(index)}
                      className="w-full py-4 rounded-2xl bg-red-500/10 text-red-500 font-black text-sm hover:bg-red-500 hover:text-white transition-all duration-300"
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass p-20 rounded-[4rem] text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-indigo-500/10 rounded-[2rem] mx-auto mb-8 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black mb-4">No adventures scheduled yet.</h3>
              <p className="text-secondary font-medium mb-10">The world is full of beauty waiting for you to discover it.</p>
              <Link to="/" className="btn-primary px-10 py-4">Find My First Escape</Link>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
