import { useContext, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import { Link } from 'react-router-dom';
import { DataContext, DataContextType } from '../context/AuthProvider';
import toast from 'react-hot-toast';

const DashboardSidebar = () => {
    const [collapseUser, setCollapseUser] = useState(true);
    const [collapseDevice, setCollapsDevice] = useState(true);
    const { user, logOut } = useContext(DataContext) as DataContextType;
    const handleSignOut = () => {
        logOut();
        toast.success('You are logged out...')
    }
    return (
        <div className='bg-gray-800 p-5 text-white rounded'>
            <ul className='flex flex-col gap-5'>
                <li><Link to='/dashboard'>Dashboard</Link></li>
                {/* Users dropdown */}
                <li className='flex gap-2 items-center justify-between cursor-pointer' onClick={() => setCollapseUser(!collapseUser)}>
                    Users
                    <div>
                        {collapseUser ? <IoIosArrowDown /> : <IoIosArrowUp />}
                    </div>
                </li>
                <ul className={`${collapseUser && 'hidden'} ml-4`}>
                    <li className='border-l-2 border-primary my-2 pl-2 hover:bg-primary'><Link to='/dashboard/adduser'>Add User</Link></li>
                    <li className='border-l-2 border-primary my-2 pl-2 hover:bg-primary'><Link to='/dashboard/allusers'>All Users</Link></li>
                </ul>
                {/* Devices dropdown */}
                <li className='flex gap-2 items-center justify-between cursor-pointer' onClick={() => setCollapsDevice(!collapseDevice)}>
                    Devices
                    <div>
                        {collapseDevice ? <IoIosArrowDown /> : <IoIosArrowUp />}
                    </div>
                </li>
                <ul className={`${collapseDevice && 'hidden'} ml-4`}>
                    <li className='border-l-2 border-primary my-2 pl-2 hover:bg-primary'><Link to='/dashboard/add-device'>Add Device</Link></li>
                    <li className='border-l-2 border-primary my-2 pl-2 hover:bg-primary'><Link to='/dashboard/all-device'>All Devices</Link></li>
                </ul>
                <li onClick={() => handleSignOut()} className='cursor-pointer flex gap-1 items-center hover:ml-2 duration-500'>Logout <IoMdLogOut className='text-primary w-5 h-5' /></li>
            </ul>
        </div>
    )
}

export default DashboardSidebar