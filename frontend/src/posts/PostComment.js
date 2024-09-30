import { useEffect, useState } from "react"
import getCSRFToken from "../utils";
import CommentsList from './CommentsList'

export default function PostComment({ postId }) {
    const [comment, setComment] = useState('');
    const [commentList, setCommentList] = useState([]);
    
    // To show only a part or all
    const [showAll, setShowAll] = useState(false);

    // Fetch initial comments from the server
    useEffect(() => {
        fetch(`/comments/?post_id=${postId}`)
            .then(response => response.json())
            .then(data => setCommentList(data.comments));
    }, [postId])

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    // Last three comments
    const commentsToShow = showAll ? commentList : commentList.slice(0, 3);

    function handleComment(event) {
        event.preventDefault();
        if (!comment || comment.trim() === '') {
            alert("No empty comments!");
            return;
        }

        const csrfToken = getCSRFToken();
        const formData = new FormData();
        formData.append('comment', comment);
        formData.append('post_id', postId);

        fetch(`/comments/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken
            },
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'ok') {
                setComment('');
                setCommentList([data.comment, ...commentList]);                
            }
            else if (data.status === "error") {
                alert(data.message)
            }
        })
        .catch(error => {
            console.log(error);
        })
    };

    return (
        <div>
            <form onSubmit={handleComment}>
                <textarea
                    type="text"
                    onChange={(event) => setComment(event.target.value)}
                    value={comment}
                />
                <button type="submit">comment</button>
            </form>
            <CommentsList comments={commentsToShow} />

            {commentList.length > 3 && (
                <button onClick={toggleShowAll} className="show-all-comments">
                    {showAll ? 'Hide Comments' : 'Show All Comments'}
                </button>
            )}
        </div>
    );
}