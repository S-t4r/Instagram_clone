import { useUser } from './UserContext';
import { Navigate, useParams } from 'react-router-dom';

const UserEditRoute = ({ children }) => {
    const { user } = useUser();
    const { username } = useParams();

    if (!user || user.username !== username) {
        return <Navigate to="/" />;
    }

    return children;
};

export default UserEditRoute;