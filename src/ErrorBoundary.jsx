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
    // TODO - 추후 로직 추가
  }

  render() {
    if (this.state.hasError) {
      // TODO - 알 수 없는 오류 페이지 추가
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
