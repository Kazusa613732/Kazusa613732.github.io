/**
 * Header Component
 * Design: Hacker Zine - fixed top nav with terminal-style logo
 * Features: dark/light toggle, navigation links, mobile menu
 */

import { useTheme } from './ThemeContext';
import { Moon, Sun, Menu, X, Terminal, Shield } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'wouter';

const navLinks = [
  { href: '/home', label: 'Posts' },
  { href: '/tags', label: 'Tags' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        background: isDark
          ? 'rgba(13, 17, 23, 0.92)'
          : 'rgba(248, 250, 252, 0.92)',
        backdropFilter: 'blur(12px)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/home">
            <div className="flex items-center gap-2 group">
              <div
                className="flex items-center justify-center w-7 h-7 rounded-sm"
                style={{ background: 'var(--color-blue)', color: 'var(--background)' }}
              >
                <Terminal size={14} strokeWidth={2.5} />
              </div>
              <span
                className="font-mono font-bold text-base tracking-tight"
                style={{ color: 'var(--foreground)' }}
              >
                Ou
                <span style={{ color: 'var(--color-blue)' }}>su</span>
              </span>
              <span
                className="hidden sm:inline text-xs font-mono ml-1"
                style={{ color: 'var(--muted-foreground)' }}
              >
                ~/Kazusa1612.dev
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <span
                    className="px-3 py-1.5 text-sm font-mono rounded-sm transition-all duration-150"
                    style={{
                      color: isActive ? 'var(--color-blue)' : 'var(--muted-foreground)',
                      background: isActive
                        ? 'color-mix(in oklch, var(--color-blue) 10%, transparent)'
                        : 'transparent',
                      borderBottom: isActive
                        ? '1px solid var(--color-blue)'
                        : '1px solid transparent',
                    }}
                  >
                    {isActive && (
                      <span style={{ color: 'var(--color-green)' }}>$ </span>
                    )}
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            {/* Status indicator */}
            <div className="hidden sm:flex items-center gap-1.5 mr-2">
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: 'var(--color-green)' }}
              />
              <span
                className="text-xs font-mono"
                style={{ color: 'var(--muted-foreground)' }}
              >
                online
              </span>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-8 h-8 rounded-sm transition-all duration-150"
              style={{
                border: '1px solid var(--border)',
                color: 'var(--muted-foreground)',
                background: 'transparent',
              }}
              aria-label="Toggle theme"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-sm transition-all duration-150"
              style={{
                border: '1px solid var(--border)',
                color: 'var(--muted-foreground)',
                background: 'transparent',
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <nav
            className="md:hidden border-t py-2"
            style={{ borderColor: 'var(--border)' }}
          >
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <div
                    className="flex items-center gap-2 px-2 py-2.5 text-sm font-mono"
                    style={{
                      color: isActive ? 'var(--color-blue)' : 'var(--muted-foreground)',
                      background: isActive
                        ? 'color-mix(in oklch, var(--color-blue) 8%, transparent)'
                        : 'transparent',
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span style={{ color: 'var(--color-green)' }}>
                      {isActive ? '▶' : ' '}
                    </span>
                    {link.label}
                  </div>
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
