import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Router, BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { ChangePasswordSuccess } from './ChangePasswordSuccess'
import axios from 'axios'

jest.mock('axios')

describe('ChangePasswordSuccess', () => {
  it('Should ChangePasswordSuccess render', () => {
    render(
      <BrowserRouter>
        <ChangePasswordSuccess />
      </BrowserRouter>
    )

    expect(screen.getByTestId('change-password-success')).toBeInTheDocument()
  })

  it('Should ChangePasswordSuccess form work correctly', async () => {
    const testPassword = 'testPassword'

    render(
      <BrowserRouter>
        <ChangePasswordSuccess />
      </BrowserRouter>
    )

    const inputPassword = screen.getByPlaceholderText('Enter new password')

    await waitFor(async () => {
      await fireEvent.change(inputPassword, {
        target: { value: testPassword },
      })

      expect(inputPassword.value).toMatch(testPassword)
    })
  })
  
  it('Should has validation error', async () => {
    const testPassword = 'short'

    render(
      <BrowserRouter>
        <ChangePasswordSuccess />
      </BrowserRouter>
    )

    const inputPassword = screen.getByPlaceholderText('Enter new password')
    const submitButton = screen.getByText(/Confirm/)

    await waitFor(async () => {
      await fireEvent.change(inputPassword, {
        target: { value: testPassword },
      })

      fireEvent.click(submitButton)

      await expect(screen.getByText('Too Short!')).toBeInTheDocument()
    })
  })

  it('Should go to main route after submitting', async () => {
    const history = createMemoryHistory()

    history.push('/some/test/route')

    axios.post.mockReturnValueOnce({
      data: { data: { message: '' } }
    })

    render(
      <Router history={history}>
        <ChangePasswordSuccess />
      </Router>
    )

    const inputPassword = screen.getByPlaceholderText('Enter new password')
    const submitButton = screen.getByText(/Confirm/)

    await waitFor(async () => {
      await fireEvent.change(inputPassword, {
        target: { value: 'testPassword' },
      })

      fireEvent.click(submitButton)

      await expect(history.location.pathname).toEqual('/')
    })
  })
})
