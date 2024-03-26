import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import registerBg from '../assets/register-bg.png';
import ButtonLoader from '../components/Loader/ButtonLoader';
import { DataContext, DataContextType } from '../context/AuthProvider';
import { UserInfoType } from '../types/UserType';
import { uploadFiletoFirebase } from '../utils/utils';

const Register = () => {
    const { loading, setLoading, createUser, updateUser } = useContext(
        DataContext
    ) as DataContextType;
    //Use Location to redirect user after registration
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || '/dashboard'
    //Set email
    const [email, setEmail] = useState();
    //Get the email from the input
    const handleEmail = (e: any) => {
        setEmail(e.target.value)
    }
    //Register a new user
    const handleRegistration = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        if (!email) {
            toast.error('Please fill the Form First...');
            setLoading(false);
            return;
        }
        //Get the form values
        const form = e.target;
        const fullName = form.name.value;
        const password = form.password.value;
        //Handle Profile Picture upload
        const image = form.profile.files[0];
        const profileImg = await uploadFiletoFirebase('profileImage', image);
        if (profileImg) {
            const userInfo = {
                fullName,
                email,
                password,
                profileImg
            };
            createUser(email, password)
                .then((result: any) => {
                    updateUser(fullName, profileImg)
                        .then(() => {
                        })
                    // Save new user to Database
                    saveUserToDB(userInfo)
                    //Get Access token from the server and save it to local storage
                    fetch('http://localhost:3000/getToken', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({ email })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.accessToken) {
                                localStorage.setItem('AccessToken', data.accessToken)
                                //After Saving the token to local storage then do others tasks
                                form.reset()
                                toast.success('Account Registration successful... Redirecting...')
                                navigate(from, { replace: true })
                                setLoading(false)
                            }
                        })
                })
                .catch((err: any) => {
                    console.error(err);
                    setLoading(false)
                })
        }
    }
    //Save New user to the database
    const saveUserToDB = (userInfo: UserInfoType) => {
        fetch(`http://localhost:3000/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
    }
    return (
        <div className='register-bg min-h-screen'>
            <div className='flex flex-col-reverse lg:flex-row w-11/12 lg:max-w-6xl py-10 mx-auto gap-10'>
                <div className='w-full lg:w-2/4 sticky top-10'>
                    <img src={registerBg} alt='Login Background' className='sticky top-10' />
                </div>
                <div className="w-full lg:w-2/4 flex flex-col rounded-lg bg-slate-50 text-gray-800 shadow-xl">
                    <h3 className='py-3 px-5 rounded-r-md bg-primary text-white font-semibold w-80 shadow-lg mt-10'>Please Create Your Account</h3>
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
                                    <label htmlFor="password" className="text-lg">Password</label>
                                    <input type="password" name="password" id="password" placeholder="********" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
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
                                    {/* Sign Up Button */}
                                    <button type="submit" className={`w-full px-8 py-3 font-semibold rounded-md bg-gray-800 text-white`}>{loading ? <ButtonLoader title='Signing up' /> : 'Sign Up'}</button>
                                </div>
                                <p className="px-6 text-lg text-center text-gray-800">Already Have an Account?
                                    <Link to="/login" className="hover:underline text-primary ml-2 font-bold">Login</Link>.
                                </p>
                            </div>
                        </form>
                        <button
                            type="button"
                            className="flex items-center justify-center w-full p-2 mt-3 space-x-4 font-semibold border rounded-md border-gray-400 duration-500 ease-in-out hover:bg-primary hover:border-primary hover:text-white">
                            <FaGoogle></FaGoogle>
                            <p>Continue with Google</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;