import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'redux/store'
import { RouteWrapper } from './RouteWrapper'
import { MainLayout } from '../MainLayout'

describe('RouteWrapper', () => {
  it('Should RouteWrapper render preloader if there is no path', () => {

    const testComponent = () => <div data-testid="test-component" />
    const testLayout = MainLayout

    render(
      <BrowserRouter>
        <Provider store={store}>
          <RouteWrapper
            component={testComponent}
            layout={testLayout}
          />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByTestId('preloader')).toBeInTheDocument()
  })

  it('Should RouteWrapper render some routes', () => {
    const testComponent = () => <div data-testid="test-component" />
    const testLayout = MainLayout
    const testPath = '/some/test/path'

    render(
      <BrowserRouter>
        <Provider store={store}>
          <RouteWrapper
            component={testComponent}
            layout={testLayout}
            path={testPath}
          />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.queryByTestId('preloader')).not.toBeInTheDocument()
  })
})
