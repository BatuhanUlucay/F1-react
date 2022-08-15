import AppProvider from './providers/app';
import AppRoutes from './routes/index';

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
