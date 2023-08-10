import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import React from 'react'

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import Pageabout from './pages/Pageabout.tsx'

const router = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { path: '/', element: <Pageabout />},
  ] },
  
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
