import { useContext } from 'react';

import { Outlet, Navigate } from 'react-router-dom';

import AuthContext from '../contexts/auth';

const PublicRoute = () => {
    const auth = useContext(AuthContext);

    return auth.isAuth ? <Navigate to="/class" /> : <Outlet />;
};

export default PublicRoute;
