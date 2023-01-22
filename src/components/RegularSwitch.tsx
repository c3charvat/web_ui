import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import useWebSocket from 'react-use-websocket';
import { liveModeSwitchState } from '../globalState/atoms';

const RegularSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M10 15q-2.083 0-3.542-1.458Q5 12.083 5 10q0-2.083 1.458-3.542Q7.917 5 10 5q2.083 0 3.542 1.458Q15 7.917 15 10l-1.521-.5q-.187-1.292-1.177-2.146Q11.312 6.5 10 6.5q-1.458 0-2.479 1.021Q6.5 8.542 6.5 10q0 1.312.854 2.302T9.5 13.479Zm.917 2.938q-.229.041-.459.052-.229.01-.458.01-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 .229-.01.458-.011.23-.032.459l-1.458-.459V10q0-2.708-1.896-4.604T10 3.5q-2.708 0-4.604 1.896T3.5 10q0 2.708 1.896 4.604T10 16.5q.104 0 .229-.01.125-.011.229-.011Zm6.166.562-3.458-3.479L12.5 18 10 10l8 2.5-2.979 1.104 3.479 3.479Z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="m5.562 12.979-1.854-1.854Q4.896 9.938 6.521 9.26 8.146 8.583 10 8.583t3.479.677q1.625.678 2.813 1.865l-1.854 1.854q-.855-.833-1.99-1.302-1.136-.469-2.448-.469t-2.448.469q-1.135.469-1.99 1.302ZM1.833 9.292 0 7.458q1.896-1.937 4.458-3.031Q7.021 3.333 10 3.333q2.979 0 5.542 1.094Q18.104 5.521 20 7.458l-1.833 1.834q-1.563-1.563-3.657-2.448-2.093-.886-4.51-.886t-4.51.886q-2.094.885-3.657 2.448ZM10 17.5l2.583-2.604q-.5-.5-1.166-.781-.667-.282-1.417-.282t-1.417.282q-.666.281-1.166.781Z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));



export default function StyledSwitch(props: any) {
  const [socketUrl] = useState('ws://localhost:10000');
  const { sendJsonMessage } = useWebSocket(socketUrl, { share: true }); // share allows the websocket to be shared between components
  const [liveModeState, setLiveModeState] = useRecoilState(liveModeSwitchState);


  useEffect(() => {
    sendJsonMessage({
      type: "SwitchMessage",
      liveModeSwitch: liveModeState,
    });
  }, [liveModeState]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLiveModeState(liveModeState === 'true' ? 'false' : 'true')
  };

  return (
    <FormGroup>
      <FormControlLabel control={<RegularSwitch sx={{ m: 1 }}
        defaultChecked onChange={handleChange} />} label={props.label} />
    </FormGroup>
  );
}

// I know i need somthing like the code below but im a little stummped how to bring the
// color swithcing part in

// export default function ToggleColorMode() {
//   const [mode, setMode] = React.useState<'light' | 'dark'>('light');
//   const colorMode = React.useMemo(
//     () => ({
//       toggleColorMode: () => {
//         setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
//       },
//     }),
//     [],
//   );

//   const theme = React.useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode,
//         },
//       }),
//     [mode],
//   );

//   return (
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <MyApp />
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// }
