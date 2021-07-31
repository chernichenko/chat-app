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
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/pageNotFound',
    component: NotFound,
  },
  {
    component: () => <Redirect to="/pageNotFound" />,
  },
]
