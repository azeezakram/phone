import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import CreateContact from './pages/CreateContact.jsx'
import Contact from './pages/Contact.jsx'

const router = createBrowserRouter([
    {
        path : '/',
        element : <App/>,
        errorElement : <h2>404 Page not found</h2>,
        children: [
            {
                index: true,
                path : '/',
                element: <Home/>
            },
            {
                path : '/create-contact',
                element: <CreateContact/>
            },
            {
                path : '/contact/:contactId',
                element: <Contact/>
            }
        ]
    }
])

createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router} />
 
)
