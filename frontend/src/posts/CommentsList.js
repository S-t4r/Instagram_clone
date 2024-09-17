import { calcTime } from '../utils';

export default function CommentsList({ comments }) {

    return (
        <ul className="comment-list">
            {comments.map((comment, index) => (
                <li key={index}>
                    <div className='comment-link'>
                        <a href={`users/${comment.user}`}>
                            <img
                                src={comment.profile_image}
                                alt={`${comment.user}'s profile`}
                                className="comment-profile-image"
                            />
                        </a>
                        <a href={`users/${comment.user}`}>{comment.user}</a>
                    </div>
                    <p>{comment.content}</p>
                    <sub>{calcTime({ timestamp:comment.timestamp })}</sub>
                </li>
            ))}
        </ul>
    );
}