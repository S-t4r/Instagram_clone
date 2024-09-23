import { useNavigate } from "react-router-dom";

export default function({ user, comment, handleRemove }) {
    const navigate = useNavigate();
    return (
        <div className='comment-link'>
            <a href="#" onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/users/${comment.user}`); }}>
                <img
                    src={comment.profile_image}
                    alt={`${comment.user}'s profile`}
                    className="comment-profile-image"
                />
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/users/${comment.user}`); }}>{comment.user}</a>
            {comment.user === user.username && (
                <button onClick={() => handleRemove(comment.id)} className='comment-remove'>Remove</button>
            )}
        </div>
    );
}