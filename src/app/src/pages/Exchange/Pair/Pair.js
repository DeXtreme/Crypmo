import { useParams } from "react-router";
import PairDetails from "../../../features/PairDetails";

export default function Pair(){
    const params = useParams();
    const ticker = params.ticker;
    
    return(
        <div>
            <PairDetails ticker={ticker} />
        </div>
    );
}