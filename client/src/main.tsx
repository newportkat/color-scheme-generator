import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App"
import "./index.css"
import Error from "./pages/Error"
import SavedPalettes from "./pages/SavedPalettes"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
    },
    {
        path: "/saved",
        element: <SavedPalettes/>
    }
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
