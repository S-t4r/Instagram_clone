const ProfileStats = ({ postsCount, followersCount, followingsCount }) => {
    return (
        <div className='profile-details'>
            <p><span>{postsCount}</span> Posts</p>
            <p><span>{followersCount}</span> Followers</p>
            <p><span>{followingsCount}</span> Followings</p>
        </div>
    );
}

export default ProfileStats;