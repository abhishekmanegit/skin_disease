
import React from 'react';
import { HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <HeartPulse className="h-8 w-8 text-skin-primary" />
          <span className="text-xl font-bold text-skin-dark">SkinSense AI</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-gray-600 hover:text-skin-primary font-medium">
                Home
              </Link>
            </li>
            <li>
              <Link to="/diagnose" className="text-gray-600 hover:text-skin-primary font-medium">
                Diagnose
              </Link>
            </li>
            <li>
              <Link to="/conditions" className="text-gray-600 hover:text-skin-primary font-medium">
                Skin Conditions
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
