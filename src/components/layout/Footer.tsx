import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-inner">
      <div className="mx-auto max-w-7xl px-4 py-6 md:flex md:items-center md:justify-between">
        <div className="mt-2 flex justify-center space-x-6 md:order-2">
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Terms</span>
            <span className="text-sm text-gray-500">Terms of Service</span>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Privacy</span>
            <span className="text-sm text-gray-500">Privacy Policy</span>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Contact</span>
            <span className="text-sm text-gray-500">Contact Us</span>
          </a>
        </div>
        <div className="mt-2 md:order-1 md:mt-0">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Certana. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;