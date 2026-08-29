/**
 * Video Editor Template - "Cinematic Theatre"
 * Psychology: Video editors are visual storytellers. They respond to cinematic quality,
 *   dark theatre aesthetics, color grading, motion. They pay for showcase of their reel.
 * Visual language: Pitch black, cinema bars (aspect ratios), warm amber/orange accents,
 *   large video thumbnails, Vimeo-style player, film grain texture.
 * They pay for: A showcase that makes their work look as cinematic as streaming platforms.
 */

export const videoEditorTemplate = {
  id: 'video-editor',
  name: 'Cinematic Theatre',
  
  colors: {
    bg: '#000000',
    bgElevated: '#0A0A0A',
    bgCard: '#111111',
    border: 'rgba(255,255,255,0.04)',
    borderHover: 'rgba(255,255,255,0.08)',
    fg: '#FFFFFF',
    fgMuted: '#888888',
    fgSubtle: '#555555',
    accent: '#FF6B1A',         // Cinema amber/orange
    accentDim: 'rgba(255,107,26,0.12)',
    accentGlow: 'rgba(255,107,26,0.4)',
    secondary: '#FFB800',      // Warm gold
    tertiary: '#FF4444',       // Action red
    warning: '#FFB800',
    success: '#00E5A0',
  },
  
  fonts: {
    display: "'Anton', 'Inter', sans-serif",        // Bold cinematic display font
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace",
    label: "'Anton', 'Inter', sans-serif",
  },
  
  spacing: {
    section: 'py-20 md:py-28 lg:py-32',             // More breathing room - cinematic
    container: 'max-w-7xl',
    cardGap: 'gap-8',
    elementGap: 'gap-6',
  },
  
  components: {
    card: {
      borderRadius: 'rounded-2xl',
      border: 'border border-white/5',
      hover: 'hover:border-[#FF6B1A]/30 hover:shadow-[0_0_40px_rgba(255,107,26,0.15)] hover:-translate-y-2 transition-all duration-500',
      background: 'bg-black/60 backdrop-blur-xl',
    },
    button: {
      primary: 'bg-gradient-to-r from-[#FF6B1A] to-[#FF4500] text-white font-bold px-10 py-5 rounded-xl hover:from-[#FF8533] hover:to-[#FF6B1A] hover:shadow-[0_0_30px_rgba(255,107,26,0.6)] hover:scale-105 transition-all uppercase tracking-wider',
      secondary: 'border border-white/20 text-white font-bold px-10 py-5 rounded-xl hover:border-[#FF6B1A] hover:text-[#FF6B1A] hover:bg-[#FF6B1A]/5 transition-all uppercase tracking-wider',
      ghost: 'text-white/60 hover:text-white hover:bg-white/5 px-4 py-2 rounded transition-all',
    },
    badge: {
      default: 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-mono uppercase tracking-wider',
      category: 'inline-flex items-center gap-1 px-3 py-1 rounded bg-[#FF6B1A]/15 text-[#FF6B1A] text-xs font-bold uppercase tracking-wider',
      accent: 'inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FF6B1A]/20 text-[#FF6B1A] text-xs font-bold uppercase tracking-wider',
    },
    input: 'w-full px-5 py-4 rounded-xl bg-white/3 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#FF6B1A] focus:ring-2 focus:ring-[#FF6B1A]/30 transition-all',
  },
  
  hero: {
    layout: 'full-bleed-video',
    showReel: true,
    showPlayButton: true,
    height: 'min-h-screen',
    filmGrain: true,
    cinemaBars: true,
  },
  
  portfolio: {
    layout: 'full-width-video-cards',
    cardStyle: 'cinema-card',
    showVideoPlayer: true,
    showDuration: true,
    showCategory: true,
    thumbnail: 'video-frame',
    aspectRatio: '16:9',
    largeFirst: true,             // First project is large/full-width
  },
  
  skills: {
    layout: 'horizontal-scroll',
    showSoftware: true,
    style: 'film-strip',
  },
  
  animations: {
    pageLoad: 'cinematic-fade-in',
    cardHover: 'scale-lift',
    scrollReveal: 'fade-in-slow',
    videoPlay: 'scale-blur-focus',
    reducedMotion: true,
  },
  
  cssVars: `
    --template-bg: #000000;
    --template-bg-elevated: #0A0A0A;
    --template-bg-card: #111111;
    --template-border: rgba(255,255,255,0.04);
    --template-border-hover: rgba(255,255,255,0.08);
    --template-fg: #FFFFFF;
    --template-fg-muted: #888888;
    --template-fg-subtle: #555555;
    --template-accent: #FF6B1A;
    --template-accent-dim: rgba(255,107,26,0.12);
    --template-accent-glow: rgba(255,107,26,0.4);
    --template-secondary: #FFB800;
    --template-tertiary: #FF4444;
    --template-warning: #FFB800;
    --template-success: #00E5A0;
    --template-font-display: 'Anton', 'Inter', sans-serif;
    --template-font-body: 'Inter', system-ui, sans-serif;
    --template-font-mono: 'JetBrains Mono', ui-monospace, monospace;
    --template-font-label: 'Anton', 'Inter', sans-serif;
  `,
};