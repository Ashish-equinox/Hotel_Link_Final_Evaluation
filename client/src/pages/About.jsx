import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = ({ user, handleLogout }) => {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <main className="flex-grow container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="relative mb-20 group overflow-hidden rounded-[3rem] h-[50vh]">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1920" 
            alt="About Us" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4">
            <h1 className="text-5xl md:text-7xl font-black text-fixed-white mb-6 drop-shadow-2xl tracking-tight">Our <span className="gradient-text">Story</span></h1>
            <p className="text-xl text-fixed-white max-w-2xl font-medium drop-shadow-lg">Connecting dreamers with breathtaking destinations since 2005.</p>
          </div>
        </div>

        {/* Story Content */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32 px-4">
          <div className="space-y-8">
            <h2 className="text-4xl font-black tracking-tight leading-tight">Crafting Memories, <br /><span className="text-indigo-500">One Stay at a Time</span></h2>
            <div className="space-y-6 text-lg text-secondary font-medium leading-relaxed">
              <p>
                Founded in 2005, Hotel Link started with a simple vision: to bridge the gap between travelers and the world's most exceptional accommodations. What began as a bold idea in a small garage has evolved into a global sanctuary for curated stays.
              </p>
              <p>
                We believe that travel is more than just movements; it's about the soul of the places you rest. Every property on our platform is hand-vetted to ensure it doesn't just meet standards, but creates legends.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-4">
              {[
                { label: 'Experience', value: '18+' },
                { label: 'Customers', value: '12M+' },
                { label: 'Hotels', value: '65K+' }
              ].map((stat, i) => (
                <div key={stat.label} className="text-center p-4 glass rounded-3xl">
                  <div className="text-3xl font-black gradient-text mb-1">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-secondary">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[3rem] blur-2xl opacity-20 animate-pulse"></div>
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800" alt="Resort" className="relative rounded-[3rem] shadow-2xl glass border-0" />
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-32">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-black mb-6 tracking-tight">Meet the Visionaries</h2>
            <p className="text-lg text-secondary font-medium">The heartbeat behind Hotel Link's success. Passionate experts dedicated to your next escape.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
            {[
              { name: 'Gunpreet Singh', role: 'Founder & CEO', desc: 'Hospitality veteran with a soul for service.', img: '/images/gunpreet.jpg' },
              { name: 'Ashish Raj', role: 'CTO', desc: 'Tech innovator shaping the future of travel.', img: '/images/Ashish.jpg' },
              { name: 'Chirayu Mitra', role: 'Partnerships', desc: 'Building bridges to luxury around the globe.', img: '/images/Chirayu.jpg' }
            ].map((member, i) => (
              <div key={member.name} className="group glass p-8 rounded-[2.5rem] hover:-translate-y-2 transition-all duration-300 text-center">
                <div className="relative w-32 h-32 mx-auto mb-8 rounded-[2rem] overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-indigo-500/20 mix-blend-overlay"></div>
                </div>
                <h3 className="text-2xl font-black mb-2">{member.name}</h3>
                <p className="text-indigo-500 font-bold text-sm uppercase tracking-widest mb-4">{member.role}</p>
                <p className="text-secondary text-sm font-medium leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="glass p-16 rounded-[4rem] relative overflow-hidden text-center">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          
          <h2 className="text-4xl font-black mb-16 relative">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            {[
              { title: 'Quality', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
              { title: 'Innovation', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
              { title: 'Integrity', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7' },
              { title: 'Soul', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' }
            ].map(v => (
              <div key={v.title} className="group">
                <div className="w-16 h-16 rounded-2xl gradient-logo mx-auto mb-6 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={v.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-black mb-2">{v.title}</h3>
                <p className="text-secondary text-xs uppercase tracking-widest font-bold">Uncompromising</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
