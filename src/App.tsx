import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import Promo from './components/subcomponents/Promo';

function App() {
  return (
    <div className="App">
      <Header />
      <Promo />
      <Footer />
    </div>
  );
}

export default App;
