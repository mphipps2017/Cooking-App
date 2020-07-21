import React from 'react';
import './App.css';
import SignInBox from './components/pages/SignInBox';
import Navbar from './components/navbars/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <SignInBox />
    </div>
  );
}

export default App;
