import { createBrowserRouter } from "react-router-dom";
import ErrorPage from '../components/ErrorPage';
import DashboardLayout from '../layout/DashboardLayout';
import Main from '../layout/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import Services from '../pages/Services';
import AddUser from '../pages/dashboard/AddUser';
import { default as AllUsers } from '../pages/dashboard/AllUsers';
import Dashboard from '../pages/dashboard/Dashboard';
import ModifyUser from '../pages/dashboard/ModifyUser';
import PrivateRouter from './PrivateRouter';
import AddDevice from '../pages/dashboard/device/AddDevice';
import AllDevices from '../pages/dashboard/device/AllDevices';
import AdminRouter from './AdminRouter';
import Pricing from '../pages/Pricing';
import Contact from '../pages/Contact';

export const Routers = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/services',
                element: <Services />
            },
            {
                path: '/pricing',
                element: <Pricing />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/profile',
                element: <PrivateRouter><Profile /></PrivateRouter>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRouter><DashboardLayout /></PrivateRouter>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/dashboard/adduser',
                element: <AdminRouter><AddUser /></AdminRouter>
            },
            {
                path: '/dashboard/allusers',
                element: <AdminRouter><AllUsers /></AdminRouter>
            },
            {
                path: '/dashboard/modifyuser/:id',
                loader: ({ params }) => fetch(`http://localhost:3000/user/${params.id}`),
                element: <AdminRouter><ModifyUser /></AdminRouter>
            },
            {
                path:'/dashboard/add-device',
                element:<AdminRouter><AddDevice/></AdminRouter>
            },
            {
                path:'/dashboard/all-device',
                element:<AdminRouter><AllDevices/></AdminRouter>
            }
        ]
    },
])