import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative mt-8 group transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 px-4 md:px-0">
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-4 group/logo">
              <div className="gradient-logo w-12 h-12 rounded-2xl flex items-center justify-center transform group-hover/logo:rotate-12 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a2 2 0 012-2h6a2 2 0 012 2v5" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tighter">HOTEL <span className="gradient-text">LINK</span></span>
            </Link>
            <p className="text-secondary font-medium leading-relaxed">
              Experience the pinnacle of hospitality. Curating the world's most exceptional stays for the modern explorer.
            </p>
            <div className="flex gap-4">
              {[
                { name: 'facebook', icon: 'M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.14h-3v4.63h3v12h5v-12h3.85l.42-4.63z' },
                { name: 'twitter', icon: 'M23.64 5.29c-.88.39-1.82.66-2.81.78a4.93 4.93 0 002.16-2.72c-.95.56-2 .98-3.12 1.2a4.92 4.92 0 00-8.38 4.48c-4.1-.2-7.72-2.17-10.15-5.15a4.9 4.9 0 00.67 6.18c-.83-.03-1.6-.25-2.28-.63v.06a4.92 4.92 0 003.95 4.83c-.71.2-1.45.3-2.21.3-.54 0-1.07-.05-1.58-.15a4.92 4.92 0 004.59 3.41 9.87 9.87 0 01-6.12 2.1c-.4 0-.79-.02-1.17-.07a13.93 13.93 0 007.55 2.21c9.05 0 14-7.5 14-14v-.64a10 10 0 002.45-2.54z' },
                { name: 'instagram', icon: 'M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5a4.25 4.25 0 004.25 4.25h8.5a4.25 4.25 0 004.25-4.25v-8.5a4.25 4.25 0 00-4.25-4.25h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-.75a1 1 0 110 2 1 1 0 010-2z' },
                { name: 'linkedin', icon: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a2.7 2.7 0 0 0-2.7-2.7c-1.2 0-2 .7-2.3 1.2v-1.2H11v8h2.5v-4.5a1.5 1.5 0 0 1 1.5-1.5a1.5 1.5 0 0 1 1.5 1.5v4.5H18.5M7 19h2.5V11H7v8m1.25-9.25a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3z' }
              ].map(social => (
                <a key={social.name} href={`#${social.name}`} className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-all duration-300 group">
                  <span className="sr-only">{social.name}</span>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-500 mb-8">Navigation</h3>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Contact', 'Properties', 'Careers'].map(item => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '')}`} className="text-secondary font-bold hover:text-content transition-colors flex items-center group/item">
                    <span className="w-0 group-hover/item:w-4 h-[2px] bg-indigo-500 transition-all duration-300 overflow-hidden mr-0 group-hover/item:mr-3"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-500 mb-8">Support</h3>
            <ul className="space-y-4">
              {['Help Center', 'Safety Information', 'Cancellation Options', 'Our COVID-19 Response', 'Report a Concern'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '')}`} className="text-secondary font-bold hover:text-content transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-500 mb-8">Connect</h3>
            <div className="glass p-8 rounded-[2rem] space-y-6">
              <p className="text-xs font-bold text-secondary">Subscribe to our newsletter for exclusive escapes.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email" className="w-full bg-white/5 border-0 rounded-xl px-4 text-xs font-bold focus:ring-2 focus:ring-indigo-500/50" />
                <button className="bg-indigo-500 text-white p-3 rounded-xl hover:scale-105 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-glass-border flex flex-col md:flex-row justify-between items-center gap-6 px-4 md:px-0">
          <p className="text-xs font-black text-secondary uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Hotel Link Portal. All rights reserved.
          </p>
          <div className="flex gap-8">
            {['Privacy', 'Terms', 'Sitemap'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-widest text-secondary hover:text-indigo-500 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
