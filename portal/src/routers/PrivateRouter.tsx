import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { DataContext, DataContextType } from '../context/AuthProvider';
import Loader from '../components/Loader/Loader';

const PrivateRouter = ({children}:any) => {
    const {user, loading} = useContext(DataContext) as DataContextType;
    const location = useLocation()
    if(loading){
        return <Loader/>
    }
    if(!user){
        return <Navigate to='/login' state={{from: location}} replace></Navigate>
    }
    return children;
};

export default PrivateRouter;