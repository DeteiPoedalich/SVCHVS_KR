import { Box } from "@mui/material"

export default function TeamsComp(){
    const aga=[1,2,3,4,5,6,7,8]
    return(
        <Box sx={{width:"100%",display:"flex",justifyContent:'center',flexWrap:"wrap",mt:5,mb:5}}>
            {aga.map(ag=>(
                <Box sx={{width:"350px",height:"350px",display:"flex",flexDirection:"column",justifyContent:'center',alignItems:"center"}}>
                    <img style={{width:'70%',height:"70%",borderRadius:"15px"}} src="http://localhost:5000/nivea.jpg" alt={ag} />
                    <p style={{fontSize:24}}>Team {ag}</p>
                </Box>
            ))}   
            
        </Box>
    )
}