import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {

    const {authToken} = useContext(AuthContext);

    return (
        authToken ? <Outlet /> : <Navigate to='' />
    );
};
export default ProtectedRoute