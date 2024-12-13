import React, {useState} from 'react';
import { Timer, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const MobileNavbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const [show, setShow] = useState(false);
  const linkClasses = "w-full block text-center px-4 py-3 text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition-colors border-b border-gray-200 last:border-0";

  return (
    <div className="block sm:hidden">
      <button 
        type="button" 
        className="hover:bg-gray-100 transition-all rounded-md p-2 group"
        title="Open Menu"
        onClick={() => setShow(!show)}
      >
        <Menu className="h-8 w-8 text-indigo-600 group-hover:text-indigo-800 transition-all" />
      </button>
      {show && (
        <nav className="absolute shadow-md z-20 bottom-0 translate-y-full left-0 w-full bg-white flex flex-col">
            {currentUser ? (
              <>
                <Link 
                  to="/dashboard"
                  className={linkClasses}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className={linkClasses}
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={linkClasses}>
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className={linkClasses}
                >
                  Sign up
                </Link>
              </>
            )}
        </nav>
      )}
    </div>
  );
}

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <header className="fixed w-full z-20 top-0 left-0 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Timer className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">NextPomodoro</span>
            </Link>
          </div>
          <nav className="items-center hidden sm:flex">
            {currentUser ? (
              <>
                <Link to="/dashboard" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign up
                </Link>
              </>
            )}
          </nav>
          <MobileNavbar />
        </div>
      </div>
    </header>
  );
};

export default Navbar;