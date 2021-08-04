import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Router, BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import userSlice from 'redux/reducers/userSlice'
import { Header } from './Header'
import axios from 'axios'

jest.mock('axios')

const configurateStore = ({ token, name, avatarUrl }) => configureStore({
  reducer: userSlice,
  preloadedState: {
    user: {
      token,
      name,
      avatarUrl
    }
  },
})

describe('Header', () => {
  it('Should Header render', () => {
    render(
      <BrowserRouter>
        <Provider store={configurateStore({})}>
          <Header />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByTestId('header')).toBeInTheDocument()
  })

  it('Should avatar render', () => {
    const testAvatarUrl = 'some/avatar/url'

    render(
      <BrowserRouter>
        <Provider store={configurateStore({ avatarUrl: testAvatarUrl })}>
          <Header />
        </Provider>
      </BrowserRouter>
    )

    const avatar = screen.getByTestId('avatar')
    expect(avatar).toBeInTheDocument()
    expect(avatar.src.includes(testAvatarUrl)).toBeTruthy()
  })

  it('Should go to another routes', async () => {
    const history = createMemoryHistory()

    history.push('/some/test/route')

    render(
      <Router history={history}>
        <Provider store={configurateStore({})}>
          <Header />
        </Provider>
      </Router>
    )

    const linkDialogs = screen.getByText(/Dialogs/)
    const linkProfile = screen.getByText(/Profile/)

    fireEvent.click(linkDialogs)
    expect(history.location.pathname).toEqual('/')

    fireEvent.click(linkProfile)
    expect(history.location.pathname).toEqual('/profile')
  })

  it('Should logout correctly', async () => {
    const history = createMemoryHistory()

    history.push('/some/test/route')

    axios.post.mockReturnValueOnce({
      data: { data: '' }
    })

    render(
      <Router history={history}>
        <Provider store={configurateStore({ avatarUrl: 'some/url', token: 'token' })}>
          <Header />
        </Provider>
      </Router>
    )

    expect(screen.getByTestId('avatar')).toBeInTheDocument()

    const linkLogout = screen.getByText(/Logout/)
    fireEvent.click(linkLogout)

    await waitFor(async () => {
      await expect(history.location.pathname).toEqual('/')
    })
  })
})
