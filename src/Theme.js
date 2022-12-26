import { amber, deepOrange, grey, blue, common } from '@mui/material/colors';

const palette = {
  light: {
    primary: {
      main: '#00765A',
      light: '#B1DED3',
      dark: '#00765A',
    },
  },
};

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
        ),
  },
//   typography: {
//     fontFamily: [
//       'Oswald',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//     ].join(','),
//     body1: {
//       fontFamily: 'Poppins, Arial, sans-serif',
//     },
//   },
});

export const getThemedComponents = (mode) => ({
  components: {
    ...(mode === 'light'
    //   ? {
    //       MuiAppBar: {
    //         styleOverrides: {
    //           colorPrimary: {
    //             backgroundColor: grey[800],
    //           },
    //         },
    //       },
    //       MuiLink: {
    //         variant: 'h3',
    //       },
    //       MuiButton: {
    //         styleOverrides: {
    //           root: {
    //             borderRadius: 0,
    //             color: common.white,
    //             fontFamily:
    //               "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
    //             fontSize: 20,
    //             borderWidth: 2,
    //             '&:hover': {
    //               borderWidth: 2,
    //             },
    //           },
    //         },
    //         variants: [
    //           {
    //             props: { variant: 'contained' },
    //             style: {
    //               fontFamily:
    //                 "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
    //             },
    //           },
    //           {
    //             props: { variant: 'outlined' },
    //             style: {
    //               color: palette.light.primary.main,
    //             },
    //           },
    //           {
    //             props: { variant: 'primary', color: 'primary' },
    //             style: {
    //               border: '4px dashed blue',
    //             },
    //           },
    //         ],
    //       },
    //       MuiList: {
    //         styleOverrides: {
    //           root: {},
    //         },
    //       },
    //       MuiMenuItem: {
    //         styleOverrides: {
    //           root: {
    //             color: common.white,
    //             alignItems: 'stretch',
    //             fontFamily:
    //               "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
    //           },
    //         },
    //       },
    //       MuiAccordion: {
    //         styleOverrides: {
    //           root: {
    //             color: common.white,
    //             fontFamily:
    //               "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
    //           },
    //         },
    //       },
    //     }
    //   : {
    //       MuiAppBar: {
    //         styleOverrides: {
    //           colorPrimary: {
    //             backgroundColor: blue[800],
    //           },
    //         },
    //       },
    //     }
    ),
  },
});