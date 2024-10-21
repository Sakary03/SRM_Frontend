import React, { useEffect, useState } from 'react';

const UserAvatar = ({ filename }) => {
    const [avatarUrl, setAvatarUrl] = useState("");

    useEffect(() => {
        const fetchAvatar = async () => {
            const response = await fetch(`/api/avatar/${filename}`);
            if (response.ok) {
                const url = URL.createObjectURL(await response.blob()); // Tạo URL cho file blob
                setAvatarUrl(url);
            } else {
                console.error('Error fetching avatar:', response.statusText);
            }
        };

        fetchAvatar();
    }, [filename]);

    return <img id="userAvatar" src={avatarUrl} alt="User Avatar" />;
};

export default UserAvatar;
