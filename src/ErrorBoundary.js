import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import './ErrorBoundary.css' // Import the custom CSS file

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showErrorDetails: false, // New state to handle error details visibility
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({ error, errorInfo })
    // Log the error to the console
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
  }

  handleReload = () => {
    // Reset the error state
    this.setState({ hasError: false, error: null, errorInfo: null, showErrorDetails: false })
  }

  toggleErrorDetails = () => {
    // Toggle the visibility of the error details
    this.setState((prevState) => ({ showErrorDetails: !prevState.showErrorDetails }))
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container d-flex flex-column align-items-center justify-content-center">
          <h1 className="error-boundary-oops">Oops!</h1>
          <h2 className="error-boundary-heading">Something went wrong.</h2>
          <p className="error-boundary-message">
            We apologize for the inconvenience. We are currently working on a fix for this issue.
            <br />
            If the problem persists, please contact our support team.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <span
              onClick={this.toggleErrorDetails}
              className="error-boundary-button mb-3 text-secondary"
            >
              {this.state.showErrorDetails ? 'Hide Error Details' : 'Show Error Details'}
            </span>
          )}
          {this.state.showErrorDetails && (
            <div className="error-boundary-code">
              <h5>Error Code:</h5>
              <pre className="error-boundary-error">
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </div>
          )}
          <p className="error-boundary-contact">
            Contact Support: <a href="mailto:support@PuruliaRoutes.com">support@PuruliaRoutes.com</a>
          </p>
          {/* <Button variant="primary" onClick={this.handleReload} className="error-boundary-button">
            Go to Homepage
          </Button> */}
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
