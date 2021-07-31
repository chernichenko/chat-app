import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from 'redux/store'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from 'app/ErrorBoundary'
import App from 'app/App'

import 'assets/default/styles.scss'

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root')
)
