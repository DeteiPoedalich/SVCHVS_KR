import HeaderComp from "../../Components/HeaderComp/HeaderComp";
import MatchInfo from "../../Components/MatchInfo/MatchInfo";
import { useParams } from 'react-router-dom'; // Import useParams

function Match() {
    const { matchId } = useParams();
    console.log(matchId)
    return(
        <>
            <HeaderComp/>
            <MatchInfo/>
        </>
    )
}
export default Match