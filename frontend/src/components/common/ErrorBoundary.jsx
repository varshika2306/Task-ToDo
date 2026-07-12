import { Component } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('TaskFlow crashed:', error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-5)', textAlign: 'center', background: 'var(--color-bg)' }}>
          <span aria-hidden="true" style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--color-error-tint)', color: 'var(--color-error)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
            <FiAlertTriangle size={24} />
          </span>
          <h2 style={{ marginBottom: 'var(--space-2)' }}>Something went wrong</h2>
          <p style={{ maxWidth: 380, marginBottom: 'var(--space-5)' }}>An unexpected error stopped this page from loading. Try heading back to safety.</p>
          <button onClick={this.handleReload} className="btn btn-primary">Back to home</button>
        </div>
      );
    }

    return this.props.children;
  }
}