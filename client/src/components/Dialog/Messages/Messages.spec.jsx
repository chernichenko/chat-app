import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import userSlice from 'redux/reducers/userSlice'
import { Messages } from './Messages'
import { messagesListMock } from 'constants/tests'

const configurateStore = ({ id, token, name, avatarUrl, messages, userTo }) => configureStore({
  reducer: userSlice,
  preloadedState: {
    user: {
      id,
      token,
      name,
      avatarUrl
    },
    dialog: {
      messages,
      userTo,
    }
  },
})

describe('Messages', () => {
  it('Should not render messages list', () => {
    render(
      <BrowserRouter>
        <Provider store={configurateStore({})}>
          <Messages />
        </Provider>
      </BrowserRouter>
      
    )

    expect(screen.getByTestId('messages')).toBeInTheDocument()
    expect(screen.getByText(/There are no messages/)).toBeInTheDocument()
  })

  it('Should render messages list', () => {
    const mockStore = configurateStore({
      id: '123',
      avatarUrl: '/avatar/url',
      messages: messagesListMock,
      userTo: {
        avatarUrl: '/avatar/url',
      }
    })

    render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <Messages />
        </Provider>
      </BrowserRouter>
      
    )

    expect(screen.getAllByTestId('message').length).toEqual(messagesListMock.length)
  })
})
