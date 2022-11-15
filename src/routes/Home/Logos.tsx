import React, { ReactElement } from 'react'
import LogosIMG from "../../images/logos.png";

const Logos = ():ReactElement => {
  return (
      <img src={LogosIMG} alt="Logos" className='w-auto mx-auto mb-10' />
  )
}

export default Logos