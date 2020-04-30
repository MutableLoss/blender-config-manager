import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
  static getDerivedStateFromError() {
    return { hasError: true }
  }

  constructor(props) {
    super(props)

    this.state = {
      error: '',
      errorInfo: '',
      hasError: false
    }
  }

  shouldComponentUpdate() {
    return true
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo })
  }

  render() {
    const { error, errorInfo, hasError } = this.state
    const { children } = this.props

    if (hasError) {
      return (
        <>
          <h1>Something went wrong.</h1>
          <div>{error}</div>
          <div>{errorInfo}</div>
        </>
      )
    }

    return children
  }
}
