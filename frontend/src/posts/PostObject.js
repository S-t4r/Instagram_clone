import './Posts.css'

export default function PostObject({ post, username }) {        
    return (
        <div>
            <div>
                <button>Edit</button>
                <button>Remove</button>
                <h2>
                    <a href={`http://localhost:3000/users/${username}`}>
                        {username}
                    </a>
                </h2>
                <img src={`${post.post_image}`} className='post-image' alt="Post" />
                <p>{post.caption}</p>
                <small>{post.timestamp}</small>
            </div>
        </div>
    );
}