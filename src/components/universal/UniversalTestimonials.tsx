'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface UniversalTestimonialsProps {
  kind: 'video' | 'developer' | 'designer' | 'writer' | 'marketer';
  bg: string;
  fg: string;
  fgMuted: string;
  accent: string;
}

const testimonialsData: Record<string, Array<{ text: string; author: string; role: string; company?: string }>> = {
  video: [
    { text: "Their editing transformed our raw footage into a cinematic masterpiece. The pacing, color grading, and sound design were impeccable.", author: "Sarah Chen", role: "Creative Director", company: "Neon Films" },
    { text: "Best editor I've worked with in 15 years. They understand story structure intuitively and deliver ahead of schedule every time.", author: "Marcus Johnson", role: "Executive Producer", company: "Apex Studios" },
    { text: "The attention to detail in color grading alone is worth the investment. Our documentary got into Sundance largely because of their work.", author: "Elena Rodriguez", role: "Documentary Filmmaker", company: "Independent" },
    { text: "They took our commercial campaign from good to award-winning. The rhythm and emotional beats were perfectly calibrated.", author: "David Park", role: "Brand Director", company: "Velocity Agency" },
    { text: "Reliable, fast, and creatively brilliant. Our YouTube channel grew 300% after they started editing our content.", author: "Lisa Wang", role: "Content Creator", company: "TechFlow Media" },
    { text: "Their After Effects work is next level. Complex composites that look completely seamless. Pure magic.", author: "James Morrison", role: "VFX Supervisor", company: "PixelForge" },
    { text: "Every project feels like a collaboration, not a transaction. They push back when needed and elevate the vision.", author: "Rachel Kim", role: "Series Producer", company: "Streamline Productions" },
    { text: "The sound design integration is seamless. They think in terms of the full audiovisual experience, not just visuals.", author: "Tommy Vega", role: "Audio Director", company: "Resonance Audio" },
    { text: "Turnaround time is incredible without sacrificing quality. Our tightest deadline was met with broadcast-ready work.", author: "Amanda Foster", role: "Post-Production Supervisor", company: "Cutting Edge Post" },
    { text: "They understand the language of cinema. Every cut serves the story. That's rare and invaluable.", author: "Kevin O'Brien", role: "Film Director", company: "Independent" },
    { text: "Color consistency across a 12-episode series was flawless. Technical precision meets artistic vision.", author: "Nina Patel", role: "Showrunner", company: "Horizon Series" },
    { text: "Best investment we made for our brand videos. Conversion rates doubled after their edits went live.", author: "Carlos Mendez", role: "Marketing VP", company: "Elevate Brands" },
    { text: "Their reel speaks for itself, but working with them is even better. Collaborative, communicative, creative.", author: "Priya Shah", role: "Creative Lead", company: "Lumina Creative" },
    { text: "Handled our 4K RAW footage workflow effortlessly. Proxy management, color pipeline, delivery specs — all perfect.", author: "Ryan Collins", role: "Technical Director", company: "FramePerfect Labs" },
    { text: "The emotional intelligence in their editing choices is what sets them apart. They know exactly when to hold and when to cut.", author: "Sophie Laurent", role: "Editor-in-Chief", company: "Cinema Quarterly" },
    { text: "Motion graphics integration was seamless. They elevated our explainer videos from corporate to cinematic.", author: "Ahmed Hassan", role: "Product Marketing Lead", company: "InnovateTech" },
    { text: "Simply the best. Our clients notice the difference immediately. Premium work, premium partner.", author: "Jennifer Walsh", role: "Agency Owner", company: "Walsh & Partners" },
    { text: "They brought our documentary to life in ways we never imagined. The narrative structure they found in the footage was brilliant.", author: "Michael Torres", role: "Producer", company: "Truth Tellers Media" },
  ],
  developer: [
    { text: "Cleanest code I've seen in 20 years. Architecture decisions that scale beautifully.", author: "Alex Kim", role: "CTO", company: "ScaleUp Inc" },
    { text: "They don't just write code — they engineer solutions. Our platform handles 10x traffic now.", author: "Maria Santos", role: "VP Engineering", company: "DataFlow" },
  ],
  designer: [
    { text: "Visual systems that actually work in production. Not just pretty Dribbble shots.", author: "Jordan Lee", role: "Design Director", company: "PixelPerfect" },
  ],
  writer: [
    { text: "Words that convert. Our landing page conversion jumped 40% after their rewrite.", author: "Taylor Brooks", role: "Growth Lead", company: "ConvertCo" },
  ],
  marketer: [
    { text: "Strategy backed by data, executed with creativity. ROI tripled in Q1.", author: "Chris Morgan", role: "Founder", company: "GrowthLab" },
  ],
};

