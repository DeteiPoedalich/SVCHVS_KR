import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getUsersByTeam } from '../../http/userAPI'; // New API function
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

export default function TeamComp(props) {
    const location = useLocation();
    const { TeamId } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [teamMembers, setTeamMembers] = useState([]);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null); // Store user data in component state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const members = await getUsersByTeam({ where: { CurrentTeamId: TeamId } }); // Pass where clause to getUsers
                setTeamMembers(members);
            } catch (err) {
                console.error("Error fetching team members:", err);
                // ... error handling
            } 
        };
        fetchTeamMembers();
    }, [TeamId]);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accessToken = localStorage.getItem('token');
                if (!accessToken) {
                    // Handle case where accessToken is not available (redirect to login)
                    return;
                }
                let userId;
                try {
                    const decodedToken = jwtDecode(accessToken);
                    userId = decodedToken.UserId;
                    console.log(userId); // Or however UserId is stored in your JWT
                } catch (decodeError) {
                    console.error("Error decoding access token:", decodeError);
                    // Handle invalid token (e.g., redirect to login, refresh token)
                    return;
                }
                if (!userId) {
                    console.error("UserId not found in token");// Or handle the error appropriately
                    return;
                }
                const response = await fetch(`http://localhost:5000/api/user/profile/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                console.log(response);
                

                if (!response.ok) {
                    if (response.status === 401) {// Redirect to login if unauthorized
                        return;
                    } else if (response.status === 404) {
                        console.error("User not found"); // Handle user not found error
                        setError("User not found");
                        return;
                    }
                    throw new Error(`HTTP error ${response.status}`);
                }

                const userData = await response.json();
                setUser(userData);

            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Failed to fetch user data"); // Set error state
            }
        };
        fetchUserData();
    }, [])
    const handleJoinTeam = async () => {
        const accessToken = localStorage.getItem('token');
        if (user && (user.CurrentTeamId === null || user.CurrentTeamId !== parseInt(TeamId, 10))) {
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/api/user/jointeam/${user.UserId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`, // Include Authorization header
                    },
                    body: JSON.stringify({ teamId: parseInt(TeamId, 10) }),
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Failed to join team");
                }
    
                const updatedUser = await response.json(); // Get updated user data
                setUser(updatedUser.user); // Update the user state with the data from the server
                navigate(0); // Refresh the page
    
            } catch (error) {
                console.error("Error joining team:", error);
                setError("Failed to join team.");
            } finally {
                setIsLoading(false);
            }
        }
    };
    console.log(user)

    return (
    <Box sx={{display:"flex",flexDirection:"column",gap:"3em",alignItems:"center"}}>
        <Box sx={{width:"100%"}}>
            <Box sx={{ textAlign: 'center', display: 'flex', width: '30em', alignContent: 'center',ml:7 }}>
                <Avatar
                    alt="User Avatar"
                    src={props.team && props.team.TeamImg ? `http://localhost:5000/${props.team.TeamImg}` : 'http://localhost:5000/nivea.jpg'}
                    sx={{ width: 150, height: 150, margin: '0 auto' }}
                />

                    <Typography variant="h6" sx={{ fontSize: '64px', alignContent: 'center', color: 'white', ml: 2 }}>
                        {props.team.TeamName}
                    </Typography>
            </Box>
            
        </Box>
        <Box sx={{width:"40%",display:"flex",flexDirection:'column',alignItems:"center"}}>
            <Typography sx={{fontSize:48}}>
                Team Members
            </Typography>
            <Box sx={{display:"flex",gap:"2em",flexWrap:"wrap",justifyContent:"center"}}> 
                {teamMembers.map(member => ( 
                      
                    <Box sx={{display:"flex",alignItems:"center",gap:"1em"}} key={member.UserId} >
                        <Avatar sx={{width:"4em",height:"auto"}}>
                            <img alt={member.NickName} src={`http://localhost:5000/sema.jpg`} />
                        </Avatar>
                        <Typography sx={{fontSize:36}}  >{member.NickName}</Typography>
                    </Box>            
                ))}
                {user && (user.CurrentTeamId === null || user.CurrentTeamId !== parseInt(TeamId, 10)) && ( // Conditionally render button
                    <Button onClick={handleJoinTeam} disabled={isLoading} sx={{ width: "20%" }}>
                        {isLoading ? "Joining..." : "Join Team"}
                    </Button>
                )}
            </Box>
        </Box>
    </Box>    
    );
}