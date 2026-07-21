import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function LoadingSequence({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      const timer = setTimeout(onComplete, 300);
      return () => clearTimeout(timer);
    }

    const duration = 1400; // 1.4s total fake time
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const easeProgress = 1 - Math.pow(1 - currentStep / steps, 3); // cubic ease out
      setProgress(Math.min(100, Math.floor(easeProgress * 100)));

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-bg-base"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-base"
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
    >
      <div className="flex flex-col items-center gap-8 max-w-sm w-full px-8">
        <div className="relative w-48 h-8 flex items-center justify-center">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 10" preserveAspectRatio="none">
            <motion.path
              d="M 0 5 L 100 5"
              stroke="var(--accent-primary)"
              strokeWidth="2"
              strokeDasharray="4 4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
            />
            <motion.circle
              cx="0"
              cy="5"
              r="4"
              fill="var(--accent-secondary)"
              initial={{ x: 0 }}
              animate={{ x: 100 }}
              transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
            />
          </svg>
        </div>

        <motion.h1
          className="font-display text-2xl tracking-widest text-text-primary uppercase"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.4 }}
        >
          Groovy Gym Bus
        </motion.h1>

        <div className="w-full h-1 bg-border rounded-full overflow-hidden mt-4">
          <div
            className="h-full bg-accent-secondary rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
