import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'redux/store'
import { MainLayout } from './MainLayout'

describe('MainLayout', () => {
  it('Should MainLayout render', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MainLayout />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByTestId('main-layout')).toBeInTheDocument()
  })

  it('Should MainLayout render children correctly', () => {
    const testChildren = 'test children'
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MainLayout>
            {testChildren}
          </MainLayout>
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByText(testChildren)).toBeInTheDocument()
  })

  it('Should MainLayout render header', () => {
    const testChildren = 'test children'
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MainLayout>
            {testChildren}
          </MainLayout>
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByTestId('header')).toBeInTheDocument()
  })
})
