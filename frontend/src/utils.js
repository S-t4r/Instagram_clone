import { useNavigate } from 'react-router-dom';

const getCSRFToken = () => {
    let csrfToken = null;
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'csrftoken') {
            csrfToken = value;
            break;
        }
    }
    return csrfToken;
};


export const useCustomNavigate = () => {
    const navigate = useNavigate();
    return (path) => navigate(path);
};

export function calcTime({ timestamp }) {

    const postDate = new Date(timestamp);
    const now = new Date()
    
    // Calculate difference in minutes
    const diffInMs = now - postDate;
    
    // Convert to minutes, hours, and days
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    let timePassed;
    if (diffInMinutes < 60) {
        timePassed = `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
        timePassed = `${diffInHours} hours ago`;
    } else {
        timePassed = `${diffInDays} days ago`;
    }
    return timePassed;
}

export default getCSRFToken