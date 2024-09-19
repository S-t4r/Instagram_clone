import { useState } from 'react';
import { calcTime } from '../utils';
import PostHeader from './PostHeader';
import PostCaption from './PostCaption';
import PostComment from './PostComment';
import './Posts.css'
import PostLike from './PostLike';

export default function PostObject({ post }) {
    // To edit
    const [isEditing, setIsEditing] = useState(false);
    const [caption, setCaption] = useState(post.caption);
    
    return (
        <div className='postObject' id={`post-${post.id}`}>
            <PostHeader 
                post={post} 
                isEditing={isEditing}
                setIsEditing={setIsEditing}
            />

            <img src={`${post.post_image}`} className='post-image' alt="Post" />

            <PostCaption 
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                caption={caption} 
                setCaption={setCaption} 
                postId={post.id}
            />
            <sub>{calcTime({ timestamp:post.timestamp })}</sub>
            <PostLike />

            <PostComment postId={post.id} />
            
        </div>
    );
}