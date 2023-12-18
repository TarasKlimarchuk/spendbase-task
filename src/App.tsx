import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';

import { Main } from './components';
import { theme } from './theme.ts';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Main />
    </ThemeProvider>
  );
};

export default App;
