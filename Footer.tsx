/**
 * Footer Component
 * Design: Hacker Zine - minimal footer with terminal-style info
 */

import { Github, Rss } from 'lucide-react';
import { Link } from 'wouter';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t mt-16"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="container py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left: branding */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="font-mono text-sm font-semibold"
                style={{ color: 'var(--foreground)' }}
              >
                Poi<span style={{ color: 'var(--color-blue)' }}></span>
              </span>
              <span
                className="text-xs font-mono px-1.5 py-0.5 rounded-sm"
                style={{
                  background: 'color-mix(in oklch, var(--color-green) 10%, transparent)',
                  color: 'var(--color-green)',
                  border: '1px solid color-mix(in oklch, var(--color-green) 30%, transparent)',
                }}
              >
                v1.0.0
              </span>
            </div>
            <p
              className="text-xs font-mono"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Copyright © {year} 2026 Kazusa1612. All Rights Reserved.
            </p>
          </div>

          {/* Right: links */}
          <div className="flex items-center gap-4">
            <Link href="/tags">
              <span
                className="text-xs font-mono transition-colors duration-150"
                style={{ color: 'var(--muted-foreground)' }}
              >
                Tags
              </span>
            </Link>
            <Link href="/about">
              <span
                className="text-xs font-mono transition-colors duration-150"
                style={{ color: 'var(--muted-foreground)' }}
              >
                About
              </span>
            </Link>
            <a
              href="https://github.com/Kazusa613732"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition-colors duration-150"
              style={{ color: 'var(--muted-foreground)' }}
              title="GitHub"
            >
              <Github size={14} />
            </a>
          </div>
        </div>

        {/* Bottom: terminal-style info */}
        <div
          className="mt-6 pt-4 border-t"
          style={{ borderColor: 'var(--border)' }}
        >
          <p
            className="text-xs font-mono"
            style={{ color: 'var(--muted-foreground)' }}
          >
            <span style={{ color: 'var(--color-green)' }}>$</span>{' '}
            echo "Hello World !!!"
          </p>
        </div>
      </div>
    </footer>
  );
}
