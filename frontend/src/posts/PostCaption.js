import getCSRFToken from '../utils';

export default function PostCaption({ postId, isEditing, setIsEditing, caption, setCaption }) {
    const csrfToken = getCSRFToken();
    
    // Edit Post
    const handleChanges = () => {
        const formData = new FormData();
        formData.append('caption', caption)
        formData.append('post_id', postId)
        fetch('/posts/edit/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
            },
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response data
            setIsEditing(!isEditing);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <>
            {isEditing ? (
                <div className='edit-post'>
                    <textarea value={caption} onChange={(e) => setCaption(e.target.value)} />
                    <div>
                        <button onClick={handleChanges}>Edit</button>
                        <button onClick={() => setIsEditing(!isEditing)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <p>{caption}</p>
            )}
        </>
    )
}