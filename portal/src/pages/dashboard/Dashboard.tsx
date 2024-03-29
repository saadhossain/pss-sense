import { useContext, useEffect, useState } from 'react';
import { FaLightbulb, FaRegLightbulb, FaUserShield, FaUsers } from "react-icons/fa6";
import { DataContext, DataContextType } from '../../context/AuthProvider';
import { UserInfoType } from '../../types/UserType';
import useUser from '../../hooks/useUser';

const Dashboard = () => {
  //Get logged in User from the data context
  const { user } = useContext(DataContext) as DataContextType;
  //Get User Access Token
  const accessToken = localStorage.getItem('AccessToken');
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch('https://pss-sense-apis.vercel.app/users', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      })
      const data = await res.json();
      setUsers(data);
      console.log(data);
      const adminUsers = data.filter((userData: UserInfoType) => userData.role === 'admin');
      setAdmins(adminUsers);
    }
    getUsers();
  }, []);
  //Get loggedIn user
  const {loggedInUser} = useUser(user?.email);
  return (
    <div>
      <h2 className='text-xl md:text-2xl font-semibold my-2 md:my-5 border-l-4 border-primary pl-2 ml-3 md:ml-0'>At a Glance</h2>
      <div className='grid grid-cols-3 gap-20'>
        {/* Device Card */}
        <div className='bg-gray-800 p-5 rounded-lg text-white w-72'>
          <h3 className='text-xl font-semibold border-b-2 border-accent mb-5 pb-2'>Devices</h3>
          <div className='flex flex-col gap-5'>
            <div className='flex justify-between items-center'>
              <div className='flex gap-1 items-center'>
                <FaLightbulb />Active
              </div>
              <span>5</span>
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex gap-1 items-center'>
                <FaRegLightbulb />Inactive
              </div>
              <span>3</span>
            </div>
          </div>
        </div>
        {/* Users Card */}
        <div className={`bg-gray-800 p-5 rounded-lg text-white w-72 ${loggedInUser.role !== 'admin' && 'hidden'}`}>
          <h3 className='text-xl font-semibold border-b-2 border-accent mb-5 pb-2'>Users</h3>
          <div className='flex flex-col gap-5'>
            <div className='flex justify-between items-center'>
              <div className='flex gap-1 items-center'>
                <FaUsers /> Registered Users
              </div>
              <span>{users?.length}</span>
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex gap-1 items-center'>
                <FaUserShield />Admin
              </div>
              <span>{admins?.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard