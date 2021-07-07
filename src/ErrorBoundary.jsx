/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

import useNotFound from './hooks/useNotFound';

import NotFoundPage from './pages/NotFoundPage';

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
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>앗! 알 수 없는 오류가 발생했어요!</h1>;
    }

    return (
      <ErrorBoundaryWrapper>
        {this.props.children}
      </ErrorBoundaryWrapper>
    );
  }
}

export default ErrorBoundary;
