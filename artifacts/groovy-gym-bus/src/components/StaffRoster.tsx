import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockStudents } from '../mockData/students';
import { Phone, Check, ChevronDown, User } from 'lucide-react';

export default function StaffRoster() {
  return (
    <section id="staff" className="py-24 bg-bg-surface-alt scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        
        <div className="flex-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl text-text-primary mb-6">
              Empower Your Coaches
            </h2>
            <p className="text-lg text-text-secondary mb-6 leading-relaxed">
              No paper clipboards. Coaches log in on their phones, select their bus, and see exactly who should be boarding right now.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              Attendance syncs instantly. Emergency contacts are one tap away. Compliance is automatically recorded.
            </p>
          </motion.div>
        </div>

        <div className="flex-1 lg:order-1 flex justify-center perspective-[1000px]">
          <motion.div
            initial={{ rotateY: 20, rotateX: 10, scale: 0.9, opacity: 0 }}
            whileInView={{ rotateY: 6, rotateX: 2, scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="origin-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <StaffPhoneMockup />
          </motion.div>
        </div>

      </div>
    </section>
  );
}

function StaffPhoneMockup() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [students, setStudents] = useState(mockStudents);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleAttendance = (id: number) => {
    setStudents(students.map(s => s.id === id ? { ...s, present: !s.present } : s));
  };

  return (
    <div className="w-[320px] h-[640px] bg-bg-surface border-[10px] border-[#2A303C] rounded-[36px] shadow-2xl overflow-hidden relative flex flex-col font-sans">
      {/* Phone Notch */}
      <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
        <div className="w-32 h-6 bg-[#2A303C] rounded-b-xl"></div>
      </div>

      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div 
            key="login"
            className="flex-1 bg-accent-primary p-6 flex flex-col justify-center relative"
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-xl relative z-10">
              <div className="text-center mb-6">
                <h3 className="font-display text-xl text-gray-900">Coach Portal</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 block">Coach</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-900 focus:outline-none focus:border-accent-primary">
                    <option>Sarah Jenkins</option>
                    <option>Mike Ross</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 block">Bus Assignment</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-900 focus:outline-none focus:border-accent-primary">
                    <option>Bus 1 - Sundancer</option>
                    <option>Bus 2 - Twister</option>
                  </select>
                </div>
                
                <button 
                  onClick={() => setIsLoggedIn(true)}
                  className="w-full bg-accent-secondary text-white py-3.5 rounded-lg font-medium mt-2 shadow-sm"
                >
                  Start Shift
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="roster"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col bg-bg-base pt-10"
          >
            <div className="px-5 py-3 bg-bg-surface border-b border-border flex justify-between items-center shadow-sm z-10 relative">
              <div>
                <h4 className="font-medium text-text-primary text-sm">Sundancer • 9:30 AM</h4>
                <p className="text-xs text-text-secondary">Riverdale School Stop</p>
              </div>
              <div className="bg-accent-tertiary/10 text-accent-tertiary px-3 py-1 rounded-full text-xs font-mono font-medium border border-accent-tertiary/20">
                {students.filter(s => s.present).length}/8
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-8">
              {students.map((student) => (
                <div key={student.id} className="bg-bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
                  <div 
                    className="p-3 flex items-center justify-between cursor-pointer"
                    onClick={(e) => {
                      // Prevent expanding if clicking the checkbox
                      if ((e.target as HTMLElement).closest('button')) return;
                      setExpandedId(expandedId === student.id ? null : student.id);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => toggleAttendance(student.id)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors shrink-0
                          ${student.present 
                            ? 'bg-accent-tertiary border-accent-tertiary text-white' 
                            : 'bg-transparent border-border text-transparent hover:border-accent-tertiary/50'
                          }`}
                      >
                        <Check size={20} />
                      </button>
                      <span className={`font-medium transition-colors ${student.present ? 'text-text-primary' : 'text-text-secondary'}`}>
                        {student.name}
                      </span>
                    </div>
                    
                    <ChevronDown 
                      size={18} 
                      className={`text-text-secondary transition-transform ${expandedId === student.id ? 'rotate-180' : ''}`} 
                    />
                  </div>

                  <AnimatePresence>
                    {expandedId === student.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-bg-surface-alt/50 border-t border-border px-4 py-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <User size={14} className="text-text-secondary" />
                            <div className="flex flex-col">
                              <span className="text-xs text-text-secondary">Emergency Contact</span>
                              <span className="text-sm font-medium text-text-primary">{student.emergencyContact}</span>
                            </div>
                          </div>
                          <a href={`tel:${student.phone}`} className="w-10 h-10 bg-white border border-border rounded-full flex items-center justify-center text-accent-primary shadow-sm">
                            <Phone size={16} />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
