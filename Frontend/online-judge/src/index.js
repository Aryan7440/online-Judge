import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import Registration from './Registration/Registration'
import SignIn from './LogIn/LogIn'
import DashBoard from './DashBoard/DashBoard'
import PageNotFound from './PageNotFound/PageNotFound'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1>Something Went Wrong</h1>,
    // loader: deferRoleChecking,
    // to prevent cold-warn start of server 💁‍♂️
  },
  {
    path: 'signup',
    element: <Registration />,
    // loader: roleChecking,
  },
  {
    path: 'signin',
    element: <SignIn />,
    // loader: roleChecking,
  },
  {
    path: 'dashboard/:id',
    element: <DashBoard />,
    // loader: roleChecking,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
])
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
)
