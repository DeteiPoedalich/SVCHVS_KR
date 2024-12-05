import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import HeaderComp from '../../Components/HeaderComp/HeaderComp';
import { update } from "../../http/userAPI"; // Импорт функции API
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

    // const handleAvatarChange = (event) => {
    //     const file = event.target.files;
    //     if (file) {
    //         console.log(file.name)
            
    //             setAvatar(file);
    //            // обновляем аватар в состоянии
            
    //         //console.log(reader.readAsDataURL(file))
    //     }
    // };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar({ ...avatar, avatar: file});
        } else {
            alert("Пожалуйста, загрузите файл формата PDF.");
        }
    };
    
    // const handleSave = async () => {
    //     console.log(avatar)
    //     setIsLoading(true);
    //     try {
    //         const updatedUser = await update(currentUser.UserId,nickName, avatar);
    //         console.log('Updated User:', updatedUser);
    //         alert('Profile updated successfully!');
    //         setIsEditing(false);
    //     } catch (error) {
    //         console.error('Error updating profile:', error);
    //         alert(error.message || 'Failed to update profile. Please try again.');
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const handleSave = async (e) => {
        e.preventDefault();
        
        if (!avatar.avatar) {
            alert("Please upload your diploma.");
            return;
        }

        // if (!currentUser || !currentUser.userId) {
        //     alert("You must be logged in to become a coach.");
        //     return; // Prevent further execution
        // }

        setIsLoading(true); // Set loading state

        try {
            
            const userData = new FormData();
            userData.append('avatar', avatar.avatar.name);
            console.log(avatar.avatar)

            // Update Redux store after successful API call
            await update(currentUser.UserId, avatar);

        } catch (error) {
            console.error('Error registering:', error);
            alert('Registration failed. Please try again.');
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    // Conditionally render the form
    if (!currentUser) {
        return <div>Loading...</div>; // Or a more informative message
    }


    return (
        <>
            <HeaderComp />
            <div className='usernteamnames'>
                <Box sx={{ textAlign: 'center', display: 'flex', width: '30em', alignContent: 'center' }}>
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
                            sx={{ fontSize: '32px', alignContent: 'center', color: 'white', ml: 2 }}
                        />
                    ) : (
                        <Typography variant="h6" sx={{ fontSize: '64px', alignContent: 'center', color: 'white', ml: 2 }}>
                            {nickName}
                        </Typography>
                    )}
                </Box>
                <Box sx={{ textAlign: 'center', display: 'flex', width: '30em', alignContent: 'center', color: 'white', mt: 2 }}>
                    {isEditing && (
                        <Button
                            variant="contained"
                            component="label"
                            sx={{ marginRight: 2 }}
                        >
                            Change Avatar
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        disabled={isLoading} // Блокируем кнопку при загрузке
                        onClick={isEditing ? handleSave : () => setIsEditing(true)}
                    >
                        {isEditing ? (isLoading ? 'Saving...' : 'Save') : 'Edit'}
                    </Button>
                </Box>
            </div>
        </>
    );
}

export default Profile;
