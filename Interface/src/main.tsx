import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import DashboardElement from "./elements/DashboardElement.tsx";
import PlanElement from "@/elements/PlanElement.tsx";
import LoginElement from "@/elements/LoginElement.tsx";

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;

};

const renderRoutes = () => {
    return [
        {
            path: "/",
            Component: App,
            children: [
                {
                    path: "/dashboard",
                    element: isAuthenticated() ? <DashboardElement/> : <LoginElement/>
                },
                {
                    path: "/plan",
                    element:  isAuthenticated() ?  <PlanElement/> : <LoginElement/>
                },
                {
                    path: "/login",
                    element: <LoginElement/>
                }
            ]
        }
    ];
};

const router = createBrowserRouter(renderRoutes());

// Render the application
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
