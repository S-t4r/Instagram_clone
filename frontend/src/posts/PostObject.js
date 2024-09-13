import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Posts.css'

export default function PostObject() {
    // 
    const [posts, setPosts] = useState([]);
    const { username } = useParams();

    useEffect(() => {
        fetch(`/posts/show_posts?username=${username}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setPosts(data))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    return (
        <div>
            {posts.map(post => (
                <div key={post.id}>
                    <h2>{post.profile_id}</h2>
                    <img src={`/media/${post.post_image}`} className='post-image' alt="Post" />
                    <p>{post.caption}</p>
                    <small>{post.timestamp}</small>
                </div>
            ))}
        </div>
    );
}