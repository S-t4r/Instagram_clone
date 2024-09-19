import { useEffect, useState } from 'react';
import { useUser } from '../userContext/UserContext';
import getCSRFToken, { calcTime } from '../utils';
import CommentsImage from './CommentsImage';

export default function CommentsList({ comments }) {
    const { user } = useUser();
    const [commentLiked, setCommentLiked] = useState({});

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
    
    // initially get the number of likes
    useEffect(() => {
        comments.map(comment => {
            fetch(`likes/comments_status/${comment.id}`)
            .then(response => response.json())
            .then(data => {
                setCommentLiked(prevState => ({
                    ...prevState,
                    [comment.id]: {
                        liked: data.liked,
                        likeCount: data.like_count
                    }
                }));
            })
        })
    }, [comments]);

    function handleLike(commentId) {
        const csrfToken = getCSRFToken();
        const formData = new FormData();
        formData.append('comment_id', commentId)
        fetch(`/likes/comments/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
            },
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (typeof data.liked === 'boolean') {
                setCommentLiked(prevState => ({
                    ...prevState,
                    [commentId]: {
                        liked: data.liked,
                        likeCount: data.like_count
                    }
                }));
            }
            else {
                alert("Something went wrong!");
            }
        })
        .catch(error => console.log(error));
    }

    return (
        <ul className="comment-list">
            {comments.map((comment, index) => (
                <li key={index} id={`comment-${comment.id}`}>
                    <CommentsImage
                        user={user}
                        comment={comment}
                        handleRemove={handleRemove}
                    />
                    <p>{comment.content}</p>
                    <div className='comment-like-div'>
                        <sub
                            onClick={() => handleLike(comment.id)}
                            className={commentLiked[comment.id]?.liked ? "fa fa-heart" : "fa fa-heart-o"}
                        ></sub>
                        <sup>{commentLiked[comment.id]?.likeCount || 0}</sup>
                    </div>
                    <sub>{calcTime({ timestamp:comment.timestamp })}</sub>
                </li>
            ))}
        </ul>
    );
}