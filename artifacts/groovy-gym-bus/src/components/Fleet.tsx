import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockBuses } from '../mockData/buses';
import { Clock, MapPin, Users } from 'lucide-react';

export default function Fleet() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="fleet" className="py-24 bg-bg-base scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl text-text-primary mb-4">Live Fleet & Routing</h2>
          <p className="text-lg text-text-secondary max-w-2xl">
            Track every bus, at every daycare, with real-time capacity. Click a route to see the detailed manifest.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {mockBuses.map((bus) => (
            <BusCard 
              key={bus.id} 
              bus={bus} 
              isExpanded={expandedId === bus.id}
              onClick={() => setExpandedId(expandedId === bus.id ? null : bus.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BusCard({ bus, isExpanded, onClick }: { bus: any, isExpanded: boolean, onClick: () => void }) {
  // Use first 2 stops for preview
  const previewStops = bus.stops.slice(0, 2);

  return (
    <motion.div 
      layout
      onClick={onClick}
      className="bg-bg-surface border border-border rounded-xl shadow-sm hover:shadow-ambient hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden"
    >
      <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4 min-w-[200px]">
          <div className="w-12 h-12 rounded-full bg-bg-surface-alt flex items-center justify-center border border-border text-text-primary font-mono font-medium">
            {bus.id}
          </div>
          <div>
            <h3 className="text-xl font-medium text-text-primary mb-1">{bus.name}</h3>
            <span className="text-sm text-text-secondary flex items-center gap-1">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-tertiary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-tertiary"></span>
              </span>
              En Route
            </span>
          </div>
        </div>

        <div className="flex-1 w-full relative">
          {/* Horizontal timeline line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 hidden md:block" />
          
          <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0 relative z-10">
            {(isExpanded ? bus.stops : previewStops).map((stop: any, index: number) => {
              const isAtCapacity = stop.booked >= stop.capacity;
              
              return (
                <motion.div 
                  layout
                  key={stop.id}
                  className="bg-bg-surface px-4 py-2 flex flex-col items-start md:items-center text-left md:text-center"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Clock size={14} className="text-text-secondary" />
                    <span className="font-mono text-sm text-text-primary">{stop.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={14} className="text-text-secondary md:hidden" />
                    <span className="text-sm font-medium text-text-primary">{stop.location}</span>
                  </div>

                  <motion.div 
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium border
                      ${isAtCapacity 
                        ? 'bg-accent-secondary/10 text-accent-secondary border-accent-secondary/30' 
                        : 'bg-accent-tertiary/10 text-accent-tertiary border-accent-tertiary/30'
                      }`}
                    animate={isAtCapacity && !isExpanded ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Users size={12} />
                    {stop.booked}/{stop.capacity}
                  </motion.div>
                </motion.div>
              );
            })}
            
            {!isExpanded && bus.stops.length > 2 && (
              <div className="bg-bg-surface px-4 py-2 flex items-center justify-center">
                <span className="text-sm font-medium text-accent-primary underline underline-offset-4">
                  + {bus.stops.length - 2} more stops
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-border bg-bg-surface-alt/50"
          >
            <div className="p-6 md:p-8 flex justify-end">
              <button className="text-sm font-medium text-accent-primary hover:text-accent-secondary transition-colors">
                Edit Manifest →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
