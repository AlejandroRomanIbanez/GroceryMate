import { useEffect } from 'react';
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



const AppContent = () => {
  const location = useLocation();
  const hideHeaderRoutes = ['/auth']; // Add any routes where you don't want to show the header

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && (
        <>
          <Header />
          <Navbar />
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path='/store' element={<ProductStore isFav={false}/>} />
        <Route path='/store/favs' element={<ProductStore isFav={true} />} />
        <Route path='/checkout' element={<Checkout/>} />
      </Routes>
      {!hideHeaderRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <Router>
      <div className='App'>
        <AppContent />
      </div>
    </Router>
  );
}

export default App;