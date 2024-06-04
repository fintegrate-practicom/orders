import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from '@mui/material';
import BaseWizard from './Stepper/BaseWizard';
import SmallShoppingBag from './smallBag/SmallShoppingBag';

import MuiNavbar from './components/MuiNavbar/MuiNavbar';


function App() {
  const [showWizard, setShowWizard] = useState(false)

  return (
    <div>
      {showWizard && (<BaseWizard />)}

      <Button
        variant='contained'
        size='large'
        onClick={() => setShowWizard(!showWizard)}>
        {showWizard ? 'hide wizard' : 'show wizard'}
      </Button>
      <a />
      <SmallShoppingBag />

      <div>      <MuiNavbar />
      </div>
      <header className="A pp-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

    </div>
  );
}

export default App;