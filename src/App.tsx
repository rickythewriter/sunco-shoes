import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home';
import Product from './components/Product';
import ShoppingCartContextProvider from './contexts/ShoppingCartContext';
import Cart from './components/Cart';

function App() {
  return (
    <div className="App">
      <ShoppingCartContextProvider>
        <Header />
        <main>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/products/:productId' element={<Product />} />
              <Route path='/cart' element={<Cart />} />
            </Routes>
          </BrowserRouter>
        </main>
        <Footer />
      </ShoppingCartContextProvider>
    </div>
  );
}

export default App;
