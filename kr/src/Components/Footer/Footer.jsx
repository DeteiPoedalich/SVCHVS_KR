import '../HeaderComp/Header.css';
import Search from "../../MUI components/Search.jsx"
import { Link } from 'react-router-dom';
import Asd from '../../MUI components/as.jsx'
import { Box } from '@mui/material';

export default function  Footer(){    
    const tg="http://localhost:5000/tg.png"
    const gh="http://localhost:5000/github.png"
    return(
        <footer>
            <Box sx={{display:"flex",alignItems:"center"}}>
                <img src={tg} alt="" />
                <Link style={{color:"white",marginLeft:"1em",fontSize:"24px",fontWeight:"500"}}>Telegram</Link>
            </Box>
            <Box sx={{display:"flex",alignItems:"center",color:"white"}}>
                <img src={gh} alt="" />            
                <Link style={{color:"white",marginLeft:"1em",fontSize:"24px",fontWeight:"500"}}>Github</Link>
            </Box>
        </footer>
    )
}