import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useRecoilState } from 'recoil';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import LightDarkSwitch from './LightDarkSwitch';
import StyledSwitch from './RegularSwitch';
import MainContent from './MainContent';
import { sliderUIRenderState,tableUIRenderState,consoleUIRenderState } from '../globalState/atoms';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


export default function DrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [consoleRenderState, setConsoleRenderState]  = useRecoilState(consoleUIRenderState);
  const [tableRenderState, setTableRenderState]  = useRecoilState(tableUIRenderState);
  const [sliderRenderState, setSliderRenderState] = useRecoilState(sliderUIRenderState);
  
  const HandleSliderChange = () =>{
    setSliderRenderState(sliderRenderState === 'true' ? 'false' : 'true')
  };
  const HandleTableChange = () =>{
    setTableRenderState(tableRenderState === 'true' ? 'false' : 'true')
  };
  const HandleConsoleChange = () =>{
    setConsoleRenderState(consoleRenderState === 'true' ? 'false' : 'true')
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            DUAL AIRFOIL CONTROL (AFC V2.0)
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <FormGroup sx={{marginLeft:'8px'}}>
          <FormControlLabel control={<Switch defaultChecked onChange={HandleSliderChange} />} label="Enable Sliders" />
          <FormControlLabel control={<Switch defaultChecked onChange={HandleTableChange} />} label="Enable Table" />
          <FormControlLabel control={<Switch onChange={HandleConsoleChange} />} label="Enable Console" />
        </FormGroup>
        <Divider />
        <List>
          <ListItem disablePadding>
            <StyledSwitch label="Live/Trigger Mode"></StyledSwitch>
          </ListItem>
          <ListItem disablePadding>
            <LightDarkSwitch></LightDarkSwitch>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <MainContent></MainContent>
      </Main>
    </Box>
  );
}