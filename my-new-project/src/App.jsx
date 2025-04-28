import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Categories from './components/Categories/Categories';
import Footer from './components/Footer/Footer';
import SectionBlock from './components/cube1/SectionBlock';
import './App.css';
import IceCreamCarousel from './components/IceCreamCarousel/IceCreamCarousel';
import IceCreamCatalog from './components/IceCreamCatalog/IceCreamCatalog';
import WaffleIceCreamCatalog from './components/WaffleIceCreamCatalog/WaffleIceCreamCatalog';
import IceCreamBar from './components/IceCreamBar/IceCreamBar';
import PopsiclesCatalog from './components/PopsiclesCatalog/PopsiclesCatalog';
import LowCalCatalog from './components/LowCalCatalog/LowCalCatalog';
import MiniBitesCatalog from './components/MiniBitesCatalog/MiniBitesCatalog';
import IceCreamCakeCatalog from './components/IceCreamCakeCatalog/IceCreamCakeCatalog';
import VeganFrozenDessertsCatalog from './components/VeganFrozenDessertsCatalog/VeganFrozenDessertsCatalog';
import MacaronIceCreamCatalog from './components/MacaronIceCreamCatalog/MacaronIceCreamCatalog';
import SyrupsCatalog from './components/SyrupsCatalog/SyrupsCatalog';
import TeamSection from './components/TeamSection/TeamSection';
import FeedbackSection from './components/FeedbackSection/FeedbackSection';
import AboutUs from './components/AboutUs/AboutUs';
import { CartProvider } from './components/CartContext/CartContext';
import CartDropdown from './components/CartDropDown/CartDropDown';
import Checkout from './components/CheckoutForm/Checkout';
import OrderSuccessNotification from './components/OrderSuccessNotification/OrderSuccessNotification';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <AuthProvider>
          <div className="app" style={{ width: '100%', margin: 0, padding: 0, overflowX: 'hidden', boxSizing: 'border-box' }}>
            <Header />
            <CartDropdown />
            <Checkout />
            <OrderSuccessNotification />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <div id="главная"><Hero /></div>
                    <SectionBlock />
                    <div id="категория"><Categories /></div>
                    <IceCreamCatalog />
                    <div id="топ вкусов"><IceCreamCarousel /></div>
                    <div id="команда"><TeamSection /></div>
                    <div id="отзывы"><FeedbackSection /></div>
                  </>
                }
              />
              <Route path="/ice-cream-bars-catalog" element={<IceCreamBar />} />
              <Route path="/waffle-catalog" element={<WaffleIceCreamCatalog />} />
              <Route path="/popsicles-catalog" element={<PopsiclesCatalog />} />
              <Route path="/low-cal-catalog" element={<LowCalCatalog />} />
              <Route path="/mini-bites-catalog" element={<MiniBitesCatalog />} />
              <Route path="/ice-cream-cake-catalog" element={<IceCreamCakeCatalog />} />
              <Route path="/vegan-frozen-desserts-catalog" element={<VeganFrozenDessertsCatalog />} />
              <Route path="/macaron ice-cream-catalog" element={<MacaronIceCreamCatalog />} />
              <Route path="/syrups-catalog" element={<SyrupsCatalog />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer />
          </div>
        </AuthProvider>
      </Router>
    </CartProvider>
  );
}

export default App;