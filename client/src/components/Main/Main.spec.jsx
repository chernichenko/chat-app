import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Router, BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux'
import store from 'redux/store'
import { Main } from './Main'

describe('Main', () => {
  it('Should Main render', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByTestId('main')).toBeInTheDocument()
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    expect(screen.getByText(/Please click on some user/)).toBeInTheDocument()
  })

  it('Should render dialog', async () => {
    const history = createMemoryHistory()

    history.push('/dialog/:123')

    render(
      <Router history={history}>
        <Provider store={store}>
          <Main />
        </Provider>
      </Router>
    )

    expect(screen.queryByText(/Please click on some user/)).not.toBeInTheDocument()
  })
})
