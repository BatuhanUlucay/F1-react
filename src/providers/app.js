import React from 'react';
import { QueryClientProvider } from 'react-query';
import queryClient from "../lib/react-query"
import { BrowserRouter as Router } from 'react-router-dom';

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
      <QueryClientProvider client={queryClient}>
        <Router>{children}</Router>
      </QueryClientProvider>
    </React.Suspense>
  );
}

export default AppProvider;
