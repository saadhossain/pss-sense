import React from 'react'
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='w-11/12 lg:w-10/12 mx-auto my-5 flex flex-col-reverse lg:flex lg:flex-row items-center justify-center'>
            <div className='text-center'>
                <h1 className='text-5xl lg:text-9xl font-bold text-dealogic'>404</h1>
                <p className='text-lg lg:text-xl text-accent'>Oops! Something Happens unexpected! <br />The Page your are looking for is Missing</p>
                <Link to='/'>
                    <button className='py-2 px-10 font-semibold bg-secondary my-4 text-white'>Go To Homepage</button>
                </Link>
            </div>
        </div>
    );
}

export default ErrorPage