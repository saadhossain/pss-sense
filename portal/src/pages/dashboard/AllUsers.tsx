import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaUserEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { UserInfoType } from '../../types/UserType';
import { DataContext, DataContextType } from '../../context/AuthProvider';
import useUser from '../../hooks/useUser';

const AllUsers = () => {
  const { user } = useContext(DataContext) as DataContextType;
    //Get LoggedIn user from database
    const { loggedInUser } = useUser(user?.email);
  //Get User Access Token
  const accessToken = localStorage.getItem('AccessToken');
  //State for show password
  const [hidePass, setHidePass] = useState(true);
  //Handle user delete function
  const handleDeleteUser = async (userId: string | undefined) => {
    const confirmation = window.confirm('Do You Want to Delete This User?');
    if (confirmation) {
      //Can't delete user if role is admin
      if(loggedInUser.role === 'admin'){
        toast.error("Sorry! This is admin, it can't be deleted");
        return;
      }
      const res = await fetch(`https://pss-sense-apis.vercel.app/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const data = await res.json();
      if (data.acknowledged === true) {
        toast.success('User Deleted...')
      }
    }
  }
  //Get all users from database
  const [users, setUsers] = useState<any>([])
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
    }
    getUsers();
  }, [handleDeleteUser]);
  return (
    <div>
      <h2 className='text-xl md:text-2xl font-semibold my-2 md:my-5 border-l-4 border-primary pl-2 ml-3 md:ml-0'>All Users</h2>

      {/* Users table */}
      {
        users.length ? (
          <div className="overflow-x-auto text-dark">
            <table className="table">
              {/* head */}
              <thead className='text-dark'>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th className='flex gap-2 items-center'>
                    Password
                    <div onClick={() => setHidePass(!hidePass)} className='cursor-pointer'>
                      {
                        hidePass ? <FaEye className='w-5 h-5' /> : <FaEyeSlash className='w-5 h-5' />
                      }
                    </div>
                  </th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Single User Data */}
                {
                  users.map((user: UserInfoType, index: number) => <tr key={user._id}>
                    <th>{index + 1}</th>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>
                      <input type={`${hidePass ? 'password' : 'text'}`} defaultValue={user.password} />
                    </td>

                    <td><img src={user.profileImg} width={30} className='rounded-lg' /></td>
                    <td className='flex gap-2 items-center justify-center'>
                      <Link to={`/dashboard/modifyuser/${user._id}`}><FaUserEdit className='w-6 h-6 text-primary cursor-pointer' /></Link>
                      <FaDeleteLeft className='w-6 h-6 text-red-700 cursor-pointer' onClick={() => handleDeleteUser(user._id)} />
                    </td>
                  </tr>)
                }
              </tbody>
            </table>
          </div>
        ) :
          (
            <h4 className='text-xl font-semibold'>No User Found</h4>
          )
      }
    </div>
  )
}

export default AllUsers