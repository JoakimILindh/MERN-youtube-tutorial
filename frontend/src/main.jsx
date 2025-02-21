import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import AuthContextProvider from './contexts/authContext'
import RootLayout from './layouts/RootLayout'
import AuthLayout from './layouts/AuthLayout'
import PrivateLayout from './layouts/PrivateLayout'
import AdminLayout from './layouts/AdminLayout'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ThreadsPage from './pages/ThreadsPage'
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/AdminPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { 
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <LoginPage />
          },
          {
            path: 'register',
            element: <RegisterPage />
          }
        ]
      },

      {
        element: <PrivateLayout />,
        children: [
          {
            path: 'threads',
            element: <ThreadsPage />
          },
          {
            path: 'profile',
            element: <ProfilePage />
          },
          {
            path: 'admin',
            element: <AdminLayout />,
            children: [
              {
                index: true,
                element: <AdminPage />
              }
            ]
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>,
)
