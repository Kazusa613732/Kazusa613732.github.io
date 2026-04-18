/**
 * Hero Section Component
 * Design: Hacker Zine - personal profile with social links and marquee
 * Features: name, title, expertise, social connections
 */

import { Github, Twitter, Mail } from 'lucide-react';
import type { ReactNode } from 'react';
import Marquee from './Marquee';

const AVATAR_IMG =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663502338621/R9CiYMd9vUY86Cv4sPQyZp/about-avatar-UGVfY8h7VgkjFg5C3FwCMp.webp';

interface SocialLink {
  icon: ReactNode;
  label: string;
  url: string;
}

interface HeroSectionProps {
  name?: string;
  title?: string;
  expertise?: string[];
  socialLinks?: SocialLink[];
}

export default function HeroSection({
  name = 'Security Researcher',
  title = 'Cybersecurity & Penetration Test',
  expertise = ['web-security', 'PT', 'ctf'],
  socialLinks = [
    { icon: <Github size={16} />, label: 'GitHub', url: 'https://github.com' },
    { icon: <Twitter size={16} />, label: 'Twitter', url: 'https://twitter.com' },
    { icon: <Mail size={16} />, label: 'Email', url: 'mailto:researcher@example.com' },
  ],
}: HeroSectionProps) {
  return (
    <div className="animate-fade-in-up">
      {/* Marquee */}
      <Marquee text=">> hello world >> Web Security >> ctf >> Penetration Test >>" speed={60} />

      {/* Hero Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Avatar */}
          <div className="flex justify-center md:justify-start">
            <div
              className="w-48 h-48 rounded-sm overflow-hidden shadow-lg"
              style={{
                border: '3px solid var(--color-blue)',
                boxShadow: '0 0 30px rgba(88, 166, 255, 0.3)',
              }}
            >
              <img
                src={AVATAR_IMG}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Profile Info */}
          <div className="space-y-6">
            {/* Name */}
            <div>
              <h1
                className="text-4xl md:text-5xl font-mono font-bold mb-2"
                style={{
                  color: 'var(--foreground)',
                  letterSpacing: '-0.02em',
                }}
              >
                {name}
              </h1>
              <p
                className="text-lg font-mono"
                style={{ color: 'var(--color-blue)' }}
              >
                {title}
              </p>
            </div>

            {/* Expertise Tags */}
            <div>
              <p
                className="text-xs font-mono uppercase tracking-widest mb-3"
                style={{ color: 'var(--muted-foreground)' }}
              >
                Expertise
              </p>
              <div className="flex flex-wrap gap-2">
                {expertise.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-sm text-xs font-mono"
                    style={{
                      background: 'color-mix(in oklch, var(--color-blue) 10%, transparent)',
                      color: 'var(--color-blue)',
                      border: '1px solid color-mix(in oklch, var(--color-blue) 30%, transparent)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Bio */}
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--muted-foreground)' }}
            >
              專注於網路安全、滲透測試研究。分享安全知識與技術筆記。
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-sm transition-all"
                  style={{
                    border: '1px solid var(--border)',
                    color: 'var(--muted-foreground)',
                    background: 'var(--card)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-blue)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--color-blue)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--muted-foreground)';
                  }}
                >
                  {link.icon}
                  <span className="text-xs font-mono">{link.label}</span>
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 pt-4">
              <a
                href="/blog"
                className="px-6 py-2.5 rounded-sm text-sm font-mono transition-all"
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
                Read Articles
              </a>
              <a
                href="/about"
                className="px-6 py-2.5 rounded-sm text-sm font-mono transition-all"
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
                About Me
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        className="h-px"
        style={{ background: 'var(--border)' }}
      />
    </div>
  );
}
