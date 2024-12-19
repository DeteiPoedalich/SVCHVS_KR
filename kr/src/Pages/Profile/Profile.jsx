import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import HeaderComp from '../../Components/HeaderComp/HeaderComp';
import { update } from "../../http/userAPI";
import GetTeamsinProf from '../../Components/GetTeamsInProf/GetTeamsInProf';
import GetMatchesinProf from '../../Components/GetMatchesInProf/GetMatchesInProf';
import './Profile.css';
import Footer from '../../Components/Footer/Footer';
import { fetchTeam } from '../../http/teamsAPI';
import { Link } from 'react-router-dom';

function Profile() {
    const location = useLocation();
    const { avatarUrl, isLoggedIn, currentUser } = location.state || {};
    const navigate = useNavigate();
    const [nickName, setNickName] = useState(currentUser?.NickName || '');
    const [avatar, setAvatar] = useState(avatarUrl || '/placeholder-avatar.png');
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [team, setTeam] = useState(null);  // Initialize as null
    const [teamLoading, setTeamLoading] = useState(true); // Loading state for team
    const handleViewAllUsers = () => {
        navigate('/viewusers'); // Navigate to the users page
    };
    useEffect(() => {
        let isMounted = true; // Flag to prevent state updates after unmount
        if (currentUser && currentUser.CurrentTeamId) {
            setTeamLoading(true); // Set loading to true before fetching
            const fetchTeamDetails = async () => {
                try {
                    const fetchedTeam = await fetchTeam(currentUser.CurrentTeamId);
                    if (isMounted) { // Check if component is still mounted
                        setTeam(fetchedTeam);
                        setTeamLoading(false); // Set loading to false after fetching
                    }
                } catch (error) {
                    console.error("Error fetching team details:", error);
                    if (isMounted) {
                        setTeam(null);
                        setTeamLoading(false);
                    }
                }
            };
            fetchTeamDetails();
        } else {
            // If no CurrentTeamId, set loading to false and team to null
            setTeamLoading(false);
            setTeam(null);
        }
        return () => { isMounted = false; }; // Cleanup function
    }, [currentUser]);

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const updatedUser = await update(currentUser.UserId,nickName, avatar);
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
                <Box sx={{ textAlign: 'center', display: 'flex',width:"auto", alignContent: 'center',mr:5 }}>
                {teamLoading ? ( // Show loading message while fetching
                    <Typography variant="h6" sx={{ fontSize: '64px', color: 'white', ml: 2 }}>
                        Loading Team...
                    </Typography>
                ) : team ? ( // Show team details if team is fetched
                    <Link to={`/teams/${team.TeamId}`}>
                    <Box sx={{display:"flex", gap:"2em",width:"auto"}}>
                        <Typography variant="h6" sx={{ fontSize: '64px', color: 'white', ml: 2 ,display:'flex',alignItems:'center'}}>
                            {team.TeamName}
                        </Typography>
                        <Avatar
                            alt="Team Avatar"
                            src={process.env.REACT_APP_API_URL+`${team.TeamImg}` || process.env.REACT_APP_API_URL+"nivea.jpg"}
                            sx={{ width: 150, height: 150, margin: '0 auto' }}
                        />
                        </Box>
                    </Link>
                    
                ) : ( // Show "No Team" if team is null
                    <Typography variant="h6" sx={{ fontSize: '64px', color: 'white', ml: 2 }}>
                        No Team
                    </Typography>
                )}
            </Box>           
            </div>
            <Box sx={{display:"flex"}}>
                <GetTeamsinProf userId={currentUser.UserId}/>
                <GetMatchesinProf userId={currentUser.UserId}/>
            </Box>
             {currentUser && currentUser.role == 'ADMIN' && ( // Conditionally render the button
                <Button sx={{width:"10em",alignSelf:"end",mr:5,backgroundColor:"rgb(41,41,41)"}} variant="contained" onClick={handleViewAllUsers}>
                    View All Users
                </Button>
            )}
        <Footer/>
        </>
    );
}

export default Profile;