import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// HomePage Structure
import Layout from './components/Layout'
import ArticleListPage from './pages/LandingPages/ArticleListPage.jsx'
import ArticlePage from './pages/LandingPages/ArticlePage.jsx'
import HomePage from './pages/LandingPages/HomePage.jsx'
import AboutPage from './pages/LandingPages/AboutPage.jsx'


import AuthLayout from './layouts/AuthLayout.jsx'
import SignInPage from './pages/AuthPages/SignInPage.jsx'
import SignUpPage from './pages/AuthPages/SignUpPage.jsx' 

import NotFoundPage from './pages/LandingPages/NotFoundPage.jsx'



const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/about',
        element: <AboutPage />
      },
      {
        path: '/articles',
        element: <ArticleListPage />
      },
      {
        path: '/articles/:name',
        element: <ArticlePage />
      },
    ],
  },
  {

  path: '/auth',
  element: <AuthLayout />,
  children: [
    {
      path: 'signin',
      element: <SignInPage />
    },
    {
      path: 'signup',
      element: <SignUpPage />
    }
  ],
},
];

const router = createBrowserRouter(routes)

const App = () => {
  return <RouterProvider router={router} />
}

export default App

