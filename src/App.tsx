import React from 'react';
import logo from './logo.svg';
import './App.css';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';


const toggleDrawer =
  (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
    };


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={toggleDrawer(true)}>{"left"}</Button>
        <Drawer
          anchor={"left"}
          open={true}
          onClose={toggleDrawer(false)}
        >
        </Drawer>
      </header>
    </div>
  );
};
export default App;
