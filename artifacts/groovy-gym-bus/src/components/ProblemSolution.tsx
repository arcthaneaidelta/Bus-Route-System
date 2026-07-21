import React from 'react';
import { motion } from 'framer-motion';

export default function ProblemSolution() {
  return (
    <section className="py-12 md:py-24 bg-bg-surface-alt">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl text-text-primary mb-6">
            Standard software assumes you have a building. You have a fleet.
          </h2>
          <p className="text-lg text-text-secondary mb-4 leading-relaxed">
            Legacy gym CRMs force you to map daycare stops as "rooms" and overbook buses because they don't understand transit time. 
          </p>
          <p className="text-lg text-text-secondary leading-relaxed">
            Groovy Gym Bus connects your routing, your roster, and your parents into one unified schedule. When the bus moves, the system updates.
          </p>
        </motion.div>

        <motion.div
          className="relative h-[300px] md:h-[400px] w-full flex items-center justify-center bg-bg-surface rounded-2xl border border-border shadow-sm p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <svg className="w-full h-full max-w-[400px]" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* The Tangled Mess (Before) - Fades out */}
            <motion.g
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <rect x="50" y="50" width="80" height="40" rx="4" stroke="var(--text-secondary)" strokeDasharray="4" />
              <rect x="250" y="40" width="80" height="40" rx="4" stroke="var(--text-secondary)" strokeDasharray="4" />
              <rect x="150" y="200" width="80" height="40" rx="4" stroke="var(--text-secondary)" strokeDasharray="4" />
              <path d="M 90 90 L 290 40 M 290 80 L 190 200 M 130 90 L 150 200 M 250 60 Q 150 150 230 200" stroke="var(--text-secondary)" strokeOpacity="0.3" strokeWidth="2" />
              <text x="90" y="75" fill="var(--text-secondary)" fontSize="12" textAnchor="middle" fontFamily="var(--font-mono)">Forms</text>
              <text x="290" y="65" fill="var(--text-secondary)" fontSize="12" textAnchor="middle" fontFamily="var(--font-mono)">Schedule</text>
              <text x="190" y="225" fill="var(--text-secondary)" fontSize="12" textAnchor="middle" fontFamily="var(--font-mono)">Waivers</text>
            </motion.g>

            {/* The Clean Route (After) - Draws in */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <motion.path 
                d="M 50 150 L 150 150 L 250 150 L 350 150" 
                stroke="var(--accent-primary)" 
                strokeWidth="4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
              />
              {[
                { x: 50, label: "Parent", color: "var(--accent-primary)" },
                { x: 150, label: "Roster", color: "var(--accent-secondary)" },
                { x: 250, label: "Bus", color: "var(--accent-tertiary)" },
                { x: 350, label: "Report", color: "var(--text-primary)" }
              ].map((node, i) => (
                <motion.g 
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.5 + (i * 0.2), type: "spring" }}
                >
                  <circle cx={node.x} cy="150" r="12" fill={node.color} />
                  <text x={node.x} y="185" fill="var(--text-primary)" fontSize="14" textAnchor="middle" fontFamily="var(--font-sans)" fontWeight="500">{node.label}</text>
                </motion.g>
              ))}
            </motion.g>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
