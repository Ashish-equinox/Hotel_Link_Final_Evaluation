import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = ({ user, handleLogout }) => {
  const hotelImages = [
    "https://imgs.search.brave.com/GjOwHNSzMFTnlzbM2PteY17Ic0pkPD90mpI_xaFvk5I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE5/OTI2MzM5L3Bob3Rv/L3Jlc29ydC1zd2lt/bWluZy1wb29sLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz05/UXR3SkMyYm9xM0dG/SGFlRHNLeXRGNC1D/YXZZS1F1eTFqQkQy/SVJmWUtjPQ",
    "https://imgs.search.brave.com/DC4Bv1Duhel0tSN8jIP5BfVrdAwKlQnkP6vbvwoMCiE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTMx/NzU3NDcxL3Bob3Rv/L2x1Z2Fuby1pbi1z/d2l0emVybGFuZC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/U2l1N25XcGRla1I3/Wkh0QXppVzVLemVk/akNnVU5xbjE2TVAy/RnBrYnZEZz0",
    "https://imgs.search.brave.com/SUviyQyaD4rIBVMkUgjpll5m4piTQdHq-uzoRw_l2s0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTA0/NzMxNzE3L3Bob3Rv/L2x1eHVyeS1yZXNv/cnQuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPWNPRE1TUGJZ/eXJuMUZIYWtlMXhZ/ejlNOHIxNWlPZkd6/OUFvc3k5RGI3bUk9",
    "https://imgs.search.brave.com/xIPtt7deeqOJr13LZloSlpNEicRSBZlmjZmxzhWp0uA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvODM4/MTAzNDY4L3Bob3Rv/L2ludGVyaW9yLXZp/ZXctb2YtZ29yZ2Vv/dXMtaG90ZWwuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPXBl/U2cxRnhaZkFvbmxO/UWxCXzRQdS1kLTRU/NjBpbW9fWWt2bVZX/TVRiWUk9",
    "https://imgs.search.brave.com/DEWusNHVcM_H3jF71nFXOHEJh7m9DyCmaPPEwlPxxIw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTAz/MTc1ODc2L3Bob3Rv/L2RlbHV4ZS1ob3Rl/bC1hbmQtY2FzaW5v/LXJlc29ydC1pbi1t/YWNhby5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9eDlTTGRC/WDJzS1VzTmpRYlRG/YmlvX29xVkFRNXBP/NU5oTDgyUzloeExW/ST0",
    "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800"
  ];

  const badges = ['Featured', 'Best Value', 'New', 'Popular', 'Top Rated', 'Exclusive'];
  const hotelNames = ['Skyline Luxury Suites', 'Oceanview Resort', 'Mountain Retreat Lodge', 'Urban Boutique Hotel', 'Riverside Grand Hotel', 'Palm Paradise Resort'];
  const ratings = [4.1, 4.5, 4.9, 4.2, 4.7, 4.1];
  const cities = ['Mumbai', 'Goa', 'Rajasthan', 'South Delhi', 'Bangalore', 'Chennai'];
  const prices = [3995, 5499, 2850, 4200, 6100, 3750];
  
  const allAmenities = [
    ['Pool', 'Spa', 'WiFi', 'Restaurant'],
    ['Beach', 'Bar', 'Gym', 'Room Service'],
    ['Mountain View', 'Fireplace', 'Skiing', 'Hot Tub'],
    ['City View', 'Rooftop', 'Bar', 'Restaurant'],
    ['River View', 'Lounge', 'Gym', 'Pool'],
    ['Garden', 'Pool', 'Bar', 'Restaurant']
  ];

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-purple-900/60 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&q=80&w=1920" 
          alt="Luxury Lobby" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-black text-fixed-white mb-6 tracking-tight">Experience <br /><span className="gradient-text">Pure Luxury</span></h1>
            <p className="text-xl md:text-2xl text-fixed-white max-w-2xl font-medium mb-12 opac">Discover curated sanctuaries designed for your ultimate escape.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a href="#explore" className="btn-primary w-full md:w-auto text-lg px-10 py-4">
              Explore Destinations
            </a>
            <Link to="/about" className="glass px-10 py-4 rounded-2xl font-bold text-fixed-white hover:bg-white/10 transition-all w-full md:w-auto">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-20">
        <div id="explore" className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-black mb-4 tracking-tight">Popular Destinations</h2>
              <p className="text-lg text-secondary">Discover hotels that travelers love most. Handpicked for quality, comfort, and style.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {hotelImages.map((imgUrl, i) => (
              <div
                key={i}
                className="group relative rounded-[2.5rem] overflow-hidden glass hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-2 border-0 shadow-xl"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={imgUrl} 
                    alt={hotelNames[i]} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 card-overlay" />
                  
                  <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full glass bg-indigo-500 text-fixed-white text-[10px] font-black uppercase tracking-widest border-indigo-400/20">
                    {badges[i % 6]}
                  </div>
                  
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex text-yellow-400">
                        {Array.from({ length: 5 }).map((_, star) => (
                          <svg key={star} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${star < Math.floor(ratings[i]) ? 'fill-current' : 'opacity-30'}`} viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-white/80 text-xs font-bold">{ratings[i]} Reviews</span>
                    </div>
                    
                    <h3 className="text-3xl font-black text-content mb-2 leading-tight">{hotelNames[i]}</h3>
                    <p className="text-secondary flex items-center gap-2 text-sm font-medium mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {cities[i]}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-content text-3xl font-black">₹{prices[i]}</span>
                        <span className="text-secondary text-xs font-bold ml-1 uppercase">/ Night</span>
                      </div>
                      <Link
                        to={`/payment?hotelName=${encodeURIComponent(hotelNames[i])}&checkIn=2025-05-10&checkOut=2025-05-15&guests=2&total=${prices[i]*5}`}
                        className="bg-white text-black hover:bg-indigo-500 hover:text-white px-8 py-3 rounded-2xl font-black transition-all duration-300 shadow-xl"
                      >
                        Book
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 border-t border-glass-border">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-black mb-4 tracking-tight">Why Choose Hotel Link</h2>
            <p className="text-lg text-secondary">Premium features for the modern traveler.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Best Price', text: "We'll match any price and give you 10% more.", icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' },
              { title: 'Verified', text: "Every hotel vetted for quality by our team.", icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
              { title: '24/7 Concierge', text: "Expert support available around the clock.", icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' }
            ].map((feature, i) => (
              <div key={i} className="glass p-10 rounded-[2rem] text-center hover:scale-[1.02] transition-transform duration-300">
                <div className="gradient-logo w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl font-black mb-4">{feature.title}</h3>
                <p className="text-secondary font-medium leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
