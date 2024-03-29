import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import loginBg from '../assets/login-bg.png';
import ButtonLoader from '../components/Loader/ButtonLoader';
import { DataContext, DataContextType } from '../context/AuthProvider';

const Login = () => {
    const { userLogin, loading, setLoading } = useContext(DataContext) as DataContextType;
    //Use Location to redirect user after registration
    const location = useLocation()
    const navigate = useNavigate()
    const [email, setEmail] = useState();
    const from = location.state?.from?.pathname || '/dashboard'

    const handleEmail = (e: any) => {
        setEmail(e.target.value);
    }
    //Handle User login functionality using email and password
    const handleUserLogin = (e: any) => {
        setLoading(true);
        e.preventDefault();
        const form = e.target
        const password = form.password.value
        userLogin(email, password)
            .then((result: any) => {
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
                            toast.success('User Login Successful...')
                            form.reset();
                            setLoading(false)
                            navigate(from, { replace: true })
                        }
                    })
            })
            .catch((err: any) => {
                console.error(err)
                setLoading(false);
            })
    }
    return (
        <div className='login-bg min-h-screen'>
            <div className='flex flex-col-reverse lg:flex-row w-11/12 lg:max-w-6xl pt-10 mx-auto gap-10'>
                <div className='w-full lg:w-2/4'>
                    <img src={loginBg} alt='Login Background' />
                </div>
                <div className="w-full lg:w-2/4 flex flex-col justify-center bg-white rounded-lg text-primary font-semibold">
                    <h3 className='py-3 px-5 rounded-r-md bg-primary text-white w-48 shadow-lg mt-10'>Welcome Back</h3>
                    <div className='p-6'>
                        <h1 className="my-3 text-2xl font-bold text-center">Login your Account</h1>
                        <form onSubmit={handleUserLogin} className="space-y-12 ng-untouched ng-pristine ng-valid">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-lg">Email address</label>
                                    <input onBlur={handleEmail} type="email" name="email" id="email" placeholder="Enter Your Email" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label htmlFor="forgetPassModal" className="text-lg">Password</label>
                                        <label htmlFor="forgetPassModal" className="text-md hover:underline text-gray-700">Forgot password?</label>
                                    </div>
                                    <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    {/* Sign In Button */}
                                    <button type="submit" className={`w-full px-8 py-3 font-semibold rounded-md bg-gray-800 text-white`}>{loading ? <ButtonLoader title='Signing In' /> : 'Sign In'}</button>
                                </div>
                                <p className="px-6 text-lg text-center text-gray-800">Don't have an account yet?
                                    <Link to="/register" className="hover:underline text-primary ml-2 font-bold">Sign up</Link>.
                                </p>
                            </div>
                        </form>
                        {/* <button
                            type="button"
                            className="flex items-center justify-center w-full p-2 mt-3 space-x-4 font-semibold border rounded-md border-gray-400 duration-500 ease-in-out hover:bg-primary hover:border-primary hover:text-white">
                            <FaGoogle></FaGoogle>
                            <p>Login with Google</p>
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;