import Navbar from '../../layouts/Navbar/Navbar';
import LogInForm from '../../features/LogInForm';

export default function LogIn(props){
    return (
        <div>
            <Navbar fixed={false} showMenu={false}/>
            <div className="flex justify-center items-center mt-20 px-6">
                <LogInForm />
            </div>
        </div>
    );
}