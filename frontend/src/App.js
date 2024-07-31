import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './Component/Home/Home';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Auth from './Component/Auth/Auth';
import ProductStore from './Component/ProductStore/ProductStore';
import Header from './Component/Header/Header';
import Navbar from './Component/Navbar/Navbar';
import Footer from './Component/Footer/Footer';
import Checkout from './Component/Checkout/Checkout';
import axios from 'axios';



const AppContent = ({ products }) => {
  const location = useLocation();
  const hideHeaderRoutes = ['/auth']; // Add any routes where you don't want to show the header

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && (
        <>
          <Header products={products} />
          <Navbar />
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path='/store' element={<ProductStore products={products} isFav={false}/>} />
        <Route path='/store/favs' element={<ProductStore products={products} isFav={true} />} />
        <Route path='/checkout' element={<Checkout/>} />
      </Routes>
      {!hideHeaderRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/api/products/all_products`);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <Router>
      <div className='App'>
        <AppContent products={products} />
      </div>
    </Router>
  );
}

export default App;