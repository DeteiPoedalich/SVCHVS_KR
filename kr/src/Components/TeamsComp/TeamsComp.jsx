import { Box } from "@mui/material";
import { fetchTeams } from "../../http/teamsAPI";
import { useState, useEffect } from "react";

export default function TeamsComp() {
    const [teams, setTeams] = useState([]); // Initialize as an empty array

    useEffect(() => {
        const loadTeams = async () => {
            try {
                const loadedTeams = await fetchTeams();
                setTeams(loadedTeams);
            } catch (error) {
                console.error("Error fetching teams:", error);
                // Consider setting an error state for display to the user
                setTeams([]); // Set to empty array if there's an error
            }
        };

        loadTeams();
    }, []); // Empty dependency array ensures this runs only once on mount

    if (teams.length === 0) { // Check if the teams array is empty
        return <div>Loading teams... or No teams found</div>; // More informative message
    }

    return (
        <Box sx={{
            width: "100%",
            display: "flex",
            justifyContent: 'center', // Add some gap between team boxes
        }}>
        <Box sx={{
            width: "80%",
            display: "flex",
            justifyContent: 'center',
            flexWrap: "wrap",
            mt: 5,
            mb: 5,
            gap: 2 // Add some gap between team boxes
        }}>
            {teams.map(team => (
                <Box key={team.TeamId} sx={{ // Add key prop for efficient rendering
                    width: "300px",
                    height: "300px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: 'center',
                    alignItems: "center",
                }}>
                    <img
                        style={{ width: '70%', height: "70%", borderRadius: "15px" }}
                        src={team.TeamImg ? `http://localhost:5000/${team.TeamImg}` : `http://localhost:5000/nivea.jpg`}
                        alt={team.TeamName}
                    />
                    <p style={{ fontSize: 24 }}>{team.TeamName}</p>
                </Box>
            ))}
        </Box>
        </Box>
    );
}