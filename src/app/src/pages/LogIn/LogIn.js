import Navbar from '../../layouts/Navbar/Navbar';
import LogInForm from '../../features/LogInForm';

export function LogIn(props){
    return (
        <div>
            <Navbar fixed={false} showMenu={false}/>
            <LogInForm />
        </div>
    );
}