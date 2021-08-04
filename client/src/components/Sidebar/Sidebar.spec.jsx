import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import store from 'redux/store'
import userSlice from 'redux/reducers/userSlice'
import { Sidebar } from './Sidebar'
import { dialogItemsMock } from 'constants/tests'

const configurateStore = ({ token, dialogs }) => configureStore({
  reducer: userSlice,
  preloadedState: {
    user: {
      token,
    },
    dialogs: {
      dialogs
    }
  },
})

describe('Sidebar', () => {
  it('Should Sidebar render', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Sidebar />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  })

  it('Should dialogs render from redux', () => {
    render(
      <BrowserRouter>
        <Provider store={configurateStore({ dialogs: dialogItemsMock })}>
          <Sidebar />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getAllByTestId('dialog-item').length).toEqual(dialogItemsMock.length)
  })
})
