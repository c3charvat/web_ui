import React from 'react';
//import logo from './logo.svg';
import './App.css';
import './Drawer'
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import TemporaryDrawer from './Drawer';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <div className="App">
      <header className="App-header">
      <TemporaryDrawer></TemporaryDrawer>
      </header>
    </div>
  );
};
export default App;
