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

export default getCSRFToken