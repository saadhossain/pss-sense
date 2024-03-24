import React from 'react'
import { Link } from 'react-router-dom'

const PrimaryBtn = () => {
    return (
        <button className='bg-gradient-to-r from-[#60B08D] to-[#D1A952] py-3 px-10 rounded-2xl hover:bg-gradient-to-l duration-500 ease-in-out'><Link to='/login'>Get Started</Link></button>
    )
}

export default PrimaryBtn