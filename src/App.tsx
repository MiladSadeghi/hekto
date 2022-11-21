import React, { useEffect } from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { useAppDispatch, useAppSelector } from './redux/hook';
import { getProducts } from './redux/slices/products';
import PagesRoute from './routes/routes';

function App() {
  const {loading} = useAppSelector(state => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [])
  
  return (
    <>
      <Navbar />
      <PagesRoute />
      <Footer />
    </>
  );
}

export default App;
