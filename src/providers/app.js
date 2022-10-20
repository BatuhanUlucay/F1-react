import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '../lib/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import { FilterProvider } from '../context/SeasonContext';

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
                <Router>{children}</Router>
            </FilterProvider>
          </StyledEngineProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </React.Suspense>
  );
}

export default AppProvider;
