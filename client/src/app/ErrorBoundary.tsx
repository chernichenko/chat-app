import React from 'react'

type Props = {
  children: React.ReactNode
}

type ErrorHandlingComponent<Props> = (
  props: Props,
  error?: Error,
  errorInfo?: React.ErrorInfo,
) => React.ReactNode

type ErrorState = {
  error?: Error
  errorInfo?: React.ErrorInfo
}

function Catch<Props extends {}>(
  component: ErrorHandlingComponent<Props>,
): React.ComponentType<Props> {
  return class extends React.Component<Props, ErrorState> {
    state: ErrorState = {
      error: undefined,
      errorInfo: undefined,
    }

    static getDerivedStateFromError(error: Error) {
      return { error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      this.setState({ errorInfo })
    }

    render() {
      return component(this.props, this.state.error, this.state.errorInfo)
    }
  }
}

const ErrorBoundary = Catch((props: Props, error?: Error, errorInfo?: React.ErrorInfo) => {
  if (!error) {
    return props.children
  }
  if (!errorInfo) {
    return <span>We've got an error... wait for a component stack</span>
  }
  
  return <h1>Report feedback</h1>
})

export default ErrorBoundary
