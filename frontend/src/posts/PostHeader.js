import getCSRFToken from "../utils";
import { useUser } from '../userContext/UserContext';

export default function PostHeader({ post, isEditing, setIsEditing }) {
    const { user } = useUser();
    const csrfToken = getCSRFToken();

    const handleRemove = () => {
        // Make sure
        if (!window.confirm("Delete this post?")) return;
        // Proceed
        fetch(`posts/remove?post_id=${post.id}`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success' ) {
                console.log(data);                
                const postElement = document.getElementById(`post-${post.id}`);
                if (postElement) {
                    postElement.remove();
                }
            }
            else {
                alert("Something went wrong!")
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    return (
        <>
            {user.username === post.profile && (
                <div className="edit-div">
                    {!isEditing ? (
                        <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
                    ) : (
                        <></>
                    )}
                    <button onClick={handleRemove}>Remove</button>
                </div>
            )}
            <h2 className="post-link">
                <a href={`users/${post.profile}`}>
                    <img
                        src={post.profile_image}
                        alt={`${post.profile}'s profile`}
                        className="post-profile-image"
                    />
                </a>
                <a href={`users/${post.profile}`}>
                    {post.profile}
                </a>
            </h2>
        </>
    );
}