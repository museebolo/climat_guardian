import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import DashboardElement from "./elements/DashboardElement.tsx";
import PlanElement from "@/elements/PlanElement.tsx";
import LoginElement from "@/elements/LoginElement.tsx";

const router = createBrowserRouter([
    {
        path:"/",
        Component: App,
        children: [
            {
                path:"/",
             element: <DashboardElement/>
            },{
            path:"/plan",
                element:<PlanElement/>
            },
            {
                path:"/login",
                element:<LoginElement/>
            }
        ]
    },

])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)