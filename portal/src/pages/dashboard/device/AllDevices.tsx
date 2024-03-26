import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaUserEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { UserInfoType } from '../../../types/UserType';

const AllDevices = () => {
  //State for show password
  const [hidePass, setHidePass] = useState(true);
  //Handle user delete function
  const handleDeleteDevice = async (userId: string | undefined) => {
    const confirmation = window.confirm('Do You Want to Delete This User?');
    if (confirmation) {
      const res = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.acknowledged === true) {
        toast.success('User Deleted...')
      }
    }
  }
  //Get all users from database
  const [devices, setDevices] = useState<any>([])
  useEffect(() => {
    fetch('http://localhost:3000/devices')
      .then(res => res.json())
      .then(data => {
        setDevices(data);
      })
  }, [handleDeleteDevice]);

  return (
    <div>
      <h2 className='text-xl md:text-2xl font-semibold my-2 md:my-5 border-l-4 border-primary pl-2 ml-3 md:ml-0'>All Devices</h2>

      {/* Devices table */}
      {
        devices.length ?
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
                  devices.map((user: UserInfoType, index: number) => <tr key={user._id}>
                    <th>{index + 1}</th>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>
                      <input type={`${hidePass ? 'password' : 'text'}`} defaultValue={user.password} />
                    </td>

                    <td><img src={user.profileImg} width={30} className='rounded-lg' /></td>
                    <td className='flex gap-2 items-center justify-center'>
                      <Link to={`/dashboard/modifyuser/${user._id}`}><FaUserEdit className='w-6 h-6 text-primary cursor-pointer' /></Link>
                      <FaDeleteLeft className='w-6 h-6 text-red-700 cursor-pointer' onClick={() => handleDeleteDevice(user._id)} />
                    </td>
                  </tr>)
                }
              </tbody>
            </table>
          </div>
          :
          <div>
            <h4 className='text-xl font-semibold'>No Device Found</h4>
          </div>
      }
    </div>
  )
}

export default AllDevices