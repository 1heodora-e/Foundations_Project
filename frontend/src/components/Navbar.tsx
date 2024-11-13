import { Link } from 'react-router-dom';
import { Home, LayoutDashboard, LogIn } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <LayoutDashboard className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">Ubuzima Connect</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900 flex items-center space-x-1">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-1 hover:bg-blue-700 transition-colors"
            >
              <LogIn className="h-5 w-5" />
              <span>Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}