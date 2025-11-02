import React from 'react';
import { AuthContext } from './AuthContext';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Components/Loading/Loading';
import { use } from 'react';

const PrivetRoutes = ({children}) => {

    const {user, loading} = use(AuthContext)


    const location = useLocation();


    if(loading) {
        return <Loading/>
    }


    if(user && user?.email) {
        return children
    }


    return (
        <div>
            <Navigate state={location.pathname} to={'/auth/login'} replace/>
        </div>
    );
};

export default PrivetRoutes;