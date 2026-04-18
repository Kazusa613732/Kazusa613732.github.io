import type { CSSProperties } from 'react';

/**
 * TagPill Component
 * Design: Hacker Zine - color-coded tags with monospace font
 */

// Color mapping for known tags
const tagColorMap: Record<string, string> = {
  'PT': 'red',
  'ctf': 'blue',
  'web-security': 'purple',
};

function getTagColor(tag: string): string {
  return tagColorMap[tag] ?? 'blue';
}

interface TagPillProps {
  tag: string;
  clickable?: boolean;
  active?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md';
}

export default function TagPill({
  tag,
  clickable = true,
  active = false,
  onClick,
  size = 'sm',
}: TagPillProps) {
  const color = getTagColor(tag);

  const colorStyles: Record<string, CSSProperties> = {
    blue: {
      color: active ? 'var(--background)' : 'var(--color-blue)',
      borderColor: active
        ? 'var(--color-blue)'
        : 'color-mix(in oklch, var(--color-blue) 40%, transparent)',
      background: active
        ? 'var(--color-blue)'
        : 'color-mix(in oklch, var(--color-blue) 8%, transparent)',
    },
    red: {
      color: active ? 'var(--background)' : 'var(--color-red)',
      borderColor: active
        ? 'var(--color-red)'
        : 'color-mix(in oklch, var(--color-red) 40%, transparent)',
      background: active
        ? 'var(--color-red)'
        : 'color-mix(in oklch, var(--color-red) 8%, transparent)',
    },
    green: {
      color: active ? 'var(--background)' : 'var(--color-green)',
      borderColor: active
        ? 'var(--color-green)'
        : 'color-mix(in oklch, var(--color-green) 40%, transparent)',
      background: active
        ? 'var(--color-green)'
        : 'color-mix(in oklch, var(--color-green) 8%, transparent)',
    },
    purple: {
      color: active ? 'var(--background)' : 'var(--color-purple)',
      borderColor: active
        ? 'var(--color-purple)'
        : 'color-mix(in oklch, var(--color-purple) 40%, transparent)',
      background: active
        ? 'var(--color-purple)'
        : 'color-mix(in oklch, var(--color-purple) 8%, transparent)',
    },
    yellow: {
      color: active ? 'var(--background)' : 'var(--color-yellow)',
      borderColor: active
        ? 'var(--color-yellow)'
        : 'color-mix(in oklch, var(--color-yellow) 40%, transparent)',
      background: active
        ? 'var(--color-yellow)'
        : 'color-mix(in oklch, var(--color-yellow) 8%, transparent)',
    },
    orange: {
      color: active ? 'var(--background)' : 'var(--color-orange, var(--color-yellow))',
      borderColor: active
        ? 'var(--color-orange, var(--color-yellow))'
        : 'color-mix(in oklch, var(--color-yellow) 40%, transparent)',
      background: active
        ? 'var(--color-orange, var(--color-yellow))'
        : 'color-mix(in oklch, var(--color-yellow) 8%, transparent)',
    },
  };

  const style = colorStyles[color] ?? colorStyles.blue;

  const pillStyle: CSSProperties = {
    ...style,
    display: 'inline-flex',
    alignItems: 'center',
    padding: size === 'md' ? '0.2rem 0.6rem' : '0.1rem 0.45rem',
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: size === 'md' ? '0.75rem' : '0.68rem',
    fontWeight: 500,
    borderRadius: '2px',
    border: '1px solid',
    transition: 'all 0.15s ease',
    cursor: clickable ? 'pointer' : 'default',
    textDecoration: 'none',
    letterSpacing: '0.02em',
    whiteSpace: 'nowrap',
  };

  return (
    <span style={pillStyle} onClick={onClick}>
      {tag}
    </span>
  );
}
