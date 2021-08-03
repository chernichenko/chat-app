import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Router, BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { ChangePassword } from './ChangePassword'
import axios from 'axios'

jest.mock('axios')

describe('ChangePassword', () => {
  it('Should ChangePassword render', () => {
    render(
      <BrowserRouter>
        <ChangePassword />
      </BrowserRouter>
    )

    expect(screen.getByTestId('change-password')).toBeInTheDocument()
  })

  it('Should ChangePassword form work correctly', async () => {
    const testEmail = 'testemail@gmail.com'

    render(
      <BrowserRouter>
        <ChangePassword />
      </BrowserRouter>
    )

    const inputEmail = screen.getByPlaceholderText('Enter your email')

    await waitFor(async () => {
      await fireEvent.change(inputEmail, {
        target: { value: testEmail },
      })

      expect(inputEmail.value).toMatch(testEmail)
    })
  })
  
  it('Should has validation error', async () => {
    const testEmail = 'incorrectemail'

    render(
      <BrowserRouter>
        <ChangePassword />
      </BrowserRouter>
    )

    const inputEmail = screen.getByPlaceholderText('Enter your email')
    const submitButton = screen.getByText(/Confirm/)

    await waitFor(async () => {
      await fireEvent.change(inputEmail, {
        target: { value: testEmail },
      })

      fireEvent.click(submitButton)

      await expect(screen.getByText('Invalid email')).toBeInTheDocument()
    })
  })

  it('Should go back after click on back button', async () => {
    const history = createMemoryHistory()

    history.push('/some/test/route')

    render(
      <Router history={history}>
        <ChangePassword />
      </Router>
    )

    const button = screen.getByText('Back')
    fireEvent.click(button)

    expect(history.location.pathname).toEqual('/')
  })

  it('Should go to main route after submitting', async () => {
    const history = createMemoryHistory()

    history.push('/some/test/route')

    axios.post.mockReturnValueOnce({
      data: { data: { message: '' } }
    })

    render(
      <Router history={history}>
        <ChangePassword />
      </Router>
    )

    const inputEmail = screen.getByPlaceholderText('Enter your email')
    const submitButton = screen.getByText(/Confirm/)

    await waitFor(async () => {
      await fireEvent.change(inputEmail, {
        target: { value: 'testemail@gmail.com' },
      })

      fireEvent.click(submitButton)

      await expect(history.location.pathname).toEqual('/')
    })
  })
})
