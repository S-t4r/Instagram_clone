import { useUser } from "../userContext/UserContext";
import FollowingPostsContainer from './FollowingPostsContainer'

const Home = () => {
    const { user } = useUser();

    if (!user) {
        return <div>Loading...</div>;
    }    

    return (
        <div>
            <FollowingPostsContainer username={user.username} />
        </div>
    );
};

export default Home;