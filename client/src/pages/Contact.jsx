import { apiFetch } from "../api";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = ({ user, handleLogout }) => {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <main className="flex-grow container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="relative mb-20 group overflow-hidden rounded-[3rem] h-[50vh]">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-black/40 z-10 transition-colors duration-500"></div>
          <img 
            src="https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&q=80&w=1920" 
            alt="Contact Us" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl tracking-tight">Get in <span className="gradient-text">Touch</span></h1>
            <p className="text-xl text-gray-200 max-w-2xl font-medium drop-shadow-lg">We're here to help you craft your perfect stay. Reach out anytime.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="glass p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
              <h2 className="text-3xl font-black mb-10 relative">Send Us a Message</h2>
              <form action="/api/contact" method="POST" className="relative group/form" onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData.entries());
                
                try {
                  const res = await apiFetch('/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                  });
                  const result = await res.json();
                  if (result.success) {
                    alert('Message sent successfully!');
                    e.target.reset();
                  } else {
                    alert(result.error || 'Failed to send message.');
                  }
                } catch (err) {
                  alert('Error sending message.');
                }
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-3">
                    <label htmlFor="name" className="text-xs uppercase tracking-[0.2em] font-black text-secondary ml-1">Your Name</label>
                    <input type="text" id="name" name="name" placeholder="John Doe" required className="w-full px-8 py-5 glass rounded-3xl border-0 focus:ring-4 focus:ring-indigo-500/20 text-lg transition-all" />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="email" className="text-xs uppercase tracking-[0.2em] font-black text-secondary ml-1">Your Email</label>
                    <input type="email" id="email" name="email" placeholder="your@email.com" required className="w-full px-8 py-5 glass rounded-3xl border-0 focus:ring-4 focus:ring-indigo-500/20 text-lg transition-all" />
                  </div>
                </div>
                
                <div className="mb-10 space-y-3">
                  <label htmlFor="message" className="text-xs uppercase tracking-[0.2em] font-black text-secondary ml-1">Your Message</label>
                  <textarea id="message" name="message" rows="5" placeholder="Tell us everything..." required className="w-full px-8 py-6 glass rounded-[2.5rem] border-0 focus:ring-4 focus:ring-indigo-500/20 text-lg transition-all"></textarea>
                </div>
                
                <button type="submit" className="btn-primary w-full md:w-auto px-12 py-5 text-lg group">
                  <span className="flex items-center justify-center">
                    Send Message
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </button>
              </form>
            </div>
          </div>
          
          {/* Contact Information & Hours */}
          <div className="space-y-12">
            <div className="glass p-10 rounded-[3rem] shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              <h2 className="text-2xl font-black mb-8">Contact Info</h2>
              <div className="space-y-8">
                {[
                  { label: 'Email', value: 'support@hotellink.com', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                  { label: 'Phone', value: '+91 1234567890', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
                  { label: 'HQ', value: 'Book Lane, Rajpura, India', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' }
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-6 group/item">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest font-black text-secondary">{item.label}</div>
                      <div className="font-black text-lg">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass p-10 rounded-[3rem] shadow-xl">
              <h2 className="text-2xl font-black mb-8">Hours</h2>
              <div className="space-y-4">
                {[
                  { day: 'Mon - Fri', time: '9:00 - 18:00' },
                  { day: 'Sat', time: '10:00 - 16:00' },
                  { day: 'Sun', time: 'Closed' }
                ].map(h => (
                  <div key={h.day} className="flex justify-between items-center py-2 border-b border-glass-border last:border-0">
                    <span className="font-bold text-secondary">{h.day}</span>
                    <span className="font-black">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mb-32 relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[4rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <div className="glass p-6 rounded-[4rem] relative overflow-hidden h-[600px] border-0 shadow-2xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3437.174971800065!2d76.6572028762075!3d30.51609109606944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fc32344a6e2d7%3A0x81b346dee91799ca!2sChitkara%20University!5e0!3m2!1sen!2sin!4v1746763035995!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-[3rem]"
              title="Location">
            </iframe>
          </div>
        </div>
        
        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-16 tracking-tight">Common <span className="gradient-text">Questions</span></h2>
          <div className="space-y-6">
            {[
              { q: 'How do I cancel or modify a booking?', a: 'Log in to your dashboard and select the booking you wish to manage. Cancellations are instant subject to property policy.' },
              { q: 'When will I be charged?', a: 'Policies vary by property. Specific terms are clearly displayed at checkout before you commit.' },
              { q: 'Is my data secure?', a: 'We use 256-bit encryption for all transactions. Your safety is our primary concern.' }
            ].map((faq, i) => (
              <div key={i} className="glass p-10 rounded-[2.5rem] hover:shadow-xl transition-all group">
                <h3 className="text-xl font-black mb-4 group-hover:text-indigo-500 transition-colors">{faq.q}</h3>
                <p className="text-secondary font-medium leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
