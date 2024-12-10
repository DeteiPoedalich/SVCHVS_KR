import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HeroIcon from "../HeroIcon/HeroIcon";
import { fetchHeroById } from "../../http/heroesAPI";
import "./MatchInProf.css"

function MatchInprof({ match }) {
    const [hero, setHero] = useState(null); // Initialize hero as null

    useEffect(() => {
        const fetchHero = async () => {
            try {
                if (match && match.HeroId) { // Check if match and HeroId exist
                    const loadedHero = await fetchHeroById(match.HeroId);
                    setHero(loadedHero);
                }
            } catch (error) {
                console.error("Error fetching hero:", error);
            }
        };

        fetchHero();
    }, [match]); // match is the dependency

    if (!hero) { // Conditionally render HeroIcon
      return <div>Loading hero...</div>;
    }

    let imgUrl=`http://localhost:5000/${hero.HeroImg}`
    return (
        <Box key={match.id} sx={{ p: 2, width: '70em', backgroundColor:"darkgray",alignItems:"center",display:"flex",justifyContent:'flex-start' }}>
            <Box sx={{display:"flex",gap:"20em"}}>
            <Box sx={{alignItems:"center",display:"flex",gap:"2em"}}>
                <img className='heroimg' src={imgUrl} alt="" />
                <Typography sx={{fontSize:40}}>
                    {hero.HeroName}
                </Typography>
            </Box>
            <Typography sx={{fontSize:40}}>
                Result: Won
            </Typography>
        </Box>
        </Box>
    );
}

export default MatchInprof;