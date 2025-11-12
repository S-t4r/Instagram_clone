import { useParams } from 'react-router-dom';
import PostsContainer from '../posts/PostsContainer';
import ProfileDetails from './ProfileDetails';
import { useUser } from '../userContext/UserContext';
import './UserProfile.css'

export default function UserProfile() {

    const { username } = useParams();
    const { user } = useUser();

    if (!user) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className='user-profile'>
            <ProfileDetails username={username} loggedInUser={user} />
            <div>
                <PostsContainer username={username} />
            </div>
        </div>
    );
}