import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const TITLE = 'GROOVY GYM BUS';
const chars = TITLE.split('');

// Three route paths across the full viewport (1280×720 coordinate space)
const ROUTE_1 = 'M -60 175 C 120 90, 280 260, 480 170 S 720 80, 940 180 S 1140 100, 1340 155';
const ROUTE_2 = 'M -60 380 C 100 320, 300 440, 520 370 S 780 280, 1000 380 S 1180 460, 1340 390';
const ROUTE_3 = 'M -60 580 C 160 540, 340 630, 560 565 S 820 490, 1060 580 S 1240 640, 1340 595';

// Street grid
const H_STREETS = [80, 220, 360, 480, 620];
const V_STREETS = [90, 230, 380, 540, 700, 860, 1040, 1200];

// Bus stop positions per route
const STOPS_1 = [{ x: 182, y: 152 }, { x: 482, y: 168 }, { x: 790, y: 148 }, { x: 1080, y: 158 }];
const STOPS_2 = [{ x: 260, y: 370 }, { x: 560, y: 362 }, { x: 860, y: 372 }, { x: 1120, y: 382 }];
const STOPS_3 = [{ x: 320, y: 562 }, { x: 620, y: 558 }, { x: 920, y: 570 }];

function BusShape({ color }: { color: string }) {
  return (
    <g>
      <rect x="-14" y="-7" width="28" height="14" rx="3.5" fill={color} />
      <rect x="-11" y="-5" width="7" height="6" rx="1" fill="rgba(0,0,0,0.25)" />
      <rect x="-1" y="-5" width="7" height="6" rx="1" fill="rgba(0,0,0,0.25)" />
      <rect x="5" y="-5" width="6" height="6" rx="1" fill="rgba(0,0,0,0.25)" />
      <circle cx="-9" cy="7" r="2" fill="rgba(255,255,255,0.35)" />
      <circle cx="9" cy="7" r="2" fill="rgba(255,255,255,0.35)" />
    </g>
  );
}

function AnimatedBus({
  path,
  color,
  dur,
  begin,
}: {
  path: string;
  color: string;
  dur: string;
  begin: string;
}) {
  return (
    <g>
      <BusShape color={color} />
      <animateMotion path={path} dur={dur} begin={begin} repeatCount="indefinite" rotate="auto" />
    </g>
  );
}

function BusStop({ x, y, color, delay }: { x: number; y: number; color: string; delay: number }) {
  return (
    <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay, duration: 0.3, ease: 'backOut' }}>
      <circle cx={x} cy={y} r={7} fill="#14171F" stroke={color} strokeWidth={2.5} />
      <circle cx={x} cy={y} r={3} fill={color} />
      <motion.circle
        cx={x}
        cy={y}
        r={7}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        initial={{ scale: 1, opacity: 0.8 }}
        animate={{ scale: 2.4, opacity: 0 }}
        transition={{ delay, duration: 1.2, ease: 'easeOut', repeat: Infinity, repeatDelay: 2 }}
        style={{ transformOrigin: `${x}px ${y}px` }}
      />
    </motion.g>
  );
}

