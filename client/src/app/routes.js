import { Redirect } from 'react-router-dom'
import {
  NotFound,
  Login,
  Registration,
  ChangePassword,
  ChangePasswordSuccess,
  Main,
  Profile,
} from 'components'
import { MainLayout } from 'layouts'

export const publicRoutes = [
  {
    path: '/',
    exact: true,
    component: Login,
  },
  {
    path: '/registration',
    component: Registration,
  },
  {
    path: '/password',
    exact: true,
    component: ChangePassword,
  },
  {
    path: '/password/:token',
    component: ChangePasswordSuccess,
  },
  {
    component: () => <Redirect to="/" />,
  },
]

export const privateRoutes = [
  {
    path: '/',
    exact: true,
    component: Main,
    layout: MainLayout,
  },
  {
    path: '/dialog/:userToId',
    component: Main,
    layout: MainLayout,
  },
  {
    path: '/profile',
    component: Profile,
    layout: MainLayout,
  },
  {
    path: '/pageNotFound',
    component: NotFound,
  },
  {
    component: () => <Redirect to="/pageNotFound" />,
  },
]
