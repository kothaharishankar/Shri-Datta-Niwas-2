import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Keep the console honest — no silent failures.
    console.error('[Shri Datta Niwas 2] Unhandled UI error', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-start justify-center px-6 py-24">
          <p className="eyebrow text-accent">Something went wrong</p>
          <h1 className="display mt-4 text-4xl text-ink">The page stumbled.</h1>
          <p className="mt-4 text-muted">
            Please reload. If it keeps happening, the lodge can still be reached on Google Maps.
          </p>
          <div className="mt-7 flex gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-on-accent"
            >
              Reload the page
            </button>
            <a
              href="https://maps.app.goo.gl/HHKCbCSwYKPsct2U9"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line-strong px-5 py-3 text-sm text-ink"
            >
              Open Google Maps
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
