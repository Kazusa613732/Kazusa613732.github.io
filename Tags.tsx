/**
 * Tags Page
 * Design: Hacker Zine - tag cloud with post counts
 * Features: all tags listed with count, click to filter
 */

import TagPill from './TagPill';
import { getAllTags, getPostsByTag, formatDate } from './posts';
import { Tag, Hash, ChevronRight } from 'lucide-react';
import { Link, useParams } from 'wouter';

export default function Tags() {
  const params = useParams<{ tag?: string }>();
  const selectedTag = params.tag;
  const allTags = getAllTags();

  const taggedPosts = selectedTag ? getPostsByTag(selectedTag) : [];

  if (selectedTag) {
    // Show posts for a specific tag
    return (
      <div className="min-h-screen animate-fade-in-up">
        <div className="container py-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/tags">
              <span
                className="text-sm font-mono mb-4 block transition-colors"
                style={{ color: 'var(--muted-foreground)' }}
              >
                ← All Tags
              </span>
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <Hash size={20} style={{ color: 'var(--color-blue)' }} />
              <h1
                className="text-2xl font-mono font-bold"
                style={{ color: 'var(--foreground)' }}
              >
                {selectedTag}
              </h1>
            </div>
            <p
              className="text-sm font-mono"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {taggedPosts.length} post{taggedPosts.length !== 1 ? 's' : ''} tagged with{' '}
              <span style={{ color: 'var(--color-blue)' }}>#{selectedTag}</span>
            </p>
          </div>

          {/* Posts list */}
          {taggedPosts.length === 0 ? (
            <div
              className="text-center py-16 border rounded-sm"
              style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
            >
              <p className="font-mono text-sm">No posts found for this tag.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {taggedPosts.map((post, idx) => (
                <article
                  key={post.slug}
                  className="article-card stagger-item p-5 rounded-sm"
                  style={{ animationDelay: `${idx * 0.06}s` }}
                >
                  <Link href={`/posts/${post.slug}`}>
                    <div className="block">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="text-xs font-mono"
                          style={{ color: 'var(--muted-foreground)' }}
                        >
                          {formatDate(post.frontmatter.date)}
                        </span>
                      </div>
                      <h2
                        className="text-base font-mono font-semibold mb-2"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {post.frontmatter.title}
                      </h2>
                      <p
                        className="text-sm mb-3 line-clamp-2"
                        style={{ color: 'var(--muted-foreground)' }}
                      >
                        {post.frontmatter.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {post.frontmatter.tags.map((tag) => (
                            <TagPill key={tag} tag={tag} active={tag === selectedTag} />
                          ))}
                        </div>
                        <div
                          className="flex items-center gap-1 text-xs font-mono"
                          style={{ color: 'var(--color-blue)' }}
                        >
                          Read <ChevronRight size={12} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show all tags
  return (
    <div className="min-h-screen animate-fade-in-up">
      <div className="container py-8">
        {/* Header */}
        <div
          className="mb-8 pb-6 border-b"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Tag size={20} style={{ color: 'var(--color-blue)' }} />
            <h1
              className="text-2xl font-mono font-bold"
              style={{ color: 'var(--foreground)' }}
            >
              Tags
            </h1>
          </div>
          <p
            className="text-sm font-mono"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Browse posts by topic. {allTags.length} tags across all articles.
          </p>
        </div>

        {/* Tag grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {allTags.map(({ tag, count }, idx) => (
            <Link key={tag} href={`/tags/${tag}`}>
              <div
                className="stagger-item article-card p-4 rounded-sm cursor-pointer"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <TagPill tag={tag} clickable={false} size="md" />
                  <span
                    className="text-xs font-mono"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {count} post{count !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div
                    className="flex-1 h-1 rounded-full overflow-hidden"
                    style={{ background: 'var(--border)' }}
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(count / Math.max(...allTags.map((t) => t.count))) * 100}%`,
                        background: 'var(--color-blue)',
                        opacity: 0.6,
                      }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* All tags as pills */}
        <div
          className="mt-10 pt-8 border-t"
          style={{ borderColor: 'var(--border)' }}
        >
          <h2
            className="text-sm font-mono font-semibold mb-4 uppercase tracking-widest"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Quick Browse
          </h2>
          <div className="flex flex-wrap gap-2">
            {allTags.map(({ tag, count }) => (
              <Link key={tag} href={`/tags/${tag}`}>
                <div className="flex items-center gap-1.5">
                  <TagPill tag={tag} size="md" clickable={false} />
                  <span
                    className="text-xs font-mono"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    ×{count}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
