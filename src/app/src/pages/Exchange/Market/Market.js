import PairList from "../../../features/PairList";

function Market(){
    return(
        <div className="grid grid-cols-6 grid-rows-1">
            <PairList className="col-span-full md:col-start-2 md:col-span-4"/>
        </div>
    );
}

export default Market;