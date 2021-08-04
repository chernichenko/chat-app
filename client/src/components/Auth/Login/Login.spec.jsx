import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Router, BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux'
import store from 'redux/store'
import { Login } from './Login'
import axios from 'axios'

jest.mock('axios')

describe('Login', () => {
  it('Should Login render', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByTestId('login')).toBeInTheDocument()
  })

  it('Should Login form work correctly', async () => {
    const testEmail = 'testemail@gmail.com'
    const testPassword = 'testpassword'

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    )

    const inputEmail = screen.getByPlaceholderText('Enter your email')
    const inputPassword = screen.getByPlaceholderText('Enter your password')

    await waitFor(async () => {
      await fireEvent.change(inputEmail, {
        target: { value: testEmail },
      })

      await fireEvent.change(inputPassword, {
        target: { value: testPassword },
      })

      expect(inputEmail.value).toMatch(testEmail)
      expect(inputPassword.value).toMatch(testPassword)
    })
  })
  
  it('Should has validation error', async () => {
    const testEmail = 'invalidemail'
    const testPassword = 'short'

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    )

    const inputEmail = screen.getByPlaceholderText('Enter your email')
    const inputPassword = screen.getByPlaceholderText('Enter your password')
    const submitButton = screen.getByText(/Sign in/)

    await waitFor(async () => {
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

  it('Should go to some routes after click on buttons', async () => {
    const history = createMemoryHistory()

    history.push('/some/test/route')

    render(
      <Router history={history}>
        <Provider store={store}>
          <Login />
        </Provider>
      </Router>
    )

    fireEvent.click(screen.getByText(/Registration/))
    expect(history.location.pathname).toEqual('/registration')

    fireEvent.click(screen.getByText(/Forgot your password?/))
    expect(history.location.pathname).toEqual('/password')
  })

  it('Should submitting correctly', async () => {
    axios.post.mockReturnValueOnce({
      data: { data: { id: 'Test' } }
    })

    const testEmail = 'testemail@gmail.com'
    const testPassword = 'testpassword'

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    )

    const inputEmail = screen.getByPlaceholderText('Enter your email')
    const inputPassword = screen.getByPlaceholderText('Enter your password')
    const submitButton = screen.getByText(/Sign in/)

    await waitFor(async () => {
      await fireEvent.change(inputEmail, {
        target: { value: testEmail },
      })

      await fireEvent.change(inputPassword, {
        target: { value: testPassword },
      })

      fireEvent.click(submitButton)

      expect(axios.post).toHaveBeenCalled()
    })
  })
})
