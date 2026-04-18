/**
 * Home Page
 * Design: Hacker Zine - two-column layout (articles + sidebar)
 * Features: hero banner, article list with tag filter, sidebar with tag cloud
 */

import TagPill from './TagPill';
import { getAllPosts, getAllTags, formatDate } from './posts';
import { useTheme } from './ThemeContext';
import { Clock, ChevronRight, Hash, BookOpen, Tag, Filter, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Link } from 'wouter';

const HERO_IMG =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663502338621/R9CiYMd9vUY86Cv4sPQyZp/hero-banner-55agCTBNBN8w4upVgqgYbJ.webp';

export default function Home() {
  const { isDark } = useTheme();
  const allPosts = getAllPosts();
  const allTags = getAllTags();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    if (!activeTag) return allPosts;
    return allPosts.filter((p) => p.frontmatter.tags.includes(activeTag));
  }, [allPosts, activeTag]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Hero Banner */}
      <section className="relative overflow-hidden" style={{ height: '280px' }}>
        <img
          src={HERO_IMG}
          alt="CyberBlog Hero"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.55)' }}
        />
        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'linear-gradient(to bottom, rgba(13,17,23,0.3) 0%, rgba(13,17,23,0.85) 100%)'
              : 'linear-gradient(to bottom, rgba(13,17,23,0.4) 0%, rgba(13,17,23,0.75) 100%)',
          }}
        />
        {/* Hero content */}
        <div className="container relative h-full flex flex-col justify-end pb-8">
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs font-mono px-2 py-0.5 rounded-sm"
                style={{
                  background: 'color-mix(in oklch, var(--color-green) 15%, transparent)',
                  color: 'var(--color-green)',
                  border: '1px solid color-mix(in oklch, var(--color-green) 35%, transparent)',
                }}
              >
                [STATUS: ONLINE]
              </span>
              <span
                className="text-xs font-mono"
                style={{ color: 'rgba(201,209,217,0.7)' }}
              >
                {allPosts.length} articles published
              </span>
            </div>
            <h1
              className="text-3xl sm:text-4xl font-mono font-bold mb-1"
              style={{ color: '#f0f6fc', letterSpacing: '-0.02em' }}
            >
              Poi's<span style={{ color: 'var(--color-blue)' }}> blog</span>
            </h1>
            <p
              className="text-sm font-sans max-w-xl"
              style={{ color: 'rgba(201,209,217,0.8)' }}
            >
              Cybersecurity 
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="container py-8">
        <div className="flex gap-8 items-start">
          {/* Article list — 2/3 width */}
          <main className="flex-1 min-w-0">
            {/* Filter bar */}
            <div
              className="flex items-center justify-between mb-5 pb-4 border-b"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="flex items-center gap-2">
                <BookOpen size={14} style={{ color: 'var(--muted-foreground)' }} />
                <span
                  className="text-sm font-mono"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {activeTag ? (
                    <>
                      Filtered:{' '}
                      <span style={{ color: 'var(--color-blue)' }}>#{activeTag}</span>
                      {' '}({filteredPosts.length} posts)
                    </>
                  ) : (
                    `All Posts (${allPosts.length})`
                  )}
                </span>
              </div>
              {activeTag && (
                <button
                  onClick={() => setActiveTag(null)}
                  className="flex items-center gap-1 text-xs font-mono px-2 py-1 rounded-sm transition-all"
                  style={{
                    color: 'var(--color-red)',
                    border: '1px solid color-mix(in oklch, var(--color-red) 35%, transparent)',
                    background: 'color-mix(in oklch, var(--color-red) 8%, transparent)',
                  }}
                >
                  <X size={10} />
                  Clear filter
                </button>
              )}
            </div>

            {/* Posts list */}
            {filteredPosts.length === 0 ? (
              <div
                className="text-center py-16"
                style={{ color: 'var(--muted-foreground)' }}
              >
                <p className="font-mono text-sm">No posts found for tag: #{activeTag}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredPosts.map((post, idx) => (
                  <article
                    key={post.slug}
                    className="article-card stagger-item p-5 rounded-sm"
                    style={{ animationDelay: `${idx * 0.06}s` }}
                  >
                    <Link href={`/posts/${post.slug}`}>
                      <div className="block">
                        {/* Meta row */}
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className="text-xs font-mono"
                            style={{ color: 'var(--muted-foreground)' }}
                          >
                            {formatDate(post.frontmatter.date)}
                          </span>
                          <span
                            style={{
                              width: '1px',
                              height: '12px',
                              background: 'var(--border)',
                            }}
                          />
                          <div className="flex items-center gap-1">
                            <Clock size={10} style={{ color: 'var(--muted-foreground)' }} />
                            <span
                              className="text-xs font-mono"
                              style={{ color: 'var(--muted-foreground)' }}
                            >
                              {post.readingTime} min read
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <h2
                          className="text-base font-mono font-semibold mb-2 leading-snug group-hover:text-blue-400 transition-colors"
                          style={{ color: 'var(--foreground)' }}
                        >
                          {post.frontmatter.title}
                        </h2>

                        {/* Description */}
                        <p
                          className="text-sm mb-3 leading-relaxed line-clamp-2"
                          style={{ color: 'var(--muted-foreground)' }}
                        >
                          {post.frontmatter.description}
                        </p>

                        {/* Tags + Read more */}
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1.5">
                            {post.frontmatter.tags.map((tag) => (
                              <span
                                key={`${post.slug}-${tag}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setActiveTag(activeTag === tag ? null : tag);
                                }}
                              >
                                <TagPill tag={tag} clickable={false} active={activeTag === tag} />
                              </span>
                            ))}
                          </div>
                          <div
                            className="flex items-center gap-1 text-xs font-mono"
                            style={{ color: 'var(--color-blue)' }}
                          >
                            Read
                            <ChevronRight size={12} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </main>

          {/* Sidebar — 1/3 width, hidden on mobile */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            {/* Tag Cloud */}
            <div
              className="border rounded-sm p-4 mb-4"
              style={{
                borderColor: 'var(--border)',
                background: 'var(--card)',
              }}
            >
              <div
                className="flex items-center gap-2 mb-3 pb-2 border-b"
                style={{ borderColor: 'var(--border)' }}
              >
                <Tag size={12} style={{ color: 'var(--color-blue)' }} />
                <span
                  className="text-xs font-mono font-semibold uppercase tracking-widest"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Tags
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {allTags.map(({ tag, count }) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                    className="flex items-center gap-1"
                  >
                    <TagPill tag={tag} clickable={false} active={activeTag === tag} />
                    <span
                      className="text-xs font-mono"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent posts */}
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
                  Recent
                </span>
              </div>
              <div className="space-y-3">
                {allPosts.slice(0, 5).map((post) => (
                  <Link key={post.slug} href={`/posts/${post.slug}`}>
                    <div className="group">
                      <p
                        className="text-xs font-mono leading-snug mb-0.5 group-hover:text-blue-400 transition-colors line-clamp-2"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {post.frontmatter.title}
                      </p>
                      <p
                        className="text-xs font-mono"
                        style={{ color: 'var(--muted-foreground)' }}
                      >
                        {formatDate(post.frontmatter.date)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* GitHub Pages note */}
            <div
              className="mt-4 p-3 rounded-sm border"
              style={{
                borderColor: 'color-mix(in oklch, var(--color-yellow) 30%, transparent)',
                background: 'color-mix(in oklch, var(--color-yellow) 5%, transparent)',
              }}
            >
              <p
                className="text-xs font-mono leading-relaxed"
                style={{ color: 'var(--muted-foreground)' }}
              >
                <span style={{ color: 'var(--color-yellow)' }}>Hello World!!!</span>
                {' '} <br /> 水池裡面大鯊魚 🦈
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
