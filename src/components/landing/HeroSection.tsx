import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Container } from '../common/Container';
import { Button } from '../common/Button';

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary to-primary-dark text-white pt-20 pb-24 lg:pt-32 lg:pb-40">
      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <svg 
          className="absolute right-0 top-0 h-full w-full transform translate-x-1/4 opacity-20" 
          viewBox="0 0 800 800"
        >
          <motion.circle 
            cx="400" 
            cy="400" 
            r="200" 
            fill="none" 
            stroke="white" 
            strokeWidth="2" 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <motion.path 
            d="M400,200 C500,200 600,300 600,400 C600,500 500,600 400,600 C300,600 200,500 200,400 C200,300 300,200 400,200 Z"
            fill="none" 
            stroke="white" 
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </div>
      
      <Container className="relative z-10">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Unlock Seamless Property Management with the WorkflowLeaf Hub
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Intelligent automation for maintenance, communication, and insights, designed to elevate property experiences for managers and tenants.
          </motion.p>
          
          <motion.div 
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Get Started Now
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Login
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
