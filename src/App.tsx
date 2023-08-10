import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home';
import Product from './pages/Product';
import ShoppingCartContextProvider from './contexts/ShoppingCartContext';
import Cart from './pages/Cart';

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <ShoppingCartContextProvider>
          <Header />
          <main>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/products/:productId' element={<Product />} />
                <Route path='/cart' element={<Cart />} />
              </Routes>
          </main>
          <Footer />
        </ShoppingCartContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
