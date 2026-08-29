'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail, Instagram, Linkedin, Youtube,
  Play, Film, Clapperboard, ArrowRight, ArrowDown, ArrowUpRight,
  Menu, X,
} from 'lucide-react';
import { videoEditorTemplate } from '@/lib/templates/video-editor';
import { XLogo } from '@/components/icons/XLogo';
import CinematicBackground from '@/components/cinema/CinematicBackground';
import UniversalTestimonials from '@/components/universal/UniversalTestimonials';

type Project = {
  title: string;
  description: string;
  category?: string;
  tools?: string[];
  link?: string;
  thumbnail?: string;
  mediaLink?: string;
};

type Testimonial = {
  text: string;
  author: string;
  role: string;
  company?: string;
};

type FreelancerData = {
  name: string;
  email: string;
  niche: string;
  heroTagline?: string;
  bio: string;
  location?: string;
  availability?: string;
  ctaText?: string;
  ctaHeadline?: string;
  contactNote?: string;
  aboutHeading?: string;
  handle?: string;
  shortBio?: string;
  tools?: string[];
  services?: string[];
  portfolio?: Project[];
  testimonials?: Testimonial[];
  social?: Record<string, string>;
};

const easeExpo = [0.16, 1, 0.3, 1] as const;

function SparklesFallback({ size = 14, ...rest }: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path d="M19 14l.7 2.1L22 17l-2.3.9L19 20l-.7-2.1L16 17l2.3-.9L19 14z" />
    </svg>
  );
}

const SOFTWARE_ICONS: Record<string, React.ElementType> = {
  'premiere pro': Film,
  'premiere': Film,
  'davinci resolve': SparklesFallback,
  'davinci': SparklesFallback,
  'after effects': SparklesFallback,
  'final cut pro': Clapperboard,
  'final cut': Clapperboard,
  'audition': Play,
  'logic pro': Play,
  'photoshop': SparklesFallback,
  'illustrator': SparklesFallback,
};

const NAV_BASE = [
  { href: '#about', label: 'About', key: 'about' },
  { href: '#tools', label: 'Tools', key: 'tools' },
  { href: '#testimonials', label: 'Praise', key: 'testimonials' },
  { href: '#contact', label: 'Contact', key: 'contact' },
];

function parseUrlParams(): FreelancerData {
  if (typeof window === 'undefined') {
    return getDefaultData();
  }
  
  const params = new URLSearchParams(window.location.search);
  
  const tools = params.get('tools')?.split(',').filter(Boolean) || [];
  const services = params.get('services')?.split(',').filter(Boolean) || [];
  let social: Record<string, string> = {};
  try {
    social = params.get('social') ? JSON.parse(params.get('social')!) : {};
  } catch {}
  
  return {
    name: params.get('name') || 'Jamie Cruz',
    email: params.get('email') || 'jamie@example.com',
    niche: params.get('niche') || 'Video Editor',
    bio: params.get('bio') || 'Six years cutting commercials, docs, and narrative films.',
    location: params.get('location') || 'Los Angeles, CA',
    heroTagline: params.get('heroTagline') || 'Cinematic storytelling through precise cuts.',
    ctaHeadline: params.get('ctaHeadline') || "Let's make something unforgettable.",
    contactNote: params.get('contactNote') || 'Send me your footage. Replies within 24h.',
    tools,
    services,
    social,
  };
}

function getDefaultData(): FreelancerData {
  return {
    name: 'Jamie Cruz',
    email: 'jamie@example.com',
    niche: 'Video Editor',
    bio: 'Six years cutting commercials, docs, and narrative films.',
    location: 'Los Angeles, CA',
    heroTagline: 'Cinematic storytelling through precise cuts.',
    ctaHeadline: "Let's make something unforgettable.",
    contactNote: 'Send me your footage. Replies within 24h.',
    tools: ['Premiere Pro', 'DaVinci Resolve', 'After Effects'],
    services: ['Commercial Editing', 'Color Grading', 'Documentary'],
    social: {
      instagram: '@jamiecruz',
      vimeo: 'jamiecruz',
      youtube: '@jamiecruz',
      linkedin: 'jamie-cruz',
      email: 'jamie@example.com',
    },
  };
}

