import { useUser } from '../userContext/UserContext';
import getCSRFToken, { calcTime } from '../utils';

export default function CommentsList({ comments }) {
    const { user } = useUser();

    const handleRemove = (commentId) => {
        const csrfToken = getCSRFToken();
        // Make sure
        if (!window.confirm("Delete this comment?")) return;
        // Proceed
        fetch(`comments/remove?comment=${commentId}`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success' ) {            
                const commentElement = document.getElementById(`comment-${commentId}`);
                if (commentElement) {
                    commentElement.remove();
                }
            }
            else {
                alert('something went wrong: \n' + data.error)
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
    

    return (
        <ul className="comment-list">
            {comments.map((comment, index) => (
                <li key={index} id={`comment-${comment.id}`}>
                    <div className='comment-link'>
                        <a href={`users/${comment.user}`}>
                            <img
                                src={comment.profile_image}
                                alt={`${comment.user}'s profile`}
                                className="comment-profile-image"
                            />
                        </a>
                        <a href={`users/${comment.user}`}>{comment.user}</a>
                        {comment.user === user.username && (
                            <button onClick={() => handleRemove(comment.id)} className='comment-remove'>Remove</button>
                        )}
                    </div>
                    <p>{comment.content}</p>
                    <sub>{calcTime({ timestamp:comment.timestamp })}</sub>
                </li>
            ))}
        </ul>
    );
}