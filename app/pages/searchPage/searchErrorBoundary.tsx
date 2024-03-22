"use client"

import React, { ErrorInfo } from "react";

export interface SearchErrorBoundaryProps {
  onError: () => void;
  children?: React.ReactNode;
}

interface SearchErrorBoundaryState {
  hasError: boolean;
}

export class SearchErrorBoundary extends React.Component<
  SearchErrorBoundaryProps,


  SearchErrorBoundaryState
> {
  constructor(props: SearchErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}
