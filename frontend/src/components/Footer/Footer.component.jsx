import LOGO from "../../assets/Logo.png";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaClock } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-12 w-full text-black/70 bg-white border-t border-gray-100">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-primary/30">
        {/* Company Info */}
        <div className="lg:col-span-1">
          <img className="w-20 h-15" src={LOGO} alt="AceBot AI Logo" />
          <p className="mt-4 text-sm leading-relaxed">
            Join the AceBot community - where confidence meets opportunity.
            Prepare smarter, perform better, and achieve more with personalized
            interview insights powered by AI.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="https://www.linkedin.com/in/kolli-lokesh-reddy" className="text-gray-400 hover:text-primary transition-colors">
              <FaLinkedin size={20} />
            </a>
            <a href="https://github.com/Lokesh-reddy18" className="text-gray-400 hover:text-primary transition-colors">
              <FaGithub size={20} />
            </a>
            <a href="mailto:kollilokeshreddy18@gmail.com" className="text-gray-400 hover:text-primary transition-colors">
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-5 text-black/90 text-lg">Quick Links</h3>
          <ul className="text-sm space-y-3">
            <li>
              <a href="#" className="hover:text-primary transition-colors">Home</a>
            </li>
            <li>
              <a href="#features" className="hover:text-primary transition-colors">Features</a>
            </li>
            <li>
              <a href="#work" className="hover:text-primary transition-colors">How it Works</a>
            </li>
            <li>
              <a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">Pricing</a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">Blog</a>
            </li>
          </ul>
        </div>

        {/* Support & Resources */}
        <div>
          <h3 className="font-semibold text-black/90 mb-5 text-lg">Support & Resources</h3>
          <ul className="text-sm space-y-3">
            <li>
              <a href="#" className="hover:text-primary transition-colors">Help Center</a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">FAQ</a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">Contact Us</a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">Interview Tips</a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">Career Guides</a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">Success Stories</a>
            </li>
          </ul>
        </div>

        {/* Newsletter & Contact */}
        <div>
          <h3 className="font-semibold text-black/90 mb-5 text-lg">Stay Updated</h3>
          <div className="text-sm space-y-4">
            <p className="leading-relaxed">
              Get the latest interview tips, career advice, and exclusive resources delivered to your inbox.
            </p>
            <div className="space-y-3">
              <input
                className="border border-gray-300 placeholder-gray-400 outline-none w-full h-10 rounded-lg px-3 focus:border-primary transition-colors"
                type="email"
                placeholder="Enter your email"
              />
              <button className="bg-primary w-full h-10 text-white rounded-lg cursor-pointer hover:bg-primary/90 transition-colors font-medium">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-500">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Contact & Legal Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 border-b border-primary/30">
        {/* Contact Info */}
        <div className="space-y-2">
          <h4 className="font-medium text-black/90">Contact Us</h4>
          <div className="flex items-center gap-2 text-sm">
            <FaEnvelope className="text-primary" />
            <span>support@acebot.ai</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FaPhone className="text-primary" />
            <span>+91 9876543210</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FaClock className="text-primary" />
            <span>Mon-Fri 9AM-6PM EST</span>
          </div>
        </div>

        {/* Legal Links */}
        <div className="space-y-2">
          <h4 className="font-medium text-black/90">Legal</h4>
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="space-y-2">
          <h4 className="font-medium text-black/90">Trusted By</h4>
          <div className="flex items-center gap-2 text-sm">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
              ✓ 10,000+ Users
            </span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
              ✓ 95% Success Rate
            </span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="py-4 text-center text-xs md:text-sm">
        <p className="text-gray-600">
          Copyright © 2025 AceBot AI. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
