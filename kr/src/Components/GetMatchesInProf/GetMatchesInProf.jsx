import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { fetchPIM } from '../../http/pimAPI';
import MatchInprof from '../MatchInprof/MatchInProf';
import { Link } from 'react-router-dom'

function GetMatchesinProf(userId) { // Correctly use useParams
    const [matches, setMatches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    console.log(userId.userId)
    useEffect(() => {
        const fetchMatches = async () => {
            try {
                if (!userId) {
                    console.error("userId is undefined. Cannot fetch matches.");
                    setIsLoading(false); // Set loading to false even if userId is undefined
                    return;
                }
                const playerMatches = await fetchPIM(userId.userId); // Use userId directly
                setMatches(playerMatches);
            } catch (error) {
                console.error("Error fetching matches:", error);
                setMatches([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMatches(); // Call fetchMatches unconditionally (but handle undefined userId inside)

    }, [userId]); // userId is the dependency, not userId.userId

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!matches || matches.length === 0) { // Check if matches is empty
        return <div>No matches found.</div>;
    }

    return (
        <Box sx={{ pt: 5, pl: 5, width: '70%',borderLeft:"1px solid rgb(109, 0, 0)",display:"flex",flexDirection:"column",alignItems:"center",gap:'3em' }}>
            {matches.map((match, index) => ( // Add index as key if id is not available
            <Link to={`/match/${match.MatchMatchId}`}>
                <MatchInprof key={match.id || index} match={match} />
            </Link> 
            ))}
        </Box>
    );
}

export default GetMatchesinProf;