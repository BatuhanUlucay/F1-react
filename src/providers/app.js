import React from 'react';
import { QueryClientProvider } from 'react-query';
import queryClient from '../lib/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import { FilterProvider } from '../context/SeasonContext';
import { CurrentDriversProvider } from '../context/CurrentDriversContext';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#E10700',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
});

function AppProvider({ children }) {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          {/* TODO: implement a spinner <Spinner size="xl" /> */}
          Loading
        </div>
      }
    >
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <StyledEngineProvider injectFirst>
            <FilterProvider>
              <CurrentDriversProvider>
                <Router>{children}</Router>
              </CurrentDriversProvider>
            </FilterProvider>
          </StyledEngineProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </React.Suspense>
  );
}

export default AppProvider;
