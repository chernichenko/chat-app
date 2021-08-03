import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Router, BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux'
import store from 'redux/store'
import { Registration } from './Registration'
import axios from 'axios'

jest.mock('axios')

describe('Registration', () => {
  it('Should Registration render', () => {
    render(
      <BrowserRouter>
        <Registration />
      </BrowserRouter>
    )

    expect(screen.getByTestId('registration')).toBeInTheDocument()
  })

  it('Should Registration form work correctly', async () => {
    const testName = 'Test Name'
    const testEmail = 'testemail@gmail.com'
    const testPassword = 'testpassword'

    render(
      <BrowserRouter>
        <Registration />
      </BrowserRouter>
    )

    const inputName = screen.getByPlaceholderText('Enter your name')
    const inputEmail = screen.getByPlaceholderText('Enter your email')
    const inputPassword = screen.getByPlaceholderText('Enter your password')

    await waitFor(async () => {
      await fireEvent.change(inputName, {
        target: { value: testName },
      })

      await fireEvent.change(inputEmail, {
        target: { value: testEmail },
      })

      await fireEvent.change(inputPassword, {
        target: { value: testPassword },
      })

      expect(inputName.value).toMatch(testName)
      expect(inputEmail.value).toMatch(testEmail)
      expect(inputPassword.value).toMatch(testPassword)
    })
  })
  
  it('Should has validation error', async () => {
    const testName = 'short'
    const testEmail = 'invalidemail'
    const testPassword = 'short'

    render(
      <BrowserRouter>
        <Registration />
      </BrowserRouter>
    )

    const inputName = screen.getByPlaceholderText('Enter your name')
    const inputEmail = screen.getByPlaceholderText('Enter your email')
    const inputPassword = screen.getByPlaceholderText('Enter your password')
    const submitButton = screen.getByText(/Sign up/)

    await waitFor(async () => {
      await fireEvent.change(inputName, {
        target: { value: testName },
      })

      await fireEvent.change(inputEmail, {
        target: { value: testEmail },
      })

      await fireEvent.change(inputPassword, {
        target: { value: testPassword },
      })

      fireEvent.click(submitButton)

      await expect(screen.getByText('Invalid email')).toBeInTheDocument()
      await expect(screen.getByText('Too Short!')).toBeInTheDocument()
    })
  })

  it('Should go back after click on button', async () => {
    const history = createMemoryHistory()

    history.push('/some/test/route')

    render(
      <Router history={history}>
        <Registration />
      </Router>
    )

    fireEvent.click(screen.getByText(/Back/))
    expect(history.location.pathname).toEqual('/')
  })

  it('Should submitting correctly', async () => {
    const history = createMemoryHistory()

    history.push('/some/test/route')

    axios.post.mockReturnValueOnce({
      data: { data: '' }
    })

    const testName = 'Test Name'
    const testEmail = 'testemail@gmail.com'
    const testPassword = 'testpassword'

    render(
      <Router history={history}>
        <Registration />
      </Router>
    )

    const inputName = screen.getByPlaceholderText('Enter your name')
    const inputEmail = screen.getByPlaceholderText('Enter your email')
    const inputPassword = screen.getByPlaceholderText('Enter your password')
    const submitButton = screen.getByText(/Sign up/)

    await waitFor(async () => {
      await fireEvent.change(inputName, {
        target: { value: testName },
      })

      await fireEvent.change(inputEmail, {
        target: { value: testEmail },
      })

      await fireEvent.change(inputPassword, {
        target: { value: testPassword },
      })

      fireEvent.click(submitButton)

      expect(axios.post).toHaveBeenCalled()

      await expect(history.location.pathname).toEqual('/')
    })
  })
})
