import React, { FC, ReactElement, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/hook';
import { Product } from '../../types/IProducts.interface';

const ProductDetails:FC = ():ReactElement => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {products} = useAppSelector(state => state.product);
  const [product] = products.filter((item:Product) => item.id === id);


  useEffect(() => {
    if (!!!product) {
      console.log(product)
      navigate("/404")
    }
  }, [])

  return (
    <div>
      <div className='bg-[#F6F5FF] py-16'>
        <div className='container mx-auto'>
          <h1 className='font-JosefinSans font-bold text-3xl text-[#101750]'>Product Details</h1>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails