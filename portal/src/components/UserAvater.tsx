import { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { DataContext, DataContextType } from '../context/AuthProvider';

const UserAvater = () => {
    const { user, logOut } = useContext(DataContext) as DataContextType;
    const handleSignOut = () => {
        logOut();
        localStorage.removeItem('AccessToken');
        toast.success('You are logged out...')
    }
    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <img alt="User Avater Default" src={user.photoURL} className='w-10 h-10 border-2 border-primary rounded-full' />
            </div>
            <ul tabIndex={0} className="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                    <Link to='/dashboard' className="justify-between">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to='/profile' className="justify-between">
                        Profile
                        <span className="badge bg-primary text-white">New</span>
                    </Link>
                </li>
                <li><Link to='/'>Settings</Link></li>
                <li onClick={() => handleSignOut()} className='cursor-pointer'><Link to='/'>Logout</Link></li>
            </ul>
        </div>
    )
}

export default UserAvater