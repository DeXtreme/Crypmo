import PairList from "../../../features/PairList";

function Market(){
    return(
        <div className="pt-28 grid grid-cols-5 grid-rows-1">
            <PairList className="col-span-full md:col-start-2 md:col-span-3"/>
        </div>
    );
}

export default Market;