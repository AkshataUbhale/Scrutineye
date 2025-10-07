import React from "react";

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer
      className={`mt-8 py-6 border-t transition-colors duration-300 ${
        darkMode
          ? "bg-slate-900 border-slate-700 text-slate-300"
          : "bg-slate-50 border-slate-200 text-slate-600"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side */}
        <p className="text-sm">
          © {new Date().getFullYear()} <span className="font-semibold">Scrutineye</span>. 
          All rights reserved.
        </p>

        {/* Center (Links) */}
        <div className="flex gap-6 text-sm">
          <a
            href="#"
            className="hover:text-blue-500 transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-blue-500 transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="hover:text-blue-500 transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Right Side (Socials) */}
        <div className="flex gap-4">
          <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition-colors">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-blue-600 transition-colors">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href="#" aria-label="GitHub" className="hover:text-gray-900 dark:hover:text-white transition-colors">
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
