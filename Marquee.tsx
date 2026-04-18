/**
 * Marquee Component
 * Design: Hacker Zine - horizontal scrolling text with terminal aesthetic
 * Features: infinite loop, adjustable speed, monospace font
 */

import React from 'react';

interface MarqueeProps {
  text: string;
  speed?: number; // pixels per second
  className?: string;
}

export default function Marquee({ text, speed = 50, className = '' }: MarqueeProps) {
  const duration = `${(text.length * 15) / speed}s`;

  return (
    <div
      className={`overflow-hidden py-4 ${className}`}
      style={{
        background: 'var(--card)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
      }}
    >
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .marquee-content {
          display: inline-block;
          white-space: nowrap;
          animation: marquee ${duration} linear infinite;
          padding-right: 100%;
        }
        
        .marquee-content:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div
        className="marquee-content font-mono text-sm"
        style={{
          color: 'var(--color-blue)',
          letterSpacing: '0.05em',
        }}
      >
        <span style={{ marginRight: '2rem' }}>
          {text}
        </span>
        {/* Duplicate for seamless loop */}
        <span style={{ marginRight: '2rem' }}>
          {text}
        </span>
      </div>
    </div>
  );
}
