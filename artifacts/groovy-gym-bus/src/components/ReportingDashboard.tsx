import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ShieldCheck, TrendingUp } from 'lucide-react';

const chartData = [
  { name: 'Bus 1', value: 12400, color: 'var(--accent-primary)' },
  { name: 'Bus 2', value: 9800, color: 'var(--accent-secondary)' },
  { name: 'Bus 3', value: 11200, color: 'var(--accent-tertiary)' },
];

const mockShifts = [
  { id: 'B1', coach: 'Sarah J.', start: '08:00 AM', end: '03:00 PM', students: 48 },
  { id: 'B2', coach: 'Mike R.', start: '08:15 AM', end: '02:30 PM', students: 36 },
  { id: 'B3', coach: 'Elena G.', start: '08:30 AM', end: '04:00 PM', students: 52 },
];

export default function ReportingDashboard() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <section id="reporting" className="py-24 bg-bg-base scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl text-text-primary mb-4">Operations at a Glance</h2>
          <p className="text-lg text-text-secondary">
            Every signed waiver, every completed route, and every dollar earned — automatically aggregated for your compliance and peace of mind.
          </p>
        </div>

        <motion.div 
          className="grid md:grid-cols-3 gap-6"
          onViewportEnter={() => setIsVisible(true)}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Chart Card */}
          <div className="md:col-span-2 bg-bg-surface border border-border rounded-2xl p-6 md:p-8 shadow-sm">
            <h3 className="text-lg font-medium text-text-primary mb-6">Monthly Revenue by Bus</h3>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontFamily: 'var(--font-sans)' }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontFamily: 'var(--font-mono)' }}
                    tickFormatter={(val) => `$${val/1000}k`}
                  />
                  <Tooltip 
                    cursor={{ fill: 'var(--bg-surface-alt)' }}
                    contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
                    itemStyle={{ color: 'var(--text-primary)' }}
                    formatter={(val: number) => [`$${val.toLocaleString()}`, 'Revenue']}
                  />
                  <Bar 
                    dataKey="value" 
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                    animationBegin={isVisible ? 0 : 99999}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="flex flex-col gap-6">
            <motion.div 
              className="bg-bg-surface border border-border rounded-2xl p-6 shadow-sm flex-1 flex flex-col justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-10 h-10 bg-accent-secondary/10 rounded-full flex items-center justify-center mb-4">
                <TrendingUp size={20} className="text-accent-secondary" />
              </div>
              <p className="text-text-secondary text-sm font-medium mb-1">Fleet Occupancy</p>
              <div className="text-3xl font-display font-medium text-text-primary">84%</div>
            </motion.div>

            <motion.div 
              className="bg-bg-surface border border-border rounded-2xl p-6 shadow-sm flex-1 flex flex-col justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="w-10 h-10 bg-accent-tertiary/10 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck size={20} className="text-accent-tertiary" />
              </div>
              <p className="text-text-secondary text-sm font-medium mb-1">Compliance Issues</p>
              <div className="text-3xl font-display font-medium text-text-primary flex items-baseline gap-2">
                0
                <span className="text-sm font-sans font-normal text-text-secondary">/ 30 days</span>
              </div>
            </motion.div>
          </div>

          {/* Table Card */}
          <motion.div 
            className="md:col-span-3 bg-bg-surface border border-border rounded-2xl p-6 shadow-sm overflow-x-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-sm font-medium text-text-primary mb-4 uppercase tracking-wider">Recent Shift Records</h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-xs font-medium text-text-secondary uppercase">Bus ID</th>
                  <th className="pb-3 text-xs font-medium text-text-secondary uppercase">Coach</th>
                  <th className="pb-3 text-xs font-medium text-text-secondary uppercase">Shift Start</th>
                  <th className="pb-3 text-xs font-medium text-text-secondary uppercase">Shift End</th>
                  <th className="pb-3 text-xs font-medium text-text-secondary uppercase">Students</th>
                </tr>
              </thead>
              <tbody className="font-mono text-sm">
                {mockShifts.map((shift, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-bg-surface-alt transition-colors">
                    <td className="py-3 text-text-primary">{shift.id}</td>
                    <td className="py-3 text-text-secondary font-sans">{shift.coach}</td>
                    <td className="py-3 text-text-primary">{shift.start}</td>
                    <td className="py-3 text-text-primary">{shift.end}</td>
                    <td className="py-3 text-text-primary">{shift.students}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
