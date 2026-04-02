import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* --- Main Footer Content Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* --- Column 1: Brand & Contact Info --- */}
          <div>
            <Link to="/" className="text-3xl font-bold text-white mb-4 inline-block">
              Estate<span className="text-secondary">Hub</span>
            </Link>
            <p className="mb-6 text-sm leading-relaxed">
              Your trusted partner in finding the perfect property. We are dedicated to providing exceptional service and making your real estate dreams a reality.
            </p>
            <div className="space-y-3">
              <p className="flex items-center text-sm">
                <FaMapMarkerAlt className="mr-3 text-secondary" />
                Ramnagar Khandauli Agra
              </p>
              <p className="flex items-center text-sm">
                <FaPhone className="mr-3 text-secondary" />
                <a href="tel:+91 9639753716" className="hover:text-white transition-colors">(123) 456-7890</a>
              </p>
              <p className="flex items-center text-sm">
                <FaEnvelope className="mr-3 text-secondary" />
                <a href="mailto:shivamahaur714@gmail.com" className="hover:text-white transition-colors">shivamahaur714@gmail.com</a>
              </p>
            </div>
          </div>

          {/* --- Column 2: Quick Links --- */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link to="/listings" className="hover:text-secondary transition-colors">Our Listings</Link></li>
              <li><Link to="/agents" className="hover:text-secondary transition-colors">Meet Our Agents</Link></li>
              <li><Link to="/services" className="hover:text-secondary transition-colors">Services</Link></li>
              <li><Link to="/blog" className="hover:text-secondary transition-colors">Blog & Insights</Link></li>
            </ul>
          </div>

          {/* --- Column 3: Support & Legal --- */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/contact" className="hover:text-secondary transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-secondary transition-colors">FAQ</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-secondary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-secondary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* --- Column 4: Social Media & Newsletter --- */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Follow Us</h3>
            <div className="flex space-x-4 mb-8">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-secondary hover:text-gray-900 transition-all duration-300">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-secondary hover:text-gray-900 transition-all duration-300">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-secondary hover:text-gray-900 transition-all duration-300">
                <FaLinkedinIn />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-secondary hover:text-gray-900 transition-all duration-300">
                <FaInstagram />
              </a>
            </div>
            {/* Optional: Add a newsletter signup form here later */}
          </div>
        </div>

        {/* --- Bottom Copyright Bar --- */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} EstateHub. All Rights Reserved. | Designed with <span className="text-red-500">&hearts;</span> by Your Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;