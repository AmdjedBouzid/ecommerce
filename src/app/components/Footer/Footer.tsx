import React from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="w-full bg-gradient-to-br from-white to-gray-50 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AMDJED SHOP
              </span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Discover quality products at unbeatable prices. We bring you the best in fashion, 
              technology, and lifestyle products.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-white rounded-lg hover:bg-primary hover:text-white transition-all duration-200 shadow-sm hover-scale">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white rounded-lg hover:bg-primary hover:text-white transition-all duration-200 shadow-sm hover-scale">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white rounded-lg hover:bg-primary hover:text-white transition-all duration-200 shadow-sm hover-scale">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white rounded-lg hover:bg-primary hover:text-white transition-all duration-200 shadow-sm hover-scale">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-slide-in">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['Home', 'Products', 'Categories', 'About Us', 'Contact'].map((link, index) => (
                <li key={link} className={`animate-stagger-${Math.min(index + 1, 5)}`}>
                  <a 
                    href="#" 
                    className="text-gray-600 hover:text-primary transition-colors duration-200 hover-lift"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="animate-slide-in">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Customer Service
            </h3>
            <ul className="space-y-3">
              {['Help Center', 'Returns', 'Shipping Info', 'Size Guide', 'Track Order'].map((service, index) => (
                <li key={service} className={`animate-stagger-${Math.min(index + 1, 5)}`}>
                  <a 
                    href="#" 
                    className="text-gray-600 hover:text-primary transition-colors duration-200 hover-lift"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-slide-in">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 animate-stagger-1">
                <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-600 text-sm">Email</p>
                  <p className="text-gray-900 font-medium">info@amdjedshop.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3 animate-stagger-2">
                <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-600 text-sm">Phone</p>
                  <p className="text-gray-900 font-medium">+1 234 567 890</p>
                </div>
              </div>
              <div className="flex items-start gap-3 animate-stagger-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-600 text-sm">Address</p>
                  <p className="text-gray-900 font-medium">123 Main St, City, Country</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 animate-fade-in">
              &copy; {new Date().getFullYear()} Amdjed Shop. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-primary transition-colors duration-200 hover-lift">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors duration-200 hover-lift">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors duration-200 hover-lift">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
