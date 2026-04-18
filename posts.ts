/**
 * Blog Post Loader
 * Design: Hacker Zine - IBM Plex font family, GitHub dark color scheme
 * Loads markdown files from the posts directory using Vite's import.meta.glob
 */

export interface PostFrontmatter {
  title: string;
  date: string;
  tags: string[];
  description: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: number;
}

const modules = import.meta.glob('./posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): { frontmatter: PostFrontmatter; content: string } {
  const fmRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = raw.match(fmRegex);

  if (!match) {
    return {
      frontmatter: {
        title: 'Untitled',
        date: new Date().toISOString().split('T')[0],
        tags: [],
        description: '',
      },
      content: raw,
    };
  }

  const yamlStr = match[1];
  const content = match[2];

  // Simple YAML parser for our frontmatter format
  const frontmatter: Partial<PostFrontmatter> = {};
  const lines = yamlStr.split('\n');

  for (const line of lines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim();

    if (key === 'title') {
      frontmatter.title = value.replace(/^["']|["']$/g, '');
    } else if (key === 'date') {
      frontmatter.date = value.replace(/^["']|["']$/g, '');
    } else if (key === 'description') {
      frontmatter.description = value.replace(/^["']|["']$/g, '');
    } else if (key === 'tags') {
      // Handle inline array: ["pwn", "ctf"] or [pwn, ctf]
      const arrMatch = value.match(/\[([^\]]*)\]/);
      if (arrMatch) {
        frontmatter.tags = arrMatch[1]
          .split(',')
          .map((t) => t.trim().replace(/^["']|["']$/g, ''))
          .filter(Boolean);
      }
    }
  }

  return {
    frontmatter: {
      title: frontmatter.title ?? 'Untitled',
      date: frontmatter.date ?? new Date().toISOString().split('T')[0],
      tags: frontmatter.tags ?? [],
      description: frontmatter.description ?? '',
    },
    content,
  };
}

function stripFirstH1(content: string): string {
  // Remove the first H1 heading to avoid duplication with the article header
  return content.replace(/^#\s+.+\n?/m, '').trimStart();
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function slugFromPath(path: string): string {
  return path.replace(/^.*\/([^/]+)\.md$/, '$1');
}

let _posts: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (_posts) return _posts;

  const posts: Post[] = Object.entries(modules).map(([path, raw]) => {
    const slug = slugFromPath(path);
    const { frontmatter, content: rawContent } = parseFrontmatter(raw);
    const content = stripFirstH1(rawContent);
    const readingTime = calculateReadingTime(rawContent);

    return { slug, frontmatter, content, readingTime };
  });

  // Sort by date descending
  posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );

  _posts = posts;
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getAllTags(): { tag: string; count: number }[] {
  const tagMap = new Map<string, number>();

  for (const post of getAllPosts()) {
    for (const tag of post.frontmatter.tags) {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.frontmatter.tags.includes(tag));
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}
