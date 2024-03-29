import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { IoIosArrowDown, IoIosArrowUp, IoMdLogOut } from "react-icons/io";
import { Link } from 'react-router-dom';
import { DataContext, DataContextType } from '../context/AuthProvider';
import useUser from '../hooks/useUser';

const DashboardSidebar = () => {
    const [collapseUser, setCollapseUser] = useState(true);
    const [collapseDevice, setCollapsDevice] = useState(true);
    const { user, logOut } = useContext(DataContext) as DataContextType;
    //Get LoggedIn user from database
    const { loggedInUser } = useUser(user?.email);
    const handleSignOut = () => {
        logOut();
        localStorage.removeItem('AccessToken');
        toast.success('You are logged out...')
    }
    return (
        <div className='bg-gray-800 p-5 text-white rounded'>
            <ul className='flex flex-col gap-5'>
                <li><Link to='/dashboard'>Dashboard</Link></li>
                {/* Users dropdown */}
                <li className={`${loggedInUser.role !== 'admin' && 'hidden'}`}>
                    <div onClick={() => setCollapseUser(!collapseUser)} className='flex gap-2 items-center justify-between cursor-pointer'>
                        Users
                        <div>
                            {collapseUser ? <IoIosArrowDown /> : <IoIosArrowUp />}
                        </div>
                    </div>
                    <ul className={`${collapseUser && 'hidden'} ml-4`}>
                        <li className='border-l-2 border-primary my-2 pl-2 hover:bg-primary'><Link to='/dashboard/adduser'>Add User</Link></li>
                        <li className='border-l-2 border-primary my-2 pl-2 hover:bg-primary'><Link to='/dashboard/allusers'>All Users</Link></li>
                    </ul>
                </li>

                {/* Devices dropdown */}
                <li className={`${loggedInUser.role !== 'admin' && 'hidden'}`}>
                    <div onClick={() => setCollapsDevice(!collapseDevice)} className='flex gap-2 items-center justify-between cursor-pointer'>
                        Devices
                        <div>
                            {collapseDevice ? <IoIosArrowDown /> : <IoIosArrowUp />}
                        </div>
                    </div>
                    <ul className={`${collapseDevice && 'hidden'} ml-4`}>
                        <li className='border-l-2 border-primary my-2 pl-2 hover:bg-primary'><Link to='/dashboard/add-device'>Add Device</Link></li>
                        <li className='border-l-2 border-primary my-2 pl-2 hover:bg-primary'><Link to='/dashboard/all-device'>All Devices</Link></li>
                    </ul>
                </li>
                <li><Link to='/dashboard'>Activity</Link></li>
                <li><Link to='/dashboard'>Setting</Link></li>
                <li onClick={() => handleSignOut()} className='cursor-pointer flex gap-1 items-center hover:ml-2 duration-500'>Logout <IoMdLogOut className='text-primary w-5 h-5' /></li>
            </ul>
        </div>
    )
}

export default DashboardSidebar