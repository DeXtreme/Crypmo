import  Navbar from "../../layouts/Navbar/Navbar";
import RegisterForm from "../../features/RegisterForm";

export default function Register(props){
    return (
        <>
            <Navbar showMenu={false} fixed={false}/>
            <div className="grid grid-cols-6 grid-rows-1">
                <RegisterForm className="col-span-full 
                md:col-start-2 md:col-span-4 
                lg:col-start-2 lg:col-span-2 mt-10"/>
            </div>
        </>
    );
}