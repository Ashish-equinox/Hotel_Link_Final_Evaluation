import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ThankYou = ({ user, handleLogout }) => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden transition-colors duration-300">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1920" 
          alt="Thank You Background" 
          className="w-full h-full object-cover blur-sm opacity-30" 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 backdrop-blur-3xl"></div>
      </div>

      <main className="flex-grow flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-2xl">
          <div className="glass p-16 rounded-[4rem] text-center shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
            
            <div className="w-24 h-24 bg-green-500/20 rounded-[2rem] mx-auto mb-10 flex items-center justify-center shadow-inner relative group">
              <div className="absolute inset-0 bg-green-500/20 blur-xl group-hover:scale-150 transition-transform duration-700"></div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 relative z-10 animate__animated animate__zoomIn" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-5xl font-black tracking-tight mb-6">Booking <span className="text-green-500">Confirmed!</span></h1>
            <p className="text-xl text-secondary font-medium mb-12 leading-relaxed">
              Your transformation journey begins now. We've sent a confirmation email with all your stay details and itinerary.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Link to="/dashboard" className="btn-primary w-full md:w-64 py-4 text-lg font-black hover:scale-105 transition-transform duration-300">
                View Ledger
              </Link>
              <Link to="/" className="btn-primary w-full md:w-64 py-4 text-lg font-black hover:scale-105 transition-transform duration-300">
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;
