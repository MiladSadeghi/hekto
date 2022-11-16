import React, { FC, ReactElement } from 'react'
import Logos from '../Home/Logos';
import "../../index.css"
const SignUp: FC = ():ReactElement => {
  return (
    <div>
      <>
      <div className='container mx-auto pt-28 pb-16 '>
        <div className='flex flex-col w-5/12 mx-auto p-14 shadow-[0_0_25px_10px_#f8f8fb] mb-16'>
          <div className='text-center mb-5'>
            <h5 className='font-JosefinSans font-bold text-3xl mb-1'>Sign Up</h5>
          </div>
          <div>
            <input placeholder='Email Address' className='form-input' type="email" />
            <input placeholder='Username' className='form-input' type="text" />
            <input placeholder='Password' className='form-input' type="password" />
            <input placeholder='Repeat Password' className='form-input' type="password" />
            <div className="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 bg-gray-100 rounded border-gray-300  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="default-checkbox" className="ml-2 text-base font-medium text-gray-900 dark:text-gray-300 font-JosefinSans">I agree with the terms and conditions.</label>
            </div>
            <button className='py-3 text-center bg-pink-cc w-full text-white font-Lato'>Sign Up</button>
            <p className='text-center text-[#9096B2] text-base mt-5'>You have an Account? Login</p>
          </div>
        </div>
        <Logos />
      </div>
    </>
    </div>
  )
}

export default SignUp;