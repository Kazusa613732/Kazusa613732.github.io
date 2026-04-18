import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex items-center justify-center px-4"
          style={{ background: 'var(--background)', color: 'var(--foreground)' }}
        >
          <div
            className="max-w-lg w-full p-6 rounded-sm"
            style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
          >
            <p className="font-mono text-sm mb-2" style={{ color: 'var(--color-red)' }}>
              [RUNTIME ERROR]
            </p>
            <h1 className="font-mono text-xl mb-3">The page crashed while rendering.</h1>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Refresh the page and check the browser console for more details.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
