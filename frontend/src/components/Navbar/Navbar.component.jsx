import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "../../utils/data";
import LOGO from "../../assets/Logo.png";
import ProfileInfoCard from "../Cards/ProfileInfoCard.component";

const Navbar = ({ onClick, user }) => {
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isMenuOpen]);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/90 shadow-xs text-black/80 shadow-black/20 py-3 md:py-4"
          : "py-4 md:py-6"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={LOGO} alt="logo" className="h-12 w-20" />
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {NAV_LINKS.map((link, i) => (
          <a
            key={i}
            href={link.path}
            className="group flex flex-col gap-0.5 text-black"
          >
            {link.name}
            <div className="h-0.5 w-0 group-hover:w-full transition-all duration-300 bg-primary" />
          </a>
        ))}
        {user ? (
          <ProfileInfoCard />
        ) : (
          <button
            className="bg-primary hover:bg-secondary text-[#FFFFFF] font-semibold px-8 py-2.5 rounded-full transition-all duration-500 cursor-pointer"
            onClick={onClick}
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Navigation Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        <svg
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`h-6 w-6 cursor-pointer`}
          fill="none"
          stroke="#1A237E"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </div>

      {/* Mobile Navigation Bar */}
      <div
        className={`fixed top-0 left-0 w-2/3 h-screen bg-white flex flex-col items-center justify-center gap-6 font-medium text-black transition-all duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 cursor-pointer"
          onClick={() => setIsMenuOpen(false)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        {user ? (
          <ProfileInfoCard />
        ) : (
          <button
            className="bg-primary focus:bg-secondary font-medium text-[#FFFFFF] px-8 py-2.5 rounded-full transition-all duration-500 cursor-pointer"
            onClick={onClick}
          >
            Login
          </button>
        )}
        {NAV_LINKS.map((link, i) => (
          <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
