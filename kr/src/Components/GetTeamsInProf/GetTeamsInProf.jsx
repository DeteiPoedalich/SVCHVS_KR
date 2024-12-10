import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function GetTeamsinProf() {
    const location = useLocation();
    const { avatarUrl, isLoggedIn, currentUser } = location.state || {};
    const { userId } = useParams(); // Get userId from route parameters
    const [user, setUser] = useState(null);
    const [teamIds, setTeamIds] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Start in loading state


    useEffect(() => {  // Use useEffect to fetch user data only once
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/profile/${userId}`); // Correct URL construction
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setUser(data);
            } catch (err) {
                console.error('Error fetching user:', err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [userId]); // Add userId as a dependency


    useEffect(() => { // Use another useEffect for GetTeams, dependent on user data
        const getTeams = async () => {
            if (user && user.TeamList) { // Check if user and TeamList exist
                try {
                    const array = user.TeamList.split(" ").map(Number); // Convert to numbers
                    setTeamIds(array);

                } catch (err) {
                    console.error('Error processing TeamList:', err.message);
                    setTeamIds([]); // Set to empty array on error
                }
            }
        };

        getTeams();
    }, [user]); // Add user as a dependency



    if (!isLoggedIn) {
        return (
            <Box sx={{ textAlign: 'center', mt: 5 }}>
                <Typography variant="h6">You are not logged in.</Typography>
            </Box>
        );
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }
    let aga=[1,2,3]
// ,borderRight:'1px solid rgb(109, 0, 0)',borderBottom:'1px solid rgb(109, 0, 0)'
    return (
        <Box sx={{pt:5,pl:5,width:'25em',height:'70%'}}>
            <Typography variant="h6" sx={{ fontSize: '36px', alignContent: 'center', color: 'white', ml: 2 }}>
                Teams played in
            </Typography>
            {aga.map((teamId) => (
                <Box key={teamId} sx={{ textAlign: 'center', display: 'flex', width: '20em', alignContent: 'center', mt:2,mb:2}}>
                    <Avatar
                        alt="Team Avatar"
                        src="http://localhost:5000/nivea.jpg" // Replace with actual avatar URL
                        sx={{ width: 100, height: 100, margin: '0 auto' }}
                    />
                    <Typography variant="h6" sx={{ fontSize: '36px', alignContent: 'center', color: 'white', ml: 2 }}>
                        {/* Replace with actual team name */}
                        Team {teamId} 
                    </Typography>
                </Box>
            ))}
        </Box>
    );
}

export default GetTeamsinProf;