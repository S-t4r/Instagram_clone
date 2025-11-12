import { QRCodeSVG } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

const Share = () => {
    const navigate = useNavigate();
    const url = new URL(window.location.href);
    const profilePath = url.href.replace('share/', '');
    const pathname = url.pathname.replace('share/', '');
    
    return (
        <div className='profile-share'>
            <h1>
                <a href={profilePath} onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(profilePath); alert('Link Copied!')}}>
                    Share Profile
                </a>
            </h1>
            <p>
                <QRCodeSVG value={profilePath} size={200} />
            </p>
            <div>
                <p className="url-display">
                    {profilePath}
                </p>
                <a href={profilePath} onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(profilePath); alert('Link Copied!')}}>
                    Copy Link
                </a>
            </div>
            <a href={profilePath} onClick={(e) => { e.preventDefault(); navigate(pathname); }}>
                ← Back to Profile
            </a>
        </div>
    );
};

export default Share;
