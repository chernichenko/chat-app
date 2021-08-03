import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Toast } from './Toast'

describe('Toast', () => {
  it('Should Toast render', () => {
    const { container } = render(<Toast />)

    expect(container.querySelector('.Toastify')).toBeInTheDocument()
  })
})
