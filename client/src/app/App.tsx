import { Switch, Route } from 'react-router-dom'
import { publicRoutes, privateRoutes } from './routes'

const App = () => {

  if (true) {
    return (
      <Switch>  
        {publicRoutes.map((route, i) => (
          <Route key={i} {...route} />
        ))}
      </Switch>
    )
  }

  return (
    <Switch>  
      {privateRoutes.map((route, i) => (
        <Route key={i} {...route} />
      ))}
    </Switch>
  )
}

export default App
