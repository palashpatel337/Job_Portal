import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer bg-[#1f1b2e text-gray-900 py-8'>
        <h1 className='flex text-2xl items-center justify-center font- font-small leading-3'>
          All rights reserved  &#169; jobsX.com
        </h1>
        <p className='flex font-light mt-4 items-center justify-center gap-5 py- leading-6'>
          <Link to="/">Home</Link>|
          <Link to="/contact">Contact</Link>|
          <Link to="/about">About</Link>|          
          <Link to="/privacy_policy">Privacy and Policy</Link>

        </p>
    </div>
)}

export default Footer