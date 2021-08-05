import { useState, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { publicRoutes, privateRoutes } from './routes'
import { RouteWrapper } from 'layouts'
import { getUser } from 'redux/selectors'
import { useSocket } from 'hooks'

import styles from './App.module.scss'

const App = () => {
  useSocket()
  const { id } = useSelector(getUser)

  const [isPublickRoutes, setIsPublickRoutes] = useState(!id)

  useEffect(() => {
    setIsPublickRoutes(!id)
  }, [id])

  const publicRoutesRender = useMemo(() => publicRoutes.map((route, i) => (
    <Route key={i} {...route} />
  )), [])

  const privateRoutesRender = useMemo(() => privateRoutes.map((route, i) => (
    <RouteWrapper key={i} {...route} />
  )), [])

  return (
    <div className={styles.app} data-testid="app">
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
