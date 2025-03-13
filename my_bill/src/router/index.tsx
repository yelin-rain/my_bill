import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const Login = lazy(() => import('@/views/login'));
const User = lazy(() => import('@/views/user'));
const About = lazy(() => import('@/views/user/about'));
const Home = lazy(() => import('@/views/home'));
const Statis = lazy(() => import('@/views/statis'));
const Detail = lazy(() => import('@/views/detail'));
const ChangeUserInfo = lazy(() => import('@/views/user/changeuserinfo'));
const ChangPassword = lazy(() => import('@/views/user/changepassword'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/login" />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/statis',
    element: <Statis />,
  },
  {
    path: '/detail/:billId',
    element: <Detail />,
  },
  {
    path: '/user',
    element: <User />,
  },
  {
    path: '/user/changeUserInfo',
    element: <ChangeUserInfo />,
  },
  {
    path: '/user/changePassword',
    element: <ChangPassword />,
  },
  {
    path: '/user/about',
    element: <About />,
  },
];
