import React, { FC, ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'
import About from './About'
import SignIn from './Account/SignIn'
import SignUp from './Account/SignUp'
import Contact from './Contact'
import Faq from './Faq'
import Home from './Home/main'
import NotFound from './NotFound'

const PagesRoute:FC = (): ReactElement  => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/about-us' element={<About />} />
      <Route path='/contact-us' element={<Contact />} />
      <Route path='/404' element={<NotFound />} />
      <Route path='/faq' element={<Faq />} />
    </Routes>
  )
}

export default PagesRoute