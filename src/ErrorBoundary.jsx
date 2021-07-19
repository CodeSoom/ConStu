/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

import * as Sentry from '@sentry/react';

import useNotFound from './hooks/useNotFound';

import NotFoundPage from './pages/NotFoundPage';
import CrashErrorPage from './pages/CrashErrorPage';

function ErrorBoundaryWrapper({ children }) {
  const { isNotFound } = useNotFound();

  if (isNotFound) {
    return <NotFoundPage />;
  }

  return <>{children}</>;
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
    this.handleResolveError = this.handleResolveError.bind(this);
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.captureException(error);
  }

  handleResolveError() {
    this.setState({
      hasError: false,
    });
  }

  render() {
    if (this.state.hasError) {
      return <CrashErrorPage onResolve={this.handleResolveError} />;
    }

    return (
      <ErrorBoundaryWrapper>
        {this.props.children}
      </ErrorBoundaryWrapper>
    );
  }
}

export default ErrorBoundary;
