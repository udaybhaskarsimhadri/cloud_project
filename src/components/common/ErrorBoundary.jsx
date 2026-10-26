import React, { Component } from 'react';
import { AlertOctagon, RotateCcw, Home, Copy, Check } from 'lucide-react';
import { monitoringService } from '../../services/aws/monitoringService';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      copied: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Report to monitoring service (simulates CloudWatch / Sentry)
    monitoringService.recordError(error, {
      componentStack: errorInfo?.componentStack?.slice(0, 500)
    });
  }

  handleCopyTrace = () => {
    const trace = `${this.state.error?.toString()}\n\nComponent Stack:\n${this.state.errorInfo?.componentStack}`;
    navigator.clipboard.writeText(trace);
    this.setState({ copied: true });
    setTimeout(() => this.setState({ copied: false }), 2500);
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const isDev = Boolean(import.meta.env?.DEV);

      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex items-center justify-center p-6">
          <div className="max-w-lg w-full p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto border border-rose-500/20 shadow-md">
              <AlertOctagon className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Something went wrong on the trail
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
                An unexpected condition interrupted your expedition experience. Our telemetry system has logged this incident.
              </p>
            </div>

            {/* Error trace box in Dev mode */}
            {isDev && this.state.error && (
              <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-left font-mono text-[11px] text-rose-600 dark:text-rose-400 overflow-x-auto max-h-36 space-y-1">
                <p className="font-bold">{this.state.error.toString()}</p>
                <button
                  onClick={this.handleCopyTrace}
                  className="mt-2 px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-sans text-[10px] font-bold flex items-center gap-1"
                >
                  {this.state.copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{this.state.copied ? 'Copied' : 'Copy Stack Trace'}</span>
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>

              <a
                href="/"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Return to Base</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
