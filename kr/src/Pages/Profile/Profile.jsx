import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import HeaderComp from '../../Components/HeaderComp/HeaderComp';
import { update } from "../../http/userAPI"; // Импорт функции API
import GetTeamsinProf from '../../Components/GetTeamsInProf/GetTeamsInProf';
import GetMatchesinProf from '../../Components/GetMatchesInProf/GetMatchesInProf';
import './Profile.css';

function Profile() {
    const location = useLocation();
    const { avatarUrl, isLoggedIn, currentUser } = location.state || {};
    
    const [nickName, setNickName] = useState(currentUser?.NickName || '');
    const [avatar, setAvatar] = useState(avatarUrl || '/placeholder-avatar.png');
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    

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
    
    const handleSave = async () => {
        console.log(avatar)
        setIsLoading(true);
        try {
            const updatedUser = await update(currentUser.UserId,nickName, avatar);
            console.log('Updated User:', updatedUser);
            console.log(nickName)
            alert('Profile updated successfully!');
            setIsEditing(false);
            
        } catch (error) {
            console.error('Error updating profile:', error);
            alert(error.message || 'Failed to update profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!currentUser) {
        return <div>Loading...</div>; // Or a more informative message
    }

    return (
        <>
            <HeaderComp />
            <div className='usernteamnames'>
                <Box sx={{ textAlign: 'center', display: 'flex', width: '30em', alignContent: 'center',ml:7 }}>
                    <Avatar
                        alt="User Avatar"
                        src={avatar}
                        sx={{ width: 150, height: 150, margin: '0 auto' }}
                    />
                    {isEditing ? (
                        <TextField
                            value={nickName}
                            onChange={(e) => setNickName(e.target.value)}
                            variant="outlined"
                            sx={{ fontSize: '64px', alignContent: 'center', color: 'white',justifyContent:'center',width:'3em' }}
                        />
                    ) : (
                        <Typography variant="h6" sx={{ fontSize: '64px', alignContent: 'center', color: 'white', ml: 2 }}>
                            {nickName}
                        </Typography>
                    )}
                    <Button
                        variant="contained"
                        disabled={isLoading} // Блокируем кнопку при загрузке
                        onClick={isEditing ? handleSave : () => setIsEditing(true)}
                        sx={{ textAlign: 'center', display: 'flex', width: '2em', alignSelf: 'flex-end', color: 'white',mb:2,backgroundColor:"rgb(70,70,70)"}}
                    >
                        {isEditing ? (isLoading ? 'Saving...' : 'Save') : 'Edit'}
                    </Button>
                </Box>
                <Box sx={{ textAlign: 'center', display: 'flex', width: '30em', alignContent: 'center' }}>
                    <Typography variant="h6" sx={{ fontSize: '64px', alignContent: 'center', color: 'white', ml: 2 }}>
                        Nivea
                    </Typography>
                    <Avatar
                        alt="Team Avatar"
                        src="http://localhost:5000/nivea.jpg"
                        sx={{ width: 150, height: 150, margin: '0 auto' }}
                    />
                </Box>
            </div>
            <Box sx={{display:"flex"}}>
                <GetTeamsinProf userId={currentUser.UserId}/>
                <GetMatchesinProf userId={currentUser.UserId}/>
            </Box>
        
        </>
    );
}

export default Profile;
