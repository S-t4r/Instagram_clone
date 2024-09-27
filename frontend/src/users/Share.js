import { QRCodeSVG } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

const Share = () => {
    const navigate = useNavigate();
    const url = new URL(window.location.href);
    const profilePath = url.href.replace('share/', '');
    const pathname = url.pathname.replace('share/', '');
    
    return (
        <div className='profile-share'>
            <p><QRCodeSVG value={profilePath} /></p>
            <h1>
                <a href={profilePath} onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(profilePath); alert('Link Copied!')}}>
                    Share
                </a>
            </h1>
            <a href={profilePath} onClick={(e) => { e.preventDefault(); navigate(pathname); }}>
                Back to Profile
            </a>
        </div>
    );
};

export default Share;
