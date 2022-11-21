import React, { FC, ReactElement } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import About from './About'
import SignIn from './Account/SignIn'
import SignUp from './Account/SignUp'
import Contact from './Contact'
import Faq from './Faq'
import Home from './Home/main'
import NotFound from './NotFound'
import OrderComplete from './OrderComplete'
import ProductDetails from './Products/ProductDetails'

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
      <Route path='/order-complete' element={<OrderComplete />} />
      <Route path='/product-details/:id' element={<ProductDetails />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  )
}

export default PagesRoute