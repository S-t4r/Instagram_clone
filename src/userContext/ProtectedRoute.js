import { useUser } from './UserContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user } = useUser();
    
    if (user && user.username) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;