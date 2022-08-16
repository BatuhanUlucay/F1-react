import { useRoutes } from 'react-router-dom';
import Landing from '../components/Layout/Landing';
import PersistentDrawerLeft from '../components/Layout/Navbar';
import { Races } from '../features/races/components/Races';
import Standings from '../features/rankings/components/Standings';

const AppRoutes = () => {
  const commonRoutes = [
    { path: '/', element: <Landing /> },
    { path: 'races', element: <Races /> },
    { path: 'standings', element: <Standings /> },
  ];

  const element = useRoutes([...commonRoutes]);

  return (
    <>
      <PersistentDrawerLeft />
      {element}
    </>
  );
};

export default AppRoutes;
