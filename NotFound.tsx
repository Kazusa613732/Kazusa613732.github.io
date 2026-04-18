import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="container py-20">
      <div
        className="max-w-xl mx-auto p-6 rounded-sm"
        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
      >
        <p className="font-mono text-sm mb-2" style={{ color: 'var(--color-red)' }}>
          [ERROR 404]
        </p>
        <h1 className="font-mono text-2xl mb-3" style={{ color: 'var(--foreground)' }}>
          Page not found
        </h1>
        <p className="text-sm mb-5" style={{ color: 'var(--muted-foreground)' }}>
          The page you requested does not exist in this build.
        </p>
        <Link href="/">
          <span
            className="inline-flex px-4 py-2 rounded-sm text-sm font-mono"
            style={{
              color: 'var(--background)',
              background: 'var(--color-blue)',
              border: '1px solid var(--color-blue)',
            }}
          >
            Back to home
          </span>
        </Link>
      </div>
    </div>
  );
}
