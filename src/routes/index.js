import { useRoutes } from 'react-router-dom';
import Landing from '../components/Layout/Landing';
import PersistentDrawerLeft from '../components/Layout/Navbar';
import { Races } from '../features/races/components/Races';
import Standings from '../features/rankings/components/Standings';
import Drivers from '../features/drivers/components/Drivers';

const AppRoutes = () => {
  const commonRoutes = [
    { path: '/', element: <Landing /> },
    { path: 'races', element: <Races /> },
    { path: 'standings', element: <Standings /> },
    { path: 'drivers', element: <Drivers /> },
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
