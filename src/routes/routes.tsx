import React, { FC, ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home/main'

const PagesRoute:FC = (): ReactElement  => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  )
}

export default PagesRoute