export function PreviewPortfolio() {
  const tmpl = videoEditorTemplate;
  const c = tmpl.colors;

  // Parse URL params on client side
  const [data, setData] = useState<FreelancerData>(() => {
    if (typeof window !== 'undefined') {
      return parseUrlParams();
    }
    return getDefaultData();
  });

  useEffect(() => {
    setData(parseUrlParams());
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    Object.entries({
      '--template-bg': c.bg,
      '--template-bg-elevated': c.bgElevated,
      '--template-bg-card': c.bgCard,
      '--template-border': c.border,
      '--template-border-hover': c.borderHover,
      '--template-fg': c.fg,
      '--template-fg-muted': c.fgMuted,
      '--template-fg-subtle': c.fgSubtle,
      '--template-accent': c.accent,
      '--template-accent-dim': c.accentDim,
      '--template-accent-glow': c.accentGlow,
      '--template-secondary': c.secondary,
      '--template-tertiary': c.tertiary,
    }).forEach(([k, v]) => root.style.setProperty(k, String(v)));
  }, [c]);

  const tools: string[] = data.tools || [];
  const testimonials: Testimonial[] = data.testimonials || [];
  const social = data.social || {};

  const hasTools = tools.length > 0;
  const hasTestimonials = testimonials.length > 0;
  const hasSocial = Object.values(social).some(v => v && v.trim());

  const navLinks = NAV_BASE.filter(l =>
    l.key === 'about' || l.key === 'contact' ||
    (l.key === 'tools' && hasTools) ||
    (l.key === 'testimonials' && hasTestimonials)
  );

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [headerOpacity, setHeaderOpacity] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const opacity = Math.min(scrollY / (window.innerHeight * 0.05), 1);
      setHeaderOpacity(opacity);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
    );
    ['about', 'tools', 'testimonials', 'contact'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background: c.bg,
        color: c.fg,
        fontFamily: tmpl.fonts.body,
      }}
    >
      <CinematicBackground accent={c.accent} secondary={c.secondary} />
      <div className="pointer-events-none fixed top-0 left-0 right-0 h-[14px] z-[58]" style={{ background: '#000' }} />
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 h-[14px] z-[58]" style={{ background: '#000' }} />

      <motion.header
        className="fixed top-[14px] left-0 right-0 z-[59] backdrop-blur-2xl"
        style={{ opacity: headerOpacity }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            className="flex items-center gap-2.5 font-bold text-[11px] uppercase tracking-[0.32em] transition-opacity hover:opacity-80"
            style={{ color: c.accent, fontFamily: tmpl.fonts.display }}
          >
            <Clapperboard size={14} strokeWidth={2} />
            <span>{data.name.split(' ')[0]}</span>
          </a>

          <nav className="hidden md:flex items-center gap-9">
            {navLinks.map((l) => {
              const isActive = activeSection === l.key;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(l.href); }}
                  className="relative text-[10.5px] font-bold uppercase tracking-[0.28em] transition-colors duration-300 py-2"
                  style={{ color: isActive ? c.accent : c.fgMuted, fontFamily: tmpl.fonts.display }}
                  onMouseEnter={(e) => !isActive && (e.currentTarget.style.color = c.fg)}
                  onMouseLeave={(e) => !isActive && (e.currentTarget.style.color = c.fgMuted)}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-px"
                      style={{ background: c.accent }}
                      transition={{ duration: 0.4, ease: easeExpo }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 -mr-2"
            style={{ color: c.fg }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>

        {mobileOpen && (
          <nav
            className="md:hidden border-t px-6 py-5 space-y-1"
            style={{ borderColor: c.border, background: 'rgba(0,0,0,0.95)' }}
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(l.href); }}
                className="block text-xs font-bold uppercase tracking-[0.25em] py-3"
                style={{ color: c.fgMuted, fontFamily: tmpl.fonts.display }}
                onMouseEnter={(e) => (e.currentTarget.style.color = c.accent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = c.fgMuted)}
              >
                {l.label}
              </a>
            ))}
          </nav>
        )}
      </motion.header>

      <main className="relative z-10">
        <section id="hero" className="min-h-screen flex items-center justify-center px-6 md:px-10 relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              background: `radial-gradient(ellipse 70% 50% at center 45%, ${c.accent}1A 0%, transparent 70%)`,
            }}
          />
          <motion.div
            aria-hidden
            className="absolute inset-y-0 -left-1/3 w-1/3 pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${c.accent}15 50%, transparent 100%)`,
              filter: 'blur(60px)',
            }}
            animate={{ x: ['0%', '400%'] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 95%)',
            }}
          />

          <div className="max-w-6xl mx-auto text-center relative z-10 pt-20 pb-24">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeExpo }}
              className="flex items-center justify-center gap-3 mb-12"
            >
              <div className="h-px w-8 md:w-12" style={{ background: c.accent, opacity: 0.5 }} />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.4em]"
                style={{ color: c.accent, fontFamily: tmpl.fonts.display }}
              >
                CINEMA
              </span>
              <div className="h-px w-8 md:w-12" style={{ background: c.accent, opacity: 0.5 }} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: easeExpo }}
              className="mb-10"
            >
              <div
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border"
                style={{
                  borderColor: `${c.accent}40`,
                  background: `${c.accent}08`,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: c.accent, boxShadow: `0 0 8px ${c.accent}` }}
                />
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.3em]"
                  style={{ color: c.accent, fontFamily: tmpl.fonts.display }}
                >
                  Available for projects
                </span>
              </div>
            </motion.div>

            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 50% 50% at center, ${c.accent}30 0%, transparent 70%)`,
                filter: 'blur(40px)',
              }}
            />

            <motion.h1
              initial={{ opacity: 0, y: 32, filter: 'blur(16px)', letterSpacing: '0.08em' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', letterSpacing: '-0.04em' }}
              transition={{ duration: 1.6, delay: 0.3, ease: easeExpo }}
              className="relative text-[clamp(3.5rem,11vw,9rem)] font-medium uppercase tracking-[-0.04em] mb-7 leading-[0.85]"
              style={{
                fontFamily: tmpl.fonts.display,
                background: `linear-gradient(180deg, ${c.fg} 0%, ${c.fg} 50%, ${c.fgMuted} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 500,
              }}
            >
              {data.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.55, ease: easeExpo }}
              className="text-base md:text-xl font-bold uppercase tracking-[0.32em] mb-10"
              style={{
                color: c.accent,
                fontFamily: tmpl.fonts.display,
              }}
            >
              {data.niche}
            </motion.p>

            {data.heroTagline && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.75, ease: easeExpo }}
                className="text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-14 font-light"
                style={{ color: c.fgMuted, fontFamily: tmpl.fonts.display, letterSpacing: '0.01em' }}
              >
                {data.heroTagline}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.95, ease: easeExpo }}
              className="flex flex-col sm:flex-row items-center justify-center gap-5"
            >
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full font-bold text-[11px] uppercase tracking-[0.28em] transition-colors duration-500 overflow-hidden cursor-pointer"
                style={{
                  background: c.accent,
                  color: c.bg,
                  fontFamily: tmpl.fonts.display,
                }}
                whileHover={{
                  y: -3,
                  boxShadow: `0 20px 50px ${c.accent}50, 0 0 0 1px ${c.accent}`,
                  transition: { duration: 0.3, ease: easeExpo },
                }}
                whileTap={{ y: -1, scale: 0.98 }}
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${c.fg}30, transparent)`,
                    mixBlendMode: 'overlay',
                  }}
                />
                <span className="relative z-10">Start a Project</span>
                <ArrowRight
                  size={14}
                  strokeWidth={2.5}
                  className="relative z-10 transition-transform duration-500 group-hover:translate-x-1.5"
                />
              </motion.a>
              <span
                className="hidden sm:inline text-[10px] font-bold uppercase tracking-[0.3em] px-3"
                style={{ color: c.fgSubtle, fontFamily: tmpl.fonts.display }}
              >
                — or just say hello
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1.2 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown size={14} strokeWidth={1.5} style={{ color: c.fgSubtle }} />
            </motion.div>
          </motion.div>
        </section>

        <section id="about" className="py-28 md:py-40 px-6 md:px-10 relative overflow-hidden">
          <div
            aria-hidden
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] opacity-30 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center, ${c.accent}10 0%, transparent 70%)`,
            }}
          />

          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 1.2, ease: easeExpo }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px w-10" style={{ background: c.accent }} />
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.4em]"
                  style={{ color: c.accent, fontFamily: tmpl.fonts.display }}
                >
                  About
                </span>
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.4em]"
                  style={{ color: c.fgSubtle, fontFamily: tmpl.fonts.display }}
                >
                  EST. {new Date().getFullYear()}
                </span>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ duration: 1.2, ease: easeExpo }}
                className="text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.15] font-light mb-20 max-w-4xl tracking-[-0.02em]"
                style={{ color: c.fg, fontFamily: tmpl.fonts.display, fontWeight: 300 }}
              >
                {data.bio}
              </motion.p>

              <div
                className="grid sm:grid-cols-3 gap-8 sm:gap-12 pt-10 border-t"
                style={{ borderColor: c.border }}
              >
                {data.location && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1, ease: easeExpo }}
                  >
                    <div
                      className="text-[9.5px] uppercase tracking-[0.35em] mb-3 font-bold"
                      style={{ color: c.fgSubtle, fontFamily: tmpl.fonts.display }}
                    >
                      Based in
                    </div>
                    <div
                      className="text-base font-medium"
                      style={{ color: c.fg, fontFamily: tmpl.fonts.display }}
                    >
                      {data.location}
                    </div>
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: easeExpo }}
                >
                  <div
                    className="text-[9.5px] uppercase tracking-[0.35em] mb-3 font-bold"
                    style={{ color: c.fgSubtle, fontFamily: tmpl.fonts.display }}
                  >
                    Availability
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: c.accent, boxShadow: `0 0 8px ${c.accent}` }}
                    />
                    <span
                      className="text-base font-medium"
                      style={{ color: c.accent, fontFamily: tmpl.fonts.display }}
                    >
                      Available
                    </span>
                  </div>
                </motion.div>
                {hasSocial && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3, ease: easeExpo }}
                  >
                    <div
                      className="text-[9.5px] uppercase tracking-[0.35em] mb-3 font-bold"
                      style={{ color: c.fgSubtle, fontFamily: tmpl.fonts.display }}
                    >
                      Connect
                    </div>
                    <div className="flex items-center gap-3.5">
                      {social.instagram && <CinemaSocialIcon platform="instagram" url={social.instagram} c={c} />}
                      {social.vimeo && <CinemaSocialIcon platform="vimeo" url={social.vimeo} c={c} />}
                      {social.youtube && <CinemaSocialIcon platform="youtube" url={social.youtube} c={c} />}
                      {social.linkedin && <CinemaSocialIcon platform="linkedin" url={social.linkedin} c={c} />}
                      {social.twitter && <CinemaSocialIcon platform="twitter" url={social.twitter} c={c} />}
                      {social.email && <CinemaSocialIcon platform="email" url={social.email} c={c} />}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {hasTools && (
          <section
            id="tools"
            className="py-28 md:py-36 px-6 md:px-10 relative overflow-hidden"
            style={{ background: '#050505' }}
          >
            <div
              aria-hidden
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vh] opacity-30 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at center, ${c.secondary}12 0%, transparent 70%)`,
              }}
            />

            <div className="max-w-5xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ duration: 1, ease: easeExpo }}
              >
                <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
                  <div>
                    <div className="flex items-center gap-4 mb-5">
                      <div className="h-px w-10" style={{ background: c.accent }} />
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.4em]"
                        style={{ color: c.accent, fontFamily: tmpl.fonts.display }}
                      >
                        The Suite
                      </span>
                    </div>
                    <h2
                      className="text-4xl md:text-5xl font-medium tracking-[-0.02em]"
                      style={{ color: c.fg, fontFamily: tmpl.fonts.display, lineHeight: 1.05 }}
                    >
                      Tools & software.
                    </h2>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {tools.map((tool, i) => {
                    const key = tool.toLowerCase().trim();
                    const Icon = SOFTWARE_ICONS[key] || SOFTWARE_ICONS[key.split(' ')[0]] || Film;
                    return (
                      <motion.div
                        key={tool}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.06, ease: easeExpo }}
                        whileHover={{ y: -4 }}
                        className="group relative inline-flex items-center gap-3 px-5 py-3 rounded-full transition-all duration-500 cursor-default overflow-hidden"
                        style={{
                          background: 'rgba(20, 20, 20, 0.6)',
                          border: `1px solid ${c.border}`,
                          backdropFilter: 'blur(12px)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = `${c.accent}80`;
                          e.currentTarget.style.background = `${c.accent}0A`;
                          e.currentTarget.style.boxShadow = `0 8px 24px ${c.accent}30, inset 0 0 0 1px ${c.accent}40`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = c.border;
                          e.currentTarget.style.background = 'rgba(20, 20, 20, 0.6)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <span
                          aria-hidden
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                          style={{
                            background: `linear-gradient(135deg, transparent 0%, ${c.accent}15 50%, transparent 100%)`,
                          }}
                        />
                        <Icon
                          size={14}
                          strokeWidth={1.5}
                          className="relative z-10 transition-colors duration-500 group-hover:[color:var(--template-accent)]"
                          style={{ color: c.fgSubtle }}
                        />
                        <span
                          className="relative z-10 text-xs font-medium tracking-[0.04em] uppercase transition-colors duration-500"
                          style={{
                            color: c.fgMuted,
                            fontFamily: tmpl.fonts.display,
                          }}
                        >
                          {tool}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        <section
          id="testimonials"
          className="py-28 md:py-40 px-6 md:px-10 relative overflow-hidden"
          style={{ background: c.bg }}
        >
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 1, ease: easeExpo }}
            >
              <div className="flex items-center gap-4 mb-16">
                <div className="h-px w-10" style={{ background: c.accent }} />
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.4em]"
                  style={{ color: c.accent, fontFamily: tmpl.fonts.display }}
                >
                  Praise
                </span>
              </div>
            </motion.div>
            <UniversalTestimonials kind="video" bg="#0A0A0A" fg="#F5F5F5" fgMuted="#9A9A9A" accent="#F59E0B" />
          </div>
        </section>

        <section
          id="contact"
          className="py-32 md:py-44 px-6 md:px-10 relative overflow-hidden"
          style={{ background: c.bg }}
        >
          <div
            aria-hidden
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] opacity-40 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at center, ${c.accent}14 0%, transparent 70%)` }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-60 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 95%)' }}
          />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 1, ease: easeExpo }}
            >
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="h-px w-10" style={{ background: c.accent, opacity: 0.5 }} />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em]" style={{ color: c.accent, fontFamily: tmpl.fonts.display }}>
                  Contact
                </span>
                <div className="h-px w-10" style={{ background: c.accent, opacity: 0.5 }} />
              </div>
              <h2
                className="text-[clamp(2.5rem,6vw,5rem)] font-medium tracking-[-0.02em] mb-8 leading-[1.05]"
                style={{ color: c.fg, fontFamily: tmpl.fonts.display }}
              >
                {data.ctaHeadline || "Let's cut something."}
              </h2>
              <p
                className="text-base md:text-lg leading-relaxed mb-12 max-w-xl mx-auto font-light"
                style={{ color: c.fgMuted, fontFamily: tmpl.fonts.display }}
              >
                {data.contactNote || 'Drop a line with the rough scope — turnaround, references, deadline. Replies within 24 hours.'}
              </p>

              <motion.a
                href={`mailto:${data.email}`}
                className="group inline-flex items-center gap-3 px-9 py-4 rounded-full font-bold text-[11px] uppercase tracking-[0.28em] transition-colors duration-500 overflow-hidden cursor-pointer"
                style={{
                  background: c.accent,
                  color: c.bg,
                  fontFamily: tmpl.fonts.display,
                }}
                whileHover={{
                  y: -3,
                  boxShadow: `0 20px 50px ${c.accent}50, 0 0 0 1px ${c.accent}`,
                  transition: { duration: 0.3, ease: easeExpo },
                }}
                whileTap={{ y: -1, scale: 0.98 }}
              >
                <span className="relative z-10">Email me</span>
                <ArrowUpRight size={14} strokeWidth={2.5} className="relative z-10 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>

              <p className="mt-8 text-xs tracking-[0.15em]" style={{ color: c.fgSubtle, fontFamily: tmpl.fonts.display }}>
                or write directly to{' '}
                <a href={`mailto:${data.email}`} className="underline-offset-4 hover:underline" style={{ color: c.accent }}>
                  {data.email}
                </a>
              </p>
            </motion.div>
          </div>
        </section>

        <footer
          className="py-8 px-6 md:px-10 border-t"
          style={{ borderColor: c.border, background: '#050505' }}
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p
              className="text-[9.5px] uppercase tracking-[0.32em]"
              style={{ color: c.fgSubtle, fontFamily: tmpl.fonts.display }}
            >
              Crafted with care
            </p>
            {hasSocial && (
              <div className="flex items-center gap-5">
                {social.instagram && <CinemaSocialIcon platform="instagram" url={social.instagram} c={c} small />}
                {social.vimeo && <CinemaSocialIcon platform="vimeo" url={social.vimeo} c={c} small />}
                {social.youtube && <CinemaSocialIcon platform="youtube" url={social.youtube} c={c} small />}
                {social.linkedin && <CinemaSocialIcon platform="linkedin" url={social.linkedin} c={c} small />}
                {social.twitter && <CinemaSocialIcon platform="twitter" url={social.twitter} c={c} small />}
                {social.email && <CinemaSocialIcon platform="email" url={social.email} c={c} small />}
              </div>
            )}
          </div>
        </footer>
      </main>
    </div>
  );
}

