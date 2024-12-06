import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { update } from "../../http/userAPI"; // Импорт функции API

function GetTeamsinProf({userId}) {
    const location = useLocation();
    const { avatarUrl, isLoggedIn, currentUser } = location.state || {};
    
    const [teamName, setTeamName] = useState();
    const [avatar, setAvatar] = useState(avatarUrl || '/placeholder-avatar.png');
    const [user, SetUser] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [TeamsId,setTeamIds]=useState([])
    

    if (!isLoggedIn) {
        return (
            <Box sx={{ textAlign: 'center', mt: 5 }}>
                <Typography variant="h6">You are not logged in.</Typography>
            </Box>
        );
    }

    if (!currentUser) {
        return <div>Loading...</div>; // Or a more informative message
    }
    const fetchUser = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/profile/:${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();               
            SetUser(data);
            console.log(data)
        } catch (err) {
            console.error('Error fetching user:', err.message);
        } finally {
            setIsLoading(false);
        }
    };
    fetchUser()
    const GetTeams=async()=>{
        try {
            let array=[]
            array=parseInt(user.TeamList.Split(" "))
            setTeamIds(array)
        } catch (err) {
            console.error('Error fetching facets:', err.message);
        } finally {
            setIsLoading(false);
        }
    }
    GetTeams()
    return (
        <>
           <Box>
           { 
                TeamsId.map(TeamId => (
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
                ))
            
            }
           </Box>
        </>
    );
}

export default GetTeamsinProf;
