import '../HeaderComp/Header.css';
import Search from "../../MUI components/Search.jsx"
import Account from "../../MUI components/Account.jsx"
import { Link } from 'react-router-dom';

export default function  HeaderComp(){    
    return(
        <header>
            <Link className='headerName' to ="/"><img  src="http://localhost:5000/D2H.png" alt="" /></Link>               
                <div className='Header_div'>
                    <Search/>
                    <Account/>              
                </div>
            </header>
    )
}