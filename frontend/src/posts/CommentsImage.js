export default function({ user, comment, handleRemove }) {
    return (
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
    );
}