export default function LoadingSequence({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'building' | 'done'>('building');
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      const t = setTimeout(onComplete, 300);
      return () => clearTimeout(t);
    }

    const totalMs = 3200;
    const tick = 30;
    const steps = totalMs / tick;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const t = step / steps;
      // Ease: fast at start, slows near end, then snaps to 100
      const eased = t < 0.9 ? 1 - Math.pow(1 - t / 0.9, 2.5) : 1;
      setProgress(Math.min(100, Math.round(eased * 100)));

      if (step >= steps) {
        clearInterval(timer);
        setPhase('done');
        setTimeout(onComplete, 600);
      }
    }, tick);

    return () => clearInterval(timer);
  }, [onComplete, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <motion.div
        className="fixed inset-0 z-50 bg-[#14171F]"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ background: '#14171F' }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Full-viewport animated SVG map */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1280 720"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Street grid */}
        <g opacity="0.06" stroke="#E9E7DF" strokeWidth="1">
          {H_STREETS.map((y) => (
            <motion.line
              key={`h${y}`}
              x1={0}
              y1={y}
              x2={1280}
              y2={y}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
            />
          ))}
          {V_STREETS.map((x) => (
            <motion.line
              key={`v${x}`}
              x1={x}
              y1={0}
              x2={x}
              y2={720}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.15 }}
            />
          ))}
        </g>

        {/* Diagonal corner accent lines */}
        <motion.line x1={0} y1={0} x2={180} y2={180} stroke="#2B4C7E" strokeWidth="1" opacity="0.15"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.3 }} />
        <motion.line x1={1280} y1={0} x2={1100} y2={180} stroke="#C97D2C" strokeWidth="1" opacity="0.15"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.4 }} />
        <motion.line x1={0} y1={720} x2={180} y2={540} stroke="#6B8F71" strokeWidth="1" opacity="0.15"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.35 }} />

        {/* Glow underneath routes */}
        <motion.path d={ROUTE_1} stroke="#2B4C7E" strokeWidth="18" fill="none" strokeLinecap="round" opacity="0.08"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay: 0.2 }} />
        <motion.path d={ROUTE_2} stroke="#C97D2C" strokeWidth="18" fill="none" strokeLinecap="round" opacity="0.08"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1], delay: 0.4 }} />
        <motion.path d={ROUTE_3} stroke="#6B8F71" strokeWidth="18" fill="none" strokeLinecap="round" opacity="0.08"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1], delay: 0.3 }} />

        {/* Route line 1 — Route Blue */}
        <motion.path
          d={ROUTE_1}
          stroke="#2B4C7E"
          strokeWidth="3"
          fill="none"
          strokeDasharray="10 6"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
        />

        {/* Route line 2 — Marigold */}
        <motion.path
          d={ROUTE_2}
          stroke="#C97D2C"
          strokeWidth="3"
          fill="none"
          strokeDasharray="10 6"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1], delay: 0.4 }}
        />

        {/* Route line 3 — Sage */}
        <motion.path
          d={ROUTE_3}
          stroke="#6B8F71"
          strokeWidth="3"
          fill="none"
          strokeDasharray="10 6"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1], delay: 0.3 }}
        />

        {/* Bus stop dots */}
        {STOPS_1.map((s, i) => <BusStop key={`s1-${i}`} x={s.x} y={s.y} color="#5A82B8" delay={0.7 + i * 0.15} />)}
        {STOPS_2.map((s, i) => <BusStop key={`s2-${i}`} x={s.x} y={s.y} color="#D9924A" delay={0.9 + i * 0.15} />)}
        {STOPS_3.map((s, i) => <BusStop key={`s3-${i}`} x={s.x} y={s.y} color="#7FA786" delay={0.8 + i * 0.15} />)}

        {/* Animated buses */}
        <AnimatedBus path={ROUTE_1} color="#3A6099" dur="12s" begin="-2s" />
        <AnimatedBus path={ROUTE_1} color="#3A6099" dur="12s" begin="-8s" />
        <AnimatedBus path={ROUTE_2} color="#C97D2C" dur="16s" begin="-5s" />
        <AnimatedBus path={ROUTE_2} color="#C97D2C" dur="16s" begin="-12s" />
        <AnimatedBus path={ROUTE_3} color="#6B8F71" dur="14s" begin="-4s" />
      </svg>

      {/* Dark vignette overlay to push attention to center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 60% at 50% 50%, transparent 20%, rgba(20,23,31,0.72) 100%)',
        }}
      />

      {/* Center stage */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8">

        {/* Tagline above wordmark */}
        <motion.p
          className="font-mono text-xs tracking-[0.28em] uppercase mb-8 text-center"
          style={{ color: '#5A82B8', letterSpacing: '0.28em' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
        >
          Fleet Operations Platform
        </motion.p>

        {/* Wordmark — letter by letter */}
        <div className="flex items-center justify-center flex-wrap gap-0">
          {chars.map((char, i) => (
            <motion.span
              key={i}
              className="font-display font-semibold leading-none select-none"
              style={{
                fontSize: 'clamp(42px, 8vw, 100px)',
                color: '#E9E7DF',
                letterSpacing: '-0.02em',
                display: char === ' ' ? 'inline-block' : 'inline-block',
                width: char === ' ' ? '0.35em' : 'auto',
                textShadow: '0 0 80px rgba(90,130,184,0.25)',
              }}
              initial={{ opacity: 0, y: 48, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                delay: 1.0 + i * 0.045,
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          className="font-sans mt-6 text-center"
          style={{ color: '#9AA2B1', fontSize: '17px', fontWeight: 400, letterSpacing: '0.01em' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.6, ease: 'easeOut' }}
        >
          3 Buses · 700+ Students · Live Route Intelligence
        </motion.p>

        {/* Stat pills */}
        <motion.div
          className="flex items-center gap-6 mt-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.5, ease: 'easeOut' }}
        >
          {[
            { label: 'Fleet Routes', value: '3', color: '#5A82B8' },
            { label: 'Students Enrolled', value: '700+', color: '#D9924A' },
            { label: 'Waivers Automated', value: '100%', color: '#7FA786' },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="font-mono font-medium text-xl" style={{ color }}>{value}</span>
              <span className="font-sans text-xs uppercase tracking-widest" style={{ color: '#5B6472' }}>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom progress bar */}
      <div className="absolute bottom-0 left-0 right-0">
        {/* Label row */}
        <motion.div
          className="flex items-center justify-between px-8 pb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <span className="font-mono text-xs" style={{ color: '#5B6472', letterSpacing: '0.15em' }}>
            INITIALIZING
          </span>
          <span className="font-mono text-xs tabular-nums" style={{ color: '#C97D2C' }}>
            {progress}%
          </span>
        </motion.div>

        {/* Track */}
        <div className="w-full h-[3px]" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <motion.div
            className="h-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #2B4C7E 0%, #C97D2C 60%, #6B8F71 100%)',
              boxShadow: '0 0 12px rgba(201,125,44,0.6)',
              transition: 'width 0.04s linear',
            }}
          />
        </div>
      </div>

      {/* Corner coordinates — transit map aesthetic */}
      {[
        { className: 'top-6 left-8', text: '43.6532° N' },
        { className: 'top-6 right-8', text: '79.3832° W' },
        { className: 'bottom-10 left-8', text: 'GGB-OPS v2.1' },
        { className: 'bottom-10 right-8', text: 'FLEET ACTIVE' },
      ].map(({ className, text }) => (
        <motion.span
          key={text}
          className={`absolute font-mono text-[10px] tracking-widest uppercase ${className}`}
          style={{ color: 'rgba(255,255,255,0.14)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {text}
        </motion.span>
      ))}
    </motion.div>
  );
}
