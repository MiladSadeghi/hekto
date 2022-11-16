import React, { FC, ReactElement } from 'react'
import "../../index.css"
import Logos from '../Home/Logos';

const SignIn: FC = ():ReactElement => {
  return (
    <>
      <div className='container mx-auto pt-28 pb-16 '>
        <div className='flex flex-col w-5/12 mx-auto p-14 shadow-[0_0_25px_10px_#f8f8fb] mb-16'>
          <div className='text-center mb-5'>
            <h5 className='font-JosefinSans font-bold text-3xl mb-1'>Login</h5>
            <p className='text-[17px] text-[#9096B2] font-Lato'>Please login using account detail bellow.</p>
          </div>
          <div>
            <input placeholder='Email Address' className='form-input' type="email" />
            <input placeholder='Password' className='form-input' type="password" />
            <p className='mb-6 font-Lato text-[#9096B2] text-[17px]'>Forgot your password?</p>
            <button className='py-3 text-center bg-pink-cc w-full text-white font-Lato'>Sign In</button>
            <p className='text-center text-[#9096B2] text-base mt-5'>Don’t have an Account? Create account</p>
          </div>
        </div>
        <Logos />
      </div>
    </>
  )
}

export default SignIn;