import { LayoutProvider } from './providers/layoutprovider';
import { AlertProvider } from './providers/alertprovider';
import { QueryProvider } from './providers/queryprovider';
import routes from './providers/routes';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LayoutProvider>
        <AlertProvider>
          <QueryProvider>
            {routes}
          </QueryProvider>
        </AlertProvider>
      </LayoutProvider>
    </ThemeProvider>
  );
}

export default App;
