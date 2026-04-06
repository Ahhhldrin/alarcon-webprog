import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// HomePage Structure
import Layout from './components/Layout'
import ArticleListPage from './pages/ArticleListPage'
import ArticlePage from './pages/ArticlePage'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage.jsx'

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
      }
    ]
  }
]

const router = createBrowserRouter(routes)

const App = () => {
  return <RouterProvider router={router} />
}

export default App

