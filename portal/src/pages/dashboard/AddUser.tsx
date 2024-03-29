import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ButtonLoader from '../../components/Loader/ButtonLoader';
import { DataContext, DataContextType } from '../../context/AuthProvider';
import { UserInfoType } from '../../types/UserType';
import { uploadFiletoFirebase } from '../../utils/utils';

const AddUser = () => {
  const { processing, setProcessing } = useContext(
    DataContext
  ) as DataContextType;
  //Set email
  const [email, setEmail] = useState();
  //Get the email from the input
  const handleEmail = (e: any) => {
    setEmail(e.target.value)
  }
  //Register a new user
  const handleRegistration = async (e: any) => {
    e.preventDefault();
    setProcessing(true);
    if (!email) {
      toast.error('Please fill the Form First...');
      setProcessing(false);
      return;
    }
    //Get the form values
    const form = e.target;
    const fullName = form.name.value;
    const password = form.password.value;
    const phone = form.phone.value;
    //Handle Profile Picture upload
    const image = form.profile.files[0];
    const profileImg = await uploadFiletoFirebase('profileImage', image);
    if (profileImg) {
      const userInfo = {
        fullName,
        email,
        phone,
        password,
        profileImg
      };
      // Save new user to Database
      saveUserToDB(userInfo)
      form.reset();
      setEmail(undefined);
      setProcessing(false);
      toast.success('New User added...');
    }
  }
  //Save New user to the database
  const saveUserToDB = (userInfo: UserInfoType) => {
    fetch(`https://pss-sense-apis.vercel.app/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
  }
  //State for show password
  const [hidePass, setHidePass] = useState(true);
  return (
    <div className='min-h-screen'>
      <h2 className='text-xl md:text-2xl font-semibold my-2 md:my-5 border-l-4 border-primary pl-2 ml-3 md:ml-0'>Add an User</h2>
      <div className="w-full flex flex-col rounded-lg bg-slate-50 text-gray-800 shadow-xl">
        <div className='p-6'>
          <form onSubmit={handleRegistration} className="space-y-12 ng-untouched ng-pristine ng-valid">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-lg">Full Name</label>
                <input type="text" name="name" id="name" placeholder="Full Name" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-lg">Email address</label>
                <input onBlur={handleEmail} type="email" name="email" id="email" placeholder="Enter Email Address" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-2 text-lg">Phone number</label>
                <input type="tel" name="phone" id="phone" placeholder="Enter phone number" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
              </div>
              <div className='relative'>
                <label htmlFor="password" className="text-lg">Password</label>
                <input type={`${hidePass ? 'password' : 'text'}`} name="password" id="password" placeholder="********" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                <div onClick={() => setHidePass(!hidePass)} className='cursor-pointer absolute top-10 right-2'>
                  {
                    hidePass ? <FaEye /> : <FaEyeSlash />
                  }
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="profile" className="text-lg">Profile Picture</label>
                  <input type="file" name="profile" id="profile" accept='image/*' className="w-full px-3 py-2 border rounded-md border-gray-800" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                {/* Adding User Button */}
                <button type="submit" className={`w-full px-8 py-3 font-semibold rounded-md bg-gray-800 text-white`}>{processing ? <ButtonLoader title='Adding User' /> : 'Add User'}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;