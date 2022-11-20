import React, { FC, ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'
import About from './About'
import SignIn from './Account/SignIn'
import SignUp from './Account/SignUp'
import Contact from './Contact'
import Home from './Home/main'

const PagesRoute:FC = (): ReactElement  => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/about-us' element={<About />} />
      <Route path='/contact-us' element={<Contact />} />
    </Routes>
  )
}

export default PagesRoute