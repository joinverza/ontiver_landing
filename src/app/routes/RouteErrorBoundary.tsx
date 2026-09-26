import { Component, type ReactNode } from "react";

type Props = { children: ReactNode; resetKey: string };
type State = { failed: boolean };

// React error boundaries require a class; ordinary UI components use named arrows.
class RouteErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidUpdate(previous: Props) {
    if (previous.resetKey !== this.props.resetKey && this.state.failed) {
      this.setState({ failed: false });
    }
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main id="main-content" tabIndex={-1} className="page-intro min-h-svh">
        <div className="site-container" role="alert">
          <p className="eyebrow">Ontiver</p>
          <h1 className="section-heading mt-4">This page could not load.</h1>
          <p className="mt-5 text-body">Please try loading it again.</p>
          <button
            type="button"
            className="button-primary mt-7"
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </div>
      </main>
    );
  }
}

export default RouteErrorBoundary;
