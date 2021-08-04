import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Router, BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux'
import store from 'redux/store'
import { Profile } from './Profile'
import axios from 'axios'

jest.mock('axios')

describe('Profile', () => {
  it('Should Profile render', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Profile />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByTestId('profile')).toBeInTheDocument()
  })

  it('Should Profile form work correctly', async () => {
    const testName = 'Test Name'

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Profile />
        </Provider>
      </BrowserRouter>
    )

    const inputName = screen.getByPlaceholderText('Enter your new name')

    await waitFor(async () => {
      await fireEvent.change(inputName, {
        target: { value: testName },
      })

      expect(inputName.value).toMatch(testName)
    })
  })
  
  it('Should has validation error', async () => {
    const testName = '.'

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Profile />
        </Provider>
      </BrowserRouter>
    )

    const inputName = screen.getByPlaceholderText('Enter your new name')
    const submitButton = screen.getByText(/Change Info/)

    await waitFor(async () => {
      await fireEvent.change(inputName, {
        target: { value: testName },
      })

      fireEvent.click(submitButton)

      await expect(screen.getByText('Too Short!')).toBeInTheDocument()
    })
  })

  it('Should submitting correctly', async () => {
    const history = createMemoryHistory()

    history.push('/some/test/route')

    axios.post.mockReturnValueOnce({
      data: { data: { id: 'Test' } }
    })

    const testName = 'Test Name'

    render(
      <Router history={history}>
        <Provider store={store}>
          <Profile />
        </Provider>
      </Router>
    )

    const inputName = screen.getByPlaceholderText('Enter your new name')
    const submitButton = screen.getByText(/Change Info/)

    await waitFor(async () => {
      await fireEvent.change(inputName, {
        target: { value: testName },
      })

      fireEvent.click(submitButton)

      expect(axios.post).toHaveBeenCalled()

      await expect(history.location.pathname).toEqual('/')
    })
  })
})
