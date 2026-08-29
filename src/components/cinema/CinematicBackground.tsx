import { motion } from 'framer-motion';

interface CinematicBackgroundProps {
  accent: string;
  secondary: string;
}

export default function CinematicBackground({ accent, secondary }: CinematicBackgroundProps) {
  const particles = Array.from({ length: 20 }, (_) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 10,
    duration: 15 + Math.random() * 20,
    opacity: Math.random() * 0.3 + 0.05,
    color: Math.random() > 0.5 ? accent : secondary,
  }));

  const noiseSvg = "%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E";

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{
        background: '#000',
      }}
    >
      {/* Film grain overlay */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `url("data:image/svg+xml,${noiseSvg}")`,
          pointerEvents: 'none',
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            opacity: p.opacity,
            filter: 'blur(1px)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, p.opacity, 0],
            y: [0, -100],
            x: [0, (Math.random() - 0.5) * 50],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Slow color shifts - ambient lighting */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 20% 30%, ${accent}40 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 70%, ${secondary}30 0%, transparent 60%)`,
          filter: 'blur(120px)',
        }}
        animate={{
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}