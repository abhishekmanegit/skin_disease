
import React from 'react';
import { HeartPulse } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <HeartPulse className="h-6 w-6 text-skin-primary" />
            <span className="text-lg font-semibold text-skin-dark">SkinSense AI</span>
          </div>
          <div className="text-sm text-gray-500">
            <p>© {new Date().getFullYear()} SkinSense AI. All rights reserved.</p>
            <p className="mt-1">This tool is for educational purposes only and should not replace professional medical advice.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
