import React from 'react'
import ReactDOM from 'react-dom/client'
import routes from './routes/Routes.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
