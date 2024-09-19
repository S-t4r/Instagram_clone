import React, { useState, useEffect, useCallback } from 'react';
import PostObject from '../posts/PostObject';

const FollowingPostsContainer = ({ username }) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchPosts = useCallback((page) => {
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
    }, [username, posts]);
    
    useEffect(() => {
        fetchPosts(page);
    }, [page, fetchPosts]);

    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop !== 
                document.documentElement.offsetHeight 
            || !hasMore) {
                return
            };
        setPage(prevPage => prevPage + 1);
    }, [hasMore]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore, handleScroll]);

    return (
        <div className="home">
            {posts.map(post => (
                <PostObject key={post.id} post={post} />
            ))}
        </div>
    );
};

export default FollowingPostsContainer;