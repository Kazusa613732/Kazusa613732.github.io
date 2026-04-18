/**
 * PostDetail Page
 * Design: Hacker Zine - article reading view with TOC sidebar
 * Features: Markdown rendering, syntax highlighting, reading time, tags
 */

import TagPill from './TagPill';
import { getPostBySlug, formatDate } from './posts';
import { useTheme } from './ThemeContext';
import { ArrowLeft, Clock, Calendar, Hash, Copy, Check } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';
import type { HTMLAttributes } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import { Link, useParams } from 'wouter';

// Copy button for code blocks
function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-sm text-xs font-mono transition-all"
      style={{
        background: copied
          ? 'color-mix(in oklch, var(--color-green) 15%, transparent)'
          : 'color-mix(in oklch, var(--foreground) 8%, transparent)',
        color: copied ? 'var(--color-green)' : 'var(--muted-foreground)',
        border: '1px solid var(--border)',
        opacity: 0.8,
      }}
      title="Copy code"
    >
      {copied ? <Check size={10} /> : <Copy size={10} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

// Custom pre/code renderer with copy button
function CodeBlock({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  const [code, setCode] = useState('');
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (ref.current) {
      setCode(ref.current.textContent ?? '');
    }
  }, [children]);

  return (
    <div className="relative group">
      <pre
        ref={ref}
        className={className}
        style={{
          background: 'oklch(0.14 0.008 264)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          padding: '1rem 1.25rem',
          overflowX: 'auto',
          fontSize: '0.85rem',
          lineHeight: '1.6',
          margin: '1.25em 0',
        }}
        {...props}
      >
        {children}
      </pre>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton code={code} />
      </div>
    </div>
  );
}

// Extract headings for TOC
interface Heading {
  id: string;
  text: string;
  level: number;
}

function extractHeadings(markdown: string): Heading[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings: Heading[] = [];
  const idCounts: Record<string, number> = {};
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    let id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    
    // Handle duplicate IDs by appending a counter
    if (idCounts[id]) {
      idCounts[id]++;
      id = `${id}-${idCounts[id]}`;
    } else {
      idCounts[id] = 0;
    }
    
    headings.push({ id, text, level });
  }

  return headings;
}

export default function PostDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const { isDark } = useTheme();
  const post = getPostBySlug(slug);
  const [activeHeading, setActiveHeading] = useState<string>('');

  const headings = post ? extractHeadings(post.content) : [];

  // Track active heading on scroll
  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px' }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveHeading(id);
  };

  if (!post) {
    return (
      <div className="container py-16 text-center">
        <p
          className="font-mono text-lg mb-4"
          style={{ color: 'var(--color-red)' }}
        >
          [ERROR 404] Post not found
        </p>
        <Link href="/home">
          <span
            className="text-sm font-mono"
            style={{ color: 'var(--color-blue)' }}
          >
            ← Return to home
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen animate-fade-in-up">
      <div className="container py-8">
        {/* Back navigation */}
        <Link href="/home">
          <div
            className="inline-flex items-center gap-1.5 text-sm font-mono mb-8 transition-colors"
            style={{ color: 'var(--muted-foreground)' }}
          >
            <ArrowLeft size={14} />
            <span>Back to posts</span>
          </div>
        </Link>

        <div className="flex gap-10 items-start">
          {/* Article content */}
          <article className="flex-1 min-w-0">
            {/* Article header */}
            <header className="mb-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.frontmatter.tags.map((tag, idx) => (
                  <TagPill key={`header-${idx}`} tag={tag} size="md" />
                ))}
              </div>

              {/* Title */}
              <h1
                className="text-2xl sm:text-3xl font-mono font-bold mb-4 leading-tight"
                style={{ color: 'var(--foreground)', letterSpacing: '-0.02em' }}
              >
                {post.frontmatter.title}
              </h1>

              {/* Meta */}
              <div
                className="flex flex-wrap items-center gap-4 pb-6 border-b"
                style={{ borderColor: 'var(--border)' }}
              >
                <div className="flex items-center gap-1.5">
                  <Calendar size={12} style={{ color: 'var(--muted-foreground)' }} />
                  <span
                    className="text-sm font-mono"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {formatDate(post.frontmatter.date)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={12} style={{ color: 'var(--muted-foreground)' }} />
                  <span
                    className="text-sm font-mono"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {post.readingTime} min read
                  </span>
                </div>
                <div
                  className="text-xs font-mono px-2 py-0.5 rounded-sm"
                  style={{
                    background: 'color-mix(in oklch, var(--color-green) 10%, transparent)',
                    color: 'var(--color-green)',
                    border: '1px solid color-mix(in oklch, var(--color-green) 30%, transparent)',
                  }}
                >
                  [PUBLISHED]
                </div>
              </div>

              {/* Description */}
              {post.frontmatter.description && (
                <p
                  className="mt-4 text-base leading-relaxed"
                  style={{
                    color: 'var(--muted-foreground)',
                    borderLeft: '3px solid var(--color-blue)',
                    paddingLeft: '1rem',
                  }}
                >
                  {post.frontmatter.description}
                </p>
              )}
            </header>

            {/* Markdown content */}
            <div className="prose">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeSlug]}
                components={{
                  pre: ({ children, ...props }) => (
                    <CodeBlock {...props}>{children}</CodeBlock>
                  ),
                  // Override default code to not double-wrap
                  code: ({ node, className, children, ...props }) => {
                    const isInline = !className;
                    if (isInline) {
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  // Style tables
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-6">
                      <table>{children}</table>
                    </div>
                  ),
                  // Style links
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target={href?.startsWith('http') ? '_blank' : undefined}
                      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Article footer */}
            <footer
              className="mt-12 pt-6 border-t"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="flex flex-wrap gap-2 mb-6">
                <span
                  className="text-sm font-mono"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Tags:
                </span>
                {post.frontmatter.tags.map((tag, idx) => (
                  <TagPill key={`footer-${idx}`} tag={tag} size="md" />
                ))}
              </div>

              <Link href="/tags">
                <div
                  className="inline-flex items-center gap-2 text-sm font-mono px-4 py-2 rounded-sm transition-all"
                  style={{
                    border: '1px solid var(--border)',
                    color: 'var(--foreground)',
                    background: 'var(--card)',
                  }}
                >
                  <ArrowLeft size={14} />
                  Back to all posts
                </div>
              </Link>
            </footer>
          </article>

          {/* TOC Sidebar */}
          {headings.length > 0 && (
            <aside className="hidden xl:block w-56 flex-shrink-0 sticky top-20">
              <div
                className="border rounded-sm p-4"
                style={{
                  borderColor: 'var(--border)',
                  background: 'var(--card)',
                }}
              >
                <div
                  className="flex items-center gap-2 mb-3 pb-2 border-b"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <Hash size={12} style={{ color: 'var(--color-blue)' }} />
                  <span
                    className="text-xs font-mono font-semibold uppercase tracking-widest"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    Contents
                  </span>
                </div>
                <nav className="space-y-1">
                  {headings.map((heading) => (
                    <button
                      key={heading.id}
                      type="button"
                      onClick={() => scrollToHeading(heading.id)}
                      className="block w-full text-left text-xs font-mono py-0.5 transition-colors leading-snug"
                      style={{
                        paddingLeft: `calc(${(heading.level - 1) * 0.75}rem + 0.5rem)`,
                        color:
                          activeHeading === heading.id
                            ? 'var(--color-blue)'
                            : 'var(--muted-foreground)',
                        borderLeft:
                          activeHeading === heading.id
                            ? '2px solid var(--color-blue)'
                            : '2px solid transparent',
                      }}
                    >
                      {heading.text}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
