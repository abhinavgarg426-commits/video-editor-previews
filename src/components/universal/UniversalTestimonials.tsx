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

const testimonialsData: Record<string, Array<{ text: string; author: string }>> = {
  video: [
    { text: "Their editing transformed our raw footage into a cinematic masterpiece. The pacing, color grading, and sound design were impeccable.", author: "Sarah Chen" },
    { text: "Best editor I've worked with in 15 years. They understand story structure intuitively and deliver ahead of schedule every time.", author: "Marcus Johnson" },
    { text: "The attention to detail in color grading alone is worth the investment. Our documentary got into Sundance largely because of their work.", author: "Elena Rodriguez" },
    { text: "They took our commercial campaign from good to award-winning. The rhythm and emotional beats were perfectly calibrated.", author: "David Park" },
    { text: "Reliable, fast, and creatively brilliant. Our YouTube channel grew 300% after they started editing our content.", author: "Lisa Wang" },
    { text: "Their After Effects work is next level. Complex composites that look completely seamless. Pure magic.", author: "James Morrison" },
    { text: "Every project feels like a collaboration, not a transaction. They push back when needed and elevate the vision.", author: "Rachel Kim" },
    { text: "The sound design integration is seamless. They think in terms of the full audiovisual experience, not just visuals.", author: "Tommy Vega" },
    { text: "Turnaround time is incredible without sacrificing quality. Our tightest deadline was met with broadcast-ready work.", author: "Amanda Foster" },
    { text: "They understand the language of cinema. Every cut serves the story. That's rare and invaluable.", author: "Kevin O'Brien" },
    { text: "Color consistency across a 12-episode series was flawless. Technical precision meets artistic vision.", author: "Nina Patel" },
    { text: "Best investment we made for our brand videos. Conversion rates doubled after their edits went live.", author: "Carlos Mendez" },
    { text: "Their reel speaks for itself, but working with them is even better. Collaborative, communicative, creative.", author: "Priya Shah" },
    { text: "Handled our 4K RAW footage workflow effortlessly. Proxy management, color pipeline, delivery specs — all perfect.", author: "Ryan Collins" },
    { text: "The emotional intelligence in their editing choices is what sets them apart. They know exactly when to hold and when to cut.", author: "Sophie Laurent" },
    { text: "Motion graphics integration was seamless. They elevated our explainer videos from corporate to cinematic.", author: "Ahmed Hassan" },
    { text: "Simply the best. Our clients notice the difference immediately. Premium work, premium partner.", author: "Jennifer Walsh" },
    { text: "They brought our documentary to life in ways we never imagined. The narrative structure they found in the footage was brilliant.", author: "Michael Torres" },
  ],
  developer: [
    { text: "Cleanest code I've seen in 20 years. Architecture decisions that scale beautifully.", author: "Alex Kim" },
    { text: "They don't just write code — they engineer solutions. Our platform handles 10x traffic now.", author: "Maria Santos" },
  ],
  designer: [
    { text: "Visual systems that actually work in production. Not just pretty Dribbble shots.", author: "Jordan Lee" },
  ],
  writer: [
    { text: "Words that convert. Our landing page conversion jumped 40% after their rewrite.", author: "Taylor Brooks" },
  ],
  marketer: [
    { text: "Strategy backed by data, executed with creativity. ROI tripled in Q1.", author: "Chris Morgan" },
  ],
};

export default function UniversalTestimonials({ kind, bg, fg, fgMuted, accent }: UniversalTestimonialsProps) {
  const testimonials = testimonialsData[kind] || testimonialsData.video;

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

function TestimonialCard({ t, c, i }: { t: { text: string; author: string }; c: { accent: string; bg: string; fg: string; fgMuted: string }; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative p-8 rounded-2xl overflow-hidden cursor-default"
      style={{
        background: c.bg,
        border: `1px solid rgba(255,255,255,0.04)`,
        transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${c.accent}50`;
        e.currentTarget.style.boxShadow = `0 24px 60px ${c.accent}15, 0 0 0 1px ${c.accent}30`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <blockquote
        className="text-base leading-relaxed mb-8 relative"
        style={{
          color: c.fg,
        }}
      >
        {t.text}
      </blockquote>

      <figcaption
        className="flex items-center gap-3 pt-6 border-t relative"
        style={{
          borderColor: 'rgba(255,255,255,0.04)',
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
        </div>
      </figcaption>
    </motion.div>
  );
}