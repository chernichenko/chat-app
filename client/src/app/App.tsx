import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { publicRoutes, privateRoutes } from './routes'
import { CONNECT_WEBSOCKET } from 'constants/socket'

import styles from './App.module.scss'

const App = () => {
  const dispatch = useDispatch();
  const [routes] = useState(true ? publicRoutes : privateRoutes)

  useEffect(() => {
    dispatch({ type: CONNECT_WEBSOCKET })
  }, [])

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Switch>  
          {routes.map((route, i) => (
            <Route key={i} {...route} />
          ))}
        </Switch>
      </div>
    </div>
  )
}

export default App
