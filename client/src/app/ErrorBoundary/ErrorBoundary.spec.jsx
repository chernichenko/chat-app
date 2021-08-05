import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ErrorBoundary } from './ErrorBoundary'

describe('ErrorBoundary', () => {
  it('Should render children', () => {
    const testChildren = 'test children'

    render(
      <ErrorBoundary>
        {testChildren}
      </ErrorBoundary>
    )

    expect(screen.getByText(testChildren)).toBeInTheDocument()
  })
})
