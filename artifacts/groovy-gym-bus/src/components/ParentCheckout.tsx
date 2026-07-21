import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CreditCard, Apple, Smartphone, AlertCircle } from 'lucide-react';

export default function ParentCheckout() {
  return (
    <section id="parents" className="py-24 bg-bg-surface-alt scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl text-text-primary mb-6">
            Frictionless Parent Booking
          </h2>
          <p className="text-lg text-text-secondary mb-6 leading-relaxed">
            Parents don't want to create another account just to book a gymnastics class. Our checkout flow requires zero logins.
          </p>
          <ul className="space-y-4 mb-8">
            {['No account creation required', 'Mobile-first signature pad for waivers', 'Apple Pay / Google Pay integrated', 'Auto-syncs with bus manifest'].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-1 bg-accent-tertiary/20 p-1 rounded-full">
                  <Check size={14} className="text-accent-tertiary" />
                </div>
                <span className="text-text-primary">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="flex justify-center">
          <PhoneMockup />
        </div>

      </div>
    </section>
  );
}

function PhoneMockup() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const handleNext = () => setStep(2);
  
  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 900);
  };

  const handleDraw = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Simplistic drawing for mock
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#212938';
    
    if (e.buttons !== 1) return; // Only draw when mouse button pressed
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left || e.touches?.[0]?.clientX - rect.left;
    const y = e.clientY - rect.top || e.touches?.[0]?.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  return (
    <div className="w-full max-w-[340px] h-[680px] bg-bg-surface border-[12px] border-[#1a1a1a] dark:border-[#333] rounded-[40px] shadow-2xl overflow-hidden relative flex flex-col font-sans">
      {/* Phone Header */}
      <div className="h-14 bg-bg-surface border-b border-border flex items-center justify-center shrink-0">
        <span className="font-display font-medium text-lg">Groovy Registration</span>
      </div>

      <div className="flex-1 overflow-y-auto p-5 bg-bg-base relative">
        <AnimatePresence mode="wait">
          
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col gap-5"
            >
              <div className="bg-blue-50 dark:bg-blue-900/20 text-accent-primary p-3 rounded-lg flex gap-3 items-start text-sm border border-blue-100 dark:border-blue-800">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <p>No account needed. Just select your daycare and sign up!</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Select Location</label>
                <select className="w-full bg-bg-surface border border-border rounded-lg p-3 text-text-primary focus:outline-none focus:border-accent-primary">
                  <option value="">Choose a daycare...</option>
                  <option value="maple">Maple Daycare (Tuesdays 8:00 AM)</option>
                  <option value="sunrise">Sunrise Kids (Wednesdays 9:15 AM)</option>
                </select>
              </div>

              <button 
                onClick={handleNext}
                className="w-full bg-accent-primary text-white py-3.5 rounded-lg font-medium mt-4 shadow-sm"
              >
                Continue
              </button>
            </motion.div>
          )}

          {step === 2 && !loading && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col gap-4"
            >
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-text-primary block mb-1">Child's Name</label>
                  <input type="text" placeholder="First & Last" className="w-full bg-bg-surface border border-border rounded-lg p-3 text-text-primary" />
                </div>
                <div>
                  <label className="text-sm font-medium text-text-primary block mb-1">Age</label>
                  <input type="number" placeholder="Years" className="w-full bg-bg-surface border border-border rounded-lg p-3 text-text-primary" />
                </div>
              </div>

              <div className="mt-2">
                <label className="text-sm font-medium text-text-primary block mb-1">Parent Signature (Waiver)</label>
                <div className="bg-bg-surface border border-border rounded-lg h-32 relative overflow-hidden">
                  <canvas 
                    ref={canvasRef} 
                    width={300} 
                    height={128}
                    className="w-full h-full cursor-crosshair touch-none"
                    onMouseMove={handleDraw}
                    onMouseDown={(e) => {
                      const ctx = canvasRef.current?.getContext('2d');
                      if (ctx) ctx.beginPath();
                      handleDraw(e);
                    }}
                    onTouchMove={handleDraw}
                    onTouchStart={(e) => {
                      const ctx = canvasRef.current?.getContext('2d');
                      if (ctx) ctx.beginPath();
                      handleDraw(e);
                    }}
                  />
                  <span className="absolute bottom-2 right-3 text-xs text-text-secondary pointer-events-none">Draw here</span>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <button 
                  onClick={handlePay}
                  className="w-full bg-black dark:bg-white dark:text-black text-white py-3.5 rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  <Apple size={18} /> Pay $85.00
                </button>
                <button 
                  onClick={handlePay}
                  className="w-full bg-bg-surface border border-border text-text-primary py-3.5 rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  <CreditCard size={18} /> Credit Card
                </button>
              </div>
            </motion.div>
          )}

          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-bg-base z-10"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-border border-t-accent-primary rounded-full animate-spin" />
                <span className="text-text-secondary font-medium text-sm">Processing...</span>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full text-center gap-4 mt-10"
            >
              <div className="w-16 h-16 bg-accent-tertiary rounded-full flex items-center justify-center mb-2 shadow-lg shadow-accent-tertiary/20">
                <Check size={32} className="text-white" />
              </div>
              <h3 className="font-display text-2xl text-text-primary">You're Booked!</h3>
              
              <div className="w-full bg-bg-surface border border-border rounded-xl p-4 mt-2 text-left shadow-sm">
                <p className="text-xs text-text-secondary font-mono mb-2">CONFIRMATION #GGB-2847</p>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Maple Daycare</span>
                  <span className="text-sm">Tues 8:00 AM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Child</span>
                  <span className="text-sm font-medium">Recorded</span>
                </div>
              </div>

              <button 
                onClick={() => setStep(1)}
                className="mt-6 text-sm font-medium text-accent-primary hover:underline"
              >
                Book another child
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
