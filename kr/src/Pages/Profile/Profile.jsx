import React from 'react';
import { useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HeaderComp from '../../Components/HeaderComp/HeaderComp'
import './Profile.css'


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
        <>
        <HeaderComp/>
        <div className='usernteamnames'>
            <Box sx={{ textAlign: 'center', display:'flex',width:'30em',alignContent:'center'}}>
                
                <Avatar
                    alt="User Avatar"
                    src={avatarUrl || '/placeholder-avatar.png'}
                    sx={{ width: 150, height: 150, margin: '0 auto' }}
                />
                <Typography variant="h6" sx={{ fontSize:'64px' ,alignContent:'center',color:'white'}}>
                    {currentUser.NickName}
                </Typography>
            </Box>
            <Box sx={{ textAlign: 'center',display:'flex',width:'30em',alignContent:'center',color:'white'}}>
                <Typography variant="h6" sx={{ fontSize:'64px' ,alignContent:'center'}}>
                    No Team
                </Typography>
                <Avatar
                    alt="User Avatar"
                    src={'/placeholder-avatar.png'}
                    sx={{ width: 150, height: 150, margin: '0 auto' }}
                />
            </Box>
        </div>
        <div>
            
        </div>
        </>
    );
}


export default Profile;
