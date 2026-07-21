import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollSpine() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent-secondary z-[60] origin-left"
        style={{ scaleX: scaleY }}
      />
    );
  }

  return (
    <div className="fixed top-0 bottom-0 left-8 w-px z-[60] pointer-events-none hidden lg:block opacity-30">
      <div className="absolute inset-0 border-l-2 border-dashed border-border" />
      <motion.div 
        className="absolute top-0 left-[-3.5px] w-2 h-2 rounded-full bg-accent-secondary"
        style={{ 
          y: useSpring(useScroll().scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 }), 
          top: "0%", 
          bottom: "100%", 
          translateY: "calc(100vh * var(--scroll-y-progress))" // Fallback to raw translation if needed
        }}
      />
      {/* Alternatively, just using a simple absolute positioned dot matching scroll */}
      <motion.div
        className="absolute top-0 left-[-3.5px] w-2 h-2 rounded-full bg-accent-secondary shadow-[0_0_8px_var(--accent-secondary)]"
        style={{
          top: useSpring(useScroll().scrollYProgress, { stiffness: 100, damping: 30 }).get() * 100 + "%"
        }}
      />
    </div>
  );
}
