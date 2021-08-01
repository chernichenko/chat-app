import { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { publicRoutes, privateRoutes } from './routes'
import { CONNECT_WEBSOCKET } from 'constants/socket'
import { RouteWrapper } from 'layouts'

import styles from './App.module.scss' 

const App = () => {
  const dispatch = useDispatch()
  const userId = useSelector((s: any) => s.user.id)

  const [isPublickRoutes, setIsPublickRoutes] = useState(!userId)

  useEffect(() => {
    dispatch({ type: CONNECT_WEBSOCKET })
  }, [])

  useEffect(() => {
    setIsPublickRoutes(!userId)
  }, [userId])

  const publicRoutesRender = useMemo(() => publicRoutes.map((route, i) => (
    <Route key={i} {...route} />
  )), [])

  const privateRoutesRender = useMemo(() => privateRoutes.map((route, i) => (
    <RouteWrapper key={i} {...route} />
  )), [])

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Switch>  
          {isPublickRoutes ? publicRoutesRender : privateRoutesRender}
        </Switch>
      </div>
      <div className={styles.mob}>
        <h1>There is no mobile version</h1>
      </div>
    </div>
  )
}

export default App
