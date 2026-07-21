import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, animate } from 'framer-motion';

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [studentsCount, setStudentsCount] = useState(0);
  
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], [0, 200]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Small parallax on desktop
      if (window.innerWidth > 1024) {
        const x = (e.clientX / window.innerWidth - 0.5) * 16;
        const y = (e.clientY / window.innerHeight - 0.5) * 16;
        setMousePos({ x, y });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Count up animation
    const controls = animate(0, 700, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(value) {
        setStudentsCount(Math.round(value));
      }
    });
    return () => controls.stop();
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      window.scrollTo({ top: (el as HTMLElement).offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[100dvh] pt-32 pb-16 flex items-center overflow-hidden">
      {/* Background Animated Map */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-[0.15] dark:opacity-20 z-0"
        style={{ y: mousePos.y, x: mousePos.x }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="stroke-text-primary">
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" strokeWidth="1" strokeDasharray="4 4" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Animated route lines */}
          <path id="route1" d="M -100 200 Q 300 100 600 400 T 1200 300" fill="none" stroke="var(--accent-primary)" strokeWidth="3" strokeDasharray="8 8" opacity="0.5" />
          <path id="route2" d="M -100 600 Q 200 700 500 500 T 1200 600" fill="none" stroke="var(--accent-secondary)" strokeWidth="3" strokeDasharray="8 8" opacity="0.4" />
          
          <motion.circle 
            r="6" 
            fill="var(--accent-primary)"
            animate={{
              offsetDistance: ["0%", "100%"]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ offsetPath: "path('M -100 200 Q 300 100 600 400 T 1200 300')" }}
          />
          
          <motion.circle 
            r="6" 
            fill="var(--accent-secondary)"
            animate={{
              offsetDistance: ["0%", "100%"]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
              delay: 2
            }}
            style={{ offsetPath: "path('M -100 600 Q 200 700 500 500 T 1200 600')" }}
          />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center text-center">
        <motion.h1 
          className="text-4xl md:text-[56px] leading-[1.1] md:leading-tight max-w-4xl text-text-primary mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Your Buses Never Stop. <br className="hidden md:block"/>
          <span className="text-accent-primary">Neither Should Your Booking System.</span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-text-secondary max-w-2xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          The custom ERP for mobile gymnastics operators. Manage multiple moving locations, live capacity, and compliance — built for the road.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            onClick={() => scrollTo('#fleet')}
            className="w-full sm:w-auto bg-accent-primary text-white px-8 py-4 rounded-full font-medium text-lg shadow-ambient hover:bg-[#233d65] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            See the Live Fleet
          </motion.button>
          
          <motion.button
            onClick={() => scrollTo('#contact')}
            className="w-full sm:w-auto bg-transparent border-2 border-accent-secondary text-accent-secondary px-8 py-4 rounded-full font-medium text-lg hover:bg-accent-secondary/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Book a Demo
          </motion.button>
        </motion.div>

        <motion.div 
          className="inline-flex items-center gap-6 px-6 py-3 bg-bg-surface border border-border rounded-full shadow-sm text-sm md:text-base font-mono text-text-secondary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span>3 Buses</span>
          <span className="w-1.5 h-1.5 rounded-full bg-border" />
          <span>{studentsCount}+ Students</span>
          <span className="w-1.5 h-1.5 rounded-full bg-border" />
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-tertiary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-tertiary"></span>
            </span>
            Live Routes
          </span>
        </motion.div>
      </div>
    </section>
  );
}
