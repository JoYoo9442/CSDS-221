import React from 'react';
import logo from './logo.svg';
import './App.css';
import AccountSummary from './components/ZoomSunBurst/AccountSummary.tsx';
import Information from './components/Information/Information.tsx';

function App() {
  return (
    <div className="App">
      <Information />
      <br />
      <AccountSummary />
    </div>
  );
}

export default App;
