import { Link } from 'react-router-dom';

const Navbar = ({ user, handleLogout, theme, toggleTheme }) => {
  return (
    <nav className="glass-nav sticky top-0 z-50 p-4 transition-all duration-300">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="flex items-center text-2xl font-black tracking-tight hover:scale-105 transition-transform duration-300">
          <div className="gradient-logo p-2 rounded-xl inline-flex items-center mr-3 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-fixed-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a2 2 0 012-2h6a2 2 0 012 2v5" />
            </svg>
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            Hotel Link
          </span>
        </Link>
        <ul className="flex items-center space-x-1 md:space-x-6 mt-4 md:mt-0 font-medium">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
          <li><Link to="/contact" className="nav-link">Contact</Link></li>
          {user ? (
            <>
              <li>
                <Link to="/dashboard" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-fixed-white shadow-indigo-500/25 shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-300">
                  Dashboard
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="px-5 py-2.5 rounded-xl border-2 border-indigo-500/30 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-all duration-300 font-bold">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-fixed-white shadow-indigo-500/25 shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-300">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="px-5 py-2.5 rounded-xl border-2 border-indigo-500/30 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-all duration-300 font-bold">
                  Sign Up
                </Link>
              </li>
            </>
          )}
          <li className="ml-2">
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-gray-200/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 shadow-inner group"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 group-hover:rotate-45 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.071 16.071l.707.707M7.929 7.929l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 group-hover:-rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