export default function UniversalTestimonials({ kind, bg, fg, fgMuted, accent }: UniversalTestimonialsProps) {
  const [mounted, setMounted] = useState(false);
  const testimonials = testimonialsData[kind] || testimonialsData.video;

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="py-20" style={{ background: bg, color: fg }}>
        <div className="max-w-6xl mx-auto px-6" style={{ color: fgMuted }}>
          Loading testimonials...
        </div>
      </div>
    );
  }

  return (
    <section className="relative" style={{ background: bg }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((t, i) => (
            <TestimonialCard key={i} t={t} c={{ accent, bg, fg, fgMuted }} i={i} />
          ))}
        </div>
        {testimonials.length > 6 && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12 text-sm"
            style={{ color: fgMuted }}
          >
            +{testimonials.length - 6} more testimonials available on request
          </motion.p>
        )}
      </div>
    </section>
  );
}

function TestimonialCard({ t, c, i }: { t: { text: string; author: string; role: string; company?: string }; c: { accent: string; bg: string; fg: string; fgMuted: string }; i: number }) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 50, y: 50, visible: false });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpot({ x, y, visible: true });

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const tiltX = ((e.clientY - cy) / rect.height) * -3;
    const tiltY = ((e.clientX - cx) / rect.width) * 3;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
  };

  const handleLeave = () => {
    setSpot((s) => ({ ...s, visible: false }));
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      cardRef.current.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    }
  };

  const handleEnter = () => {
    if (cardRef.current) cardRef.current.style.transition = 'transform 0.15s ease-out';
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={handleEnter}
      className="group relative p-8 rounded-2xl overflow-hidden cursor-default"
      style={{
        background: c.bg,
        border: `1px solid rgba(255,255,255,0.04)`,
        transformStyle: 'preserve-3d',
        transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
        boxShadow: spot.visible ? `0 24px 60px ${c.accent}15, 0 0 0 1px ${c.accent}30` : 'none',
        borderColor: spot.visible ? `${c.accent}50` : 'rgba(255,255,255,0.04)',
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 200px at ${spot.x}% ${spot.y}%, ${c.accent}25 0%, transparent 70%)`,
          opacity: spot.visible ? 1 : 0,
        }}
      />

      <motion.div
        className="absolute top-5 right-5"
        animate={{ rotate: [0, -3, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transform: 'translateZ(20px)' }}
      >
        <span
          className="block font-serif leading-none select-none"
          style={{
            fontSize: '6rem',
            color: c.accent,
            opacity: 0.22,
            fontFamily: 'Georgia, serif',
          }}
        >
          &ldquo;
        </span>
      </motion.div>

      <blockquote
        className="text-base leading-relaxed mb-8 relative"
        style={{
          color: c.fg,
          transform: 'translateZ(10px)',
        }}
      >
        {t.text}
      </blockquote>

      <figcaption
        className="flex items-center gap-3 pt-6 border-t relative"
        style={{
          borderColor: 'rgba(255,255,255,0.04)',
          transform: 'translateZ(15px)',
        }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0"
          style={{
            background: `${c.accent}15`,
            color: c.accent,
            border: `1px solid ${c.accent}40`,
          }}
        >
          {t.author.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="font-bold text-sm" style={{ color: c.fg }}>
            {t.author}
          </div>
          <div className="text-xs" style={{ color: c.fgMuted }}>
            {t.role}{t.company && <span style={{ color: c.fgMuted }}> · {t.company}</span>}
          </div>
        </div>
      </figcaption>
    </motion.div>
  );
}