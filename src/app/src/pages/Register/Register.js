import  Navbar from "../../layouts/Navbar/Navbar";
import RegisterForm from "../../features/RegisterForm/RegisterForm";

export function Register(props){
    return (
        <>
            <Navbar showMenu={false} fixed={false}/>
            <div className="grid grid-cols-6 grid-rows-1">
                <RegisterForm className="col-start-2 col-span-2 row-start-2 mt-10"/>
            </div>
        </>
    );
}