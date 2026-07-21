import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { generateParties } from '../mockData/parties';
import { Calendar as CalendarIcon, Check, Copy, Share2, FileSignature, Users } from 'lucide-react';

const mockSlots = generateParties();

export default function BirthdayEngine() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingState, setBookingState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [copied, setCopied] = useState(false);

  const handleBook = () => {
    setBookingState('loading');
    setTimeout(() => {
      setBookingState('success');
    }, 1000);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="parties" className="py-24 bg-bg-base scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl text-text-primary mb-4">The Birthday Party Engine</h2>
          <p className="text-lg text-text-secondary">
            Turn weekends into profit. Parents book a slot, select a package, and get a magical RSVP link that auto-collects waivers from all guests.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">
          {/* Calendar Area */}
          <div className="flex-1 bg-bg-surface border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <CalendarIcon className="text-accent-primary" size={20} />
              <h3 className="font-medium text-lg">Available Weekends</h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {mockSlots.map((slot) => (
                <button
                  key={slot.id}
                  disabled={!slot.available || bookingState === 'success'}
                  onClick={() => {
                    setSelectedSlot(slot.id);
                    setBookingState('idle');
                  }}
                  className={`p-4 rounded-xl border text-center transition-all flex flex-col gap-1
                    ${!slot.available ? 'opacity-50 bg-bg-surface-alt border-transparent cursor-not-allowed' : 
                      selectedSlot === slot.id ? 'border-accent-tertiary bg-accent-tertiary/10 shadow-sm' : 
                      'border-border hover:border-accent-tertiary/50 hover:bg-bg-surface-alt cursor-pointer'
                    }
                  `}
                >
                  <span className={`text-sm font-medium ${selectedSlot === slot.id ? 'text-accent-tertiary' : 'text-text-primary'}`}>
                    {format(slot.date, 'MMM d')}
                  </span>
                  <span className="text-xs font-mono text-text-secondary">
                    {format(slot.date, 'h:mm a')}
                  </span>
                  {!slot.available && <span className="text-[10px] uppercase tracking-wider text-text-secondary mt-1">Booked</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Booking Panel */}
          <div className="w-full lg:w-[400px]">
            <AnimatePresence mode="wait">
              {!selectedSlot ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[300px] border-2 border-dashed border-border rounded-2xl flex items-center justify-center text-text-secondary text-sm p-8 text-center"
                >
                  Select an available green slot to configure your party package.
                </motion.div>
              ) : bookingState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-accent-tertiary/10 border border-accent-tertiary/30 rounded-2xl p-6 h-full flex flex-col"
                >
                  <div className="w-12 h-12 bg-accent-tertiary rounded-full flex items-center justify-center mb-4 shrink-0">
                    <Check size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-text-primary mb-2">Party Booked!</h3>
                  <p className="text-sm text-text-secondary mb-6">Deposit paid. Now, invite the guests.</p>
                  
                  <div className="mt-auto">
                    <label className="text-xs font-medium text-text-primary uppercase tracking-wider mb-2 block">Your Magic RSVP Link</label>
                    <div className="flex items-center gap-2 bg-bg-surface border border-border rounded-lg p-1">
                      <input 
                        type="text" 
                        readOnly 
                        value="groovy.gym/rsvp/p-8472" 
                        className="bg-transparent text-sm font-mono text-text-primary px-3 w-full outline-none"
                      />
                      <button 
                        onClick={handleCopy}
                        className="bg-bg-surface-alt hover:bg-border p-2 rounded text-text-primary transition-colors flex items-center gap-2 text-xs font-medium min-w-[80px] justify-center"
                      >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-bg-surface border border-border rounded-2xl p-6 shadow-ambient"
                >
                  <h3 className="text-lg font-medium mb-4">Select Package</h3>
                  <div className="space-y-3 mb-6">
                    {['Bronze ($299)', 'Silver ($399)', 'Gold VIP ($499)'].map((pkg, i) => (
                      <label key={i} className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-bg-surface-alt transition-colors">
                        <input type="radio" name="package" className="accent-accent-tertiary w-4 h-4" defaultChecked={i === 1} />
                        <span className="text-sm font-medium">{pkg}</span>
                      </label>
                    ))}
                  </div>
                  
                  <div className="border-t border-border pt-4 mb-6 flex justify-between items-center">
                    <span className="text-sm text-text-secondary">Required Deposit</span>
                    <span className="text-xl font-mono text-text-primary">$100.00</span>
                  </div>

                  <button 
                    onClick={handleBook}
                    disabled={bookingState === 'loading'}
                    className="w-full bg-accent-tertiary text-white py-3.5 rounded-lg font-medium flex justify-center items-center gap-2 hover:bg-[#5a7a5f] transition-colors"
                  >
                    {bookingState === 'loading' ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      'Pay Deposit & Book'
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RSVP Loop visualization */}
        <div className="max-w-4xl mx-auto mt-24">
          <h4 className="text-center text-sm font-medium text-text-secondary uppercase tracking-widest mb-12">The Automated RSVP Loop</h4>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 relative">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-border -translate-y-1/2 hidden md:block z-0" />
            
            {[
              { icon: Share2, label: "Share Link" },
              { icon: Users, label: "Parents RSVP" },
              { icon: FileSignature, label: "Auto-Waivers" },
              { icon: Check, label: "Live Roster" }
            ].map((step, i) => (
              <motion.div 
                key={i}
                className="relative z-10 flex flex-col items-center bg-bg-base px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-bg-surface border border-border shadow-sm flex items-center justify-center mb-3 text-accent-primary">
                  <step.icon size={24} />
                </div>
                <span className="text-sm font-medium text-text-primary">{step.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
