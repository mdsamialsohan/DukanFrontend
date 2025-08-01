"use client";
import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can log the error to an error reporting service
        console.error('Error caught by error boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <p>Something went wrong. Please try again later.</p>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
