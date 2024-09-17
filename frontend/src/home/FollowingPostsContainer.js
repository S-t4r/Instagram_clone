import React, { useState, useEffect } from 'react';
import PostObject from '../posts/PostObject';

const FollowingPostsContainer = ({ username }) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchPosts = (page) => {
        fetch(`/posts/following?username=${username}&page=${page}`)
            .then(response => response.json())
            .then(data => {
                const newPosts = data.posts.filter(post => !posts.some(existingPost => existingPost.id === post.id));
                const filteredPosts = [...posts, ...newPosts].filter((post, index, self) => 
                    index === self.findIndex((p) => p.id === post.id)
                );
                setPosts(filteredPosts);
                // no more request if there are less than 10 posts
                setHasMore(data.posts.length === 10);
            })
            .catch(error => console.error('Error fetching posts:', error));
    };
    
    useEffect(() => {
        fetchPosts(page);
    }, [page]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== 
                document.documentElement.offsetHeight 
            || !hasMore) {
                return
            };
        setPage(prevPage => prevPage + 1);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore]);

    return (
        <div className="home">
            {posts.map(post => (
                <PostObject key={post.id} post={post} />
            ))}
        </div>
    );
};

export default FollowingPostsContainer;