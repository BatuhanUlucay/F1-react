import { useRoutes } from 'react-router-dom';
import Landing from '../components/Layout/Landing';
import { Races } from '../features/races/components/Races';

const AppRoutes = () => {
  const commonRoutes = [{ path: '/', element: <Landing />}, {path:"races", element: <Races />}];

  const element = useRoutes([...commonRoutes]);

  return <>{element}</>;
};

export default AppRoutes;
