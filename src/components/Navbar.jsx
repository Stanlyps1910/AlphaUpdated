import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X } from 'lucide-react';
const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Services', to: 'services' },
    { name: 'Portfolio', to: 'gallery' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#F2EFEA]/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-[#3A3A3A]">
        {/* Logo */}
        <Link to="home" smooth={true} className="cursor-pointer hover:opacity-80 transition flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-28 w-auto object-contain" />
          <h1 className="text-2xl font-serif font-bold tracking-widest">ALPHA</h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 text-sm tracking-widest font-sans uppercase">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth={true}
              duration={700}
              offset={-80}
              className="cursor-pointer hover:text-gray-600 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Button */}
        <button className="md:hidden text-[#3A3A3A]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#F2EFEA] border-t border-gray-200 shadow-lg">
          <div className="flex flex-col items-center py-12 space-y-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth={true}
                offset={-80}
                onClick={() => setIsOpen(false)}
                className="text-lg font-serif cursor-pointer hover:text-gray-600 tracking-wide"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
