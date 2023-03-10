import React from "react";
import {RecoilRoot} from 'recoil';
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getDesignTokens, getThemedComponents } from "./Theme";
import { ColorModeContext } from "./contexts/color-context";
import DrawerLeft from "./components/Drawer";

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

  React.useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  let theme = React.useMemo(
    () =>
      createTheme(deepmerge(getDesignTokens(mode), getThemedComponents(mode))),
    [mode]
  );

  theme = responsiveFontSizes(theme);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
        <DrawerLeft></DrawerLeft>
        </RecoilRoot>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
