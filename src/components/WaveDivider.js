'use client';

/**
 * Organic wavy SVG divider between sections.
 * variant: 'pink-to-mint' | 'mint-to-pink' | 'fade-top' | 'fade-bottom'
 * flip: mirrors vertically
 */
export default function WaveDivider({
  variant = 'pink-to-mint',
  flip = false,
  className = '',
  height = 120,
}) {
  const id = `wave-${variant}-${flip ? 'f' : 'n'}`;

  const gradients = {
    'pink-to-mint': [
      { offset: '0%', color: '#FF8FAF', opacity: 0.22 },
      { offset: '100%', color: '#CCFAD6', opacity: 0.35 },
    ],
    'mint-to-pink': [
      { offset: '0%', color: '#CCFAD6', opacity: 0.35 },
      { offset: '100%', color: '#FF8FAF', opacity: 0.22 },
    ],
    'fade-top': [
      { offset: '0%', color: '#FF8FAF', opacity: 0.12 },
      { offset: '100%', color: '#CCFAD6', opacity: 0.18 },
    ],
    'fade-bottom': [
      { offset: '0%', color: '#CCFAD6', opacity: 0.2 },
      { offset: '100%', color: '#FF8FAF', opacity: 0.14 },
    ],
  };

  const stops = gradients[variant] || gradients['pink-to-mint'];

  return (
    <div
      className={`relative w-full overflow-hidden pointer-events-none ${className}`}
      style={{ height, lineHeight: 0 }}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        style={{ transform: flip ? 'scaleY(-1)' : 'none' }}
      >
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            {stops.map((s, i) => (
              <stop key={i} offset={s.offset} stopColor={s.color} stopOpacity={s.opacity} />
            ))}
          </linearGradient>
          <linearGradient id={`${id}-back`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FF8FAF" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#CCFAD6" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#FF8FAF" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Background soft wave */}
        <path
          fill={`url(#${id}-back)`}
          d="M0,72 C240,112 480,16 720,44 C960,72 1200,112 1440,60 L1440,120 L0,120 Z"
        />
        {/* Foreground stronger wave */}
        <path
          fill={`url(#${id})`}
          d="M0,88 C220,48 420,112 720,80 C1020,48 1240,112 1440,72 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  );
}
