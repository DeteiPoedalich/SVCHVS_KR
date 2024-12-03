import React from 'react';
import { useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


function Profile() {
    
    const location = useLocation();
    const { avatarUrl, isLoggedIn, currentUser } = location.state || {};

    if (!isLoggedIn) {
        return (
            <Box sx={{ textAlign: 'center', mt: 5 }}>
                <Typography variant="h6">You are not logged in.</Typography>
            </Box>
        );
    }

    if (!currentUser) {
        return (
            <Box sx={{ textAlign: 'center', mt: 5 }}>
                <Typography variant="h6">Loading user information...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Avatar
                alt="User Avatar"
                src={avatarUrl || '/placeholder-avatar.png'}
                sx={{ width: 100, height: 100, margin: '0 auto' }}
            />
            <Typography variant="h6" sx={{ mt: 2 }}>
                {currentUser.NickName}
            </Typography>
        </Box>
    );
}


export default Profile;
