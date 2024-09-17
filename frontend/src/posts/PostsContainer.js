import React, { useState, useEffect } from 'react';
import PostObject from './PostObject';

const PostsContainer = ({ username }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`/posts/show_posts?username=${username}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setPosts(data.posts)
            })
            .catch(error => console.error('Error fetching posts:', error));
    }, [username]);

    return (
        <div>
          {posts.map(post => (
            <PostObject key={post.id} post={post} />
          ))}
        </div>
      );
}

export default PostsContainer;