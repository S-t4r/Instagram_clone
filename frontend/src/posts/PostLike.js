import getCSRFToken from "../utils";

export default function PostLike({ postId, liked, setLiked, likeCount, setLikeCount }) {

    function handleLike() {
        const csrfToken = getCSRFToken();
        const formData = new FormData();
        formData.append('post_id', postId)
        fetch(`/likes/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
            },
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (typeof data.liked === 'boolean') {
                setLiked(data.liked);
                setLikeCount(data.like_count);
            }
            else {
                alert("Something went wrong!");
            }
        });
    };
    
    return (
        <div className="like-div">
            <button onClick={handleLike} className="like-button">
                <i className={liked ? "fa fa-heart" : "fa fa-heart-o"}></i>
            </button>
            <span>{likeCount} Likes</span>
        </div>
    );
}