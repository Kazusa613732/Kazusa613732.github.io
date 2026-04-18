/**
 * Typing Page
 * Design: Hacker Zine - full-screen typing effect with terminal aesthetic
 * Features: large typing animation, navigation back to home
 */

import TypingEffect from './TypingEffect';
import { Link } from 'wouter';
import { ChevronLeft } from 'lucide-react';

export default function Typing() {
  const phrases = [
    'Hello World !!!',
    'I am Poi/Kazusa',
    'Security Research',
    'Web Security',
    'Penetration Test',
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: 'var(--background)',
      }}
    >
      {/* Background Grid Effect */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(88, 166, 255, 0.05) 25%, rgba(88, 166, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(88, 166, 255, 0.05) 75%, rgba(88, 166, 255, 0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(88, 166, 255, 0.05) 25%, rgba(88, 166, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(88, 166, 255, 0.05) 75%, rgba(88, 166, 255, 0.05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        {/* Status Indicator */}
        <div
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-sm"
          style={{
            background: 'color-mix(in oklch, var(--color-green) 10%, transparent)',
            border: '1px solid color-mix(in oklch, var(--color-green) 30%, transparent)',
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: 'var(--color-green)' }}
          />
          <span
            className="text-xs font-mono uppercase tracking-widest"
            style={{ color: 'var(--color-green)' }}
          >
            [STATUS: ONLINE]
          </span>
        </div>

        {/* Typing Effect */}
        <div className="mb-12">
          <TypingEffect
            phrases={phrases}
            typingSpeed={100}
            deletingSpeed={40}
            pauseDuration={2000}
            cursorBlink={true}
          />
        </div>

        {/* Subtitle */}
        <p
          className="text-sm font-mono mb-12"
          style={{ color: 'var(--muted-foreground)' }}
        >
          Welcome to Poi's Blog — Security Research & Penetration Test
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/home">
            <button
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-sm text-sm font-mono transition-all"
              style={{
                background: 'var(--color-blue)',
                color: 'var(--background)',
                border: '1px solid var(--color-blue)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = '1';
              }}
            >
              <ChevronLeft size={16} />
              Back to Home
            </button>
          </Link>

          <Link href="/tags">
            <button
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-sm text-sm font-mono transition-all"
              style={{
                background: 'transparent',
                color: 'var(--color-blue)',
                border: '1px solid var(--color-blue)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'color-mix(in oklch, var(--color-blue) 10%, transparent)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              Read Articles
            </button>
          </Link>
        </div>
      </div>

      {/* Footer Info */}
      <div
        className="absolute bottom-4 left-4 text-xs font-mono"
        style={{ color: 'var(--muted-foreground)' }}
      >
        <p>ousu</p>
        <p>Copyright © {new Date().getFullYear()} 2026 Kazusa1612. All Rights Reserved.</p>
      </div>

      {/* Decorative Elements */}
      <div
        className="absolute top-10 right-10 w-32 h-32 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, var(--color-blue) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute bottom-20 left-10 w-40 h-40 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, var(--color-blue) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
    </div>
  );
}
