import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button } from './Button'


describe('Button', () => {
  it('Should Button render correctly', () => {
    const testChildren = 'test children'
    const testType = 'submit'
    const testDisabled = true

    const { container } = render(
      <Button type={testType} disabled={testDisabled}>
        {testChildren}
      </Button>
    )

    const button = screen.getByTestId('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('primary')
    expect(button).toBeDisabled()
    expect(screen.getByText(testChildren)).toBeInTheDocument()
    expect(container.querySelector(`button[type="${testType}"]`)).toBeInTheDocument()
  })

  it('Should Button has secondary view', () => {
    render(
      <Button isPrimary={false} />
    )

    const button = screen.getByTestId('button')
    expect(button).toHaveClass('secondary')
  })

  it('Should onClick handler called after click', () => {
    const onClickHandler = jest.fn()

    render(
      <Button onClick={onClickHandler} />
    )

    const button = screen.getByTestId('button')
    fireEvent.click(button)
    
    expect(onClickHandler).toHaveBeenCalled()
  })
})
