import React, { useEffect, useRef, useState } from 'react'
import { FiHeart } from 'react-icons/fi';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { SlMagnifierAdd } from 'react-icons/sl';
import { useSearchParams } from 'react-router-dom';
import Loader from '../../helper/Loader';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { getRegularList } from '../../redux/slices/list';
import { Product } from '../../types/IProducts.interface';

const ProductsList = () => {
  const [searchParams] = useSearchParams();
  const {loading : productsLoading, products} = useAppSelector(state => state.product);
  const [searchText, setSearchText] = useState<any>("");
  const [sort, setSort] = useState("regular")
  const {loading: listedLoading, listedProduct} = useAppSelector(state => state.list);
  const dispatch = useAppDispatch();
  const isMount1 = useRef(false)
  const isMount2 = useRef(false)

  useEffect(() => {
    if (!productsLoading && !!products.length) {
      if (searchParams.get("search")) {
        setSearchText(() => searchParams.get("search"));
      }
      dispatch(getRegularList({products, search: ""}))
    }
  }, [products])


  useEffect(() => {
    if (isMount1.current) {
      dispatch(getRegularList({products, search: searchText}))
    } else {
      isMount1.current = true
    }
  }, [searchText])

  const changeHandler = (query: string) => {
    setSort(() => query)
  }

  if (productsLoading || !!!products.length) return <Loader />
  return (
    <div>
      <div className='bg-[#F6F5FF] py-16'>
        <div className='container mx-auto'>
          <h1 className='font-JosefinSans font-bold text-3xl text-[#101750]'>Product List</h1>
        </div>
      </div>
      <div className='container mx-auto mt-20'>
        <div>
          <div className='flex items-center justify-between mb-20'>
            <h5 className='font-JosefinSans font-bold text-2xl text-navy-blue'>Furniture Ecommerce</h5>
            <div className='flex items-center'>
              <p className='text-[#3F509E] font-Lato text-base mr-2 whitespace-pre'>Sort By: </p>
              <select className='bg-white border-2 border-[#E7E6EF] text-[#8A8FB9] focus:ring-[#bcbbc1] focus:border-[#bcbbc1] block w-full p-2.5 outline-none text-sm' onChange={(e: any) => changeHandler(e.target.value)}>
                <option value="regular">Best Match</option>
                <option value="lower">Lowest First</option>
                <option value="higher">Highest First</option>
              </select>
            </div>
          </div>
          <div className='w-full'>
            {
              listedLoading ?
              (
                <Loader />
              ):
              (
                listedProduct.map((product: Product) => 
                <div key={product.id} className="flex items-center mb-10 p-4 gap-6">
                  <div className='w-1/6'>
                    <div>
                      <img className='w-full bg-gray-50 rounded-sm p-2' src={
                      product.imagesByColor ?
                      product.imagesByColor[product.colors[0].name][0] :
                      product.images[0]
                    } alt="" />

                    </div>
                  </div>
                  <div className='w-5/6'>
                    <div className='flex'>
                      <h5 className='font-JosefinSans font-bold text-xl text-[#111C85] mr-6'>{product.title}</h5>
                      {
                        product.colors && 
                        (
                          <div className='flex items-center'>
                            {product.colors.map((item: any) => 
                              <div className="relative mr-4" key={item.code}>
                                
                                <div className={`w-4 h-4 rounded-2xl group cursor-pointer relative`} style={{background: item.code}}>
                                  <div className="opacity-0 w-max rounded-lg py-2 absolute z-10 group-hover:opacity-100 -top-10 left-1/2 -translate-x-1/2 px-3 pointer-events-none" style={{background: item.code}}>
                                    <p className='mix-blend-difference text-white text-center text-sm font-JosefinSans'>{item.name}</p>
                                    <svg className="absolute h-2 w-full left-1/2 -translate-x-1/2 top-[2.2rem]" x="0px" y="0px" viewBox="0 0 255 255" style={{color: item.code}}><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      }
                    </div>
                    <div className='flex mt-2'>
                      <p className={`${!product.discount && "hidden"} font-JosefinSans text-lg text-navy-blue font-semibold mr-5`}>${product.discount}</p>
                      <p className={`${product.discount && "line-through text-pink-cc"} font-JosefinSans text-lg text-navy-blue font-semibold `}>${product.price}</p>
                    </div>
                    <div className='flex mt-2'>
                      <HiOutlineShoppingCart className='mr-7 text-[#535399]' fontSize={20}  />
                      <FiHeart className='mr-7 text-[#535399]' fontSize={20}  />
                      <SlMagnifierAdd className='text-[#535399]' fontSize={20}  />
                    </div>
                  </div>
                </div>
                )
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsList