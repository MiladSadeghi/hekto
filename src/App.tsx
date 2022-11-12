import React, { useEffect } from 'react';
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

  if (loading) return null;
  return (
    <>
      <Navbar />
      <PagesRoute />
    </>
  );
}

export default App;
