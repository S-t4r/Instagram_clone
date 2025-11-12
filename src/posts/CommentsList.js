import { useEffect, useState } from 'react';
import { useUser } from '../userContext/UserContext';
import getCSRFToken, { calcTime } from '../utils';
import CommentsImage from './CommentsImage';

export default function CommentsList({ comments }) {
    const { user } = useUser();
    const [commentLiked, setCommentLiked] = useState({});
    // To stop calling the server over and over again
    const [fetchedComments, setFetchedComments] = useState({});

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
    const commentsToFetch = comments.filter(comment => !fetchedComments[comment.id]);

    // Save into local storage
    useEffect(() => {
        commentsToFetch.forEach(comment => {
          // Store data in local storage
          const storedData = localStorage.getItem(`comment_${comment.id}`);
          
          // ETag to listen for changes
          const storedEtag = localStorage.getItem(`etag_${comment.id}`);
      
          if (storedData) {
            const data = JSON.parse(storedData);
            setCommentLiked(prevState => ({
              ...prevState,
              [comment.id]: {
                liked: data.liked,
                likeCount: data.like_count
              }
            }));
            setFetchedComments(prevState => ({
              ...prevState,
              [comment.id]: true
            }));
          }
      
          fetch(`/likes/comments_status/${comment.id}`, {
            headers: {
              'If-None-Match': storedEtag
            }
          })
          .then(response => {
            if (response.status === 304) {
              // Data has not changed
              return null;
            }
            else {
              const newEtag = response.headers.get('ETag');
              localStorage.setItem(`etag_${comment.id}`, newEtag);
              return response.json();
            }
          })
          .then(data => {
            if (data) {
              localStorage.setItem(`comment_${comment.id}`, JSON.stringify(data));
              setCommentLiked(prevState => ({
                ...prevState,
                [comment.id]: {
                  liked: data.liked,
                  likeCount: data.like_count
                }
              }));
              setFetchedComments(prevState => ({
                ...prevState,
                [comment.id]: true
              }));
            }
          });
        });
      }, [commentsToFetch]);

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