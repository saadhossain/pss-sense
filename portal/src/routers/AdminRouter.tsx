import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { DataContext, DataContextType } from '../context/AuthProvider';
import useUser from '../hooks/useUser';
import Loader from '../components/Loader/Loader';

const AdminRouter = ({children}:any) => {
    const {user, loading} = useContext(DataContext) as DataContextType;
    const {loggedInUser, userLoading} = useUser(user?.email);
    const location = useLocation()
    if(loading || userLoading){
        return <Loader></Loader>
    }
    if(loggedInUser.role !== 'admin'){
        return <Navigate to='/dashboard' state={{from: location}} replace></Navigate>
    }
    return children;
};

export default AdminRouter;