import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingSequence from '@/components/LoadingSequence';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import ProblemSolution from '@/components/ProblemSolution';
import Fleet from '@/components/Fleet';
import ParentCheckout from '@/components/ParentCheckout';
import BirthdayEngine from '@/components/BirthdayEngine';
import StaffRoster from '@/components/StaffRoster';
import ReportingDashboard from '@/components/ReportingDashboard';
import BuiltWith from '@/components/BuiltWith';
import Footer from '@/components/Footer';
import ScrollSpine from '@/components/ScrollSpine';

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = useCallback(() => setLoading(false), []);

  // Initialize theme based on system preference
  useEffect(() => {
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full bg-bg-base transition-colors duration-300">
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingSequence key="loader" onComplete={handleLoadComplete} />
        ) : (
          <div key="content" className="w-full flex flex-col relative">
            <ScrollSpine />
            <Nav />
            <main className="flex-1 w-full flex flex-col">
              <Hero />
              <ProblemSolution />
              <Fleet />
              <ParentCheckout />
              <BirthdayEngine />
              <StaffRoster />
              <ReportingDashboard />
              <BuiltWith />
            </main>
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
