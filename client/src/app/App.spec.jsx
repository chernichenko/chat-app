import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'redux/store'
import { configureStore } from '@reduxjs/toolkit'
import userSlice from 'redux/reducers/userSlice'
import App from './App'

const configurateStore = ({ id }) => configureStore({
  reducer: userSlice,
  preloadedState: {
    ...store.getState(),
    user: {
      ...store.getState().user,
      id
    },
  },
})

describe('App', () => {
  it('Should App render public routes', () => {
    render(
      <BrowserRouter>
        <Provider store={configurateStore({})}>
          <App />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByTestId('app')).toBeInTheDocument()
    expect(screen.getByTestId('login')).toBeInTheDocument()
  })

  it('Should App render private routes', () => {
    render(
      <BrowserRouter>
        <Provider store={configurateStore({ id: '123' })}>
          <App />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByTestId('app')).toBeInTheDocument()
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('main')).toBeInTheDocument()
  })
})
