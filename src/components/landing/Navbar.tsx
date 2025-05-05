import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className={`text-xl font-bold ${isScrolled ? 'text-primary' : 'text-white'}`}>
              WorkflowLeaf
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#features" 
              className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-primary transition-colors`}
            >
              Features
            </a>
            <a 
              href="#benefits" 
              className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-primary transition-colors`}
            >
              Benefits
            </a>
            <Link to="/login">
              <Button variant="ghost" className={isScrolled ? '' : 'text-white hover:bg-white/10'}>
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className={isScrolled ? '' : 'bg-white text-primary hover:bg-white/90'}>
                Get Started
              </Button>
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={isScrolled ? 'text-gray-900' : 'text-white'} />
            ) : (
              <Menu className={isScrolled ? 'text-gray-900' : 'text-white'} />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg">
            <nav className="flex flex-col space-y-4 px-4">
              <a 
                href="#features" 
                className="text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#benefits" 
                className="text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Benefits
              </a>
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button className="w-full">
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