function CinemaSocialIcon({ platform, url, c, small = false }: { platform: string; url: string; c: typeof videoEditorTemplate.colors; small?: boolean }) {
  const size = small ? 14 : 16;
  let Icon: React.ElementType = Mail;
  let href = url.startsWith('http') ? url : `mailto:${url}`;

  switch (platform) {
    case 'instagram': Icon = Instagram; href = url.startsWith('http') ? url : `https://instagram.com/${url.replace('@', '')}`; break;
    case 'vimeo': Icon = Film; href = url.startsWith('http') ? url : `https://vimeo.com/${url}`; break;
    case 'youtube': Icon = Youtube; href = url.startsWith('http') ? url : `https://youtube.com/@${url.replace('@', '')}`; break;
    case 'linkedin': Icon = Linkedin; href = url.startsWith('http') ? url : `https://linkedin.com/in/${url}`; break;
    case 'twitter': Icon = XLogo; href = url.startsWith('http') ? url : `https://twitter.com/${url.replace('@', '')}`; break;
    case 'email': Icon = Mail; href = `mailto:${url}`; break;
  }

  return (
    <a
      href={href}
      target={platform === 'email' ? undefined : '_blank'}
      rel={platform === 'email' ? undefined : 'noopener noreferrer'}
      className="transition-all duration-300 hover:-translate-y-0.5"
      style={{ color: c.fgMuted }}
      onMouseEnter={(e) => (e.currentTarget.style.color = c.accent)}
      onMouseLeave={(e) => (e.currentTarget.style.color = c.fgMuted)}
      aria-label={platform}
    >
      <Icon size={size} strokeWidth={1.5} />
    </a>
  );
}

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/preview')({
  component: PreviewPortfolio,
})