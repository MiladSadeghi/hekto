import React, { ReactElement } from 'react'
import { GridLoader } from 'react-spinners'

const Loader = ():ReactElement => {
  return (
    <div className='h-screen w-screen bg-slate-100 flex items-center justify-center'>
      <GridLoader
        color="#959595"
        margin={5}
        size={20}
      />
    </div>
  )
}

export default Loader;