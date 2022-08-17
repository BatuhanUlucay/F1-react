import { useRoutes } from 'react-router-dom';
import Landing from '../components/Layout/Landing';
import PersistentDrawerLeft from '../components/Layout/Navbar';
import { Races } from '../features/races/components/Races';
import Standings from '../features/rankings/components/Standings';
import Teams from '../features/drivers-teams/components/Teams';

const AppRoutes = () => {
  const commonRoutes = [
    { path: '/', element: <Landing /> },
    { path: 'races', element: <Races /> },
    { path: 'standings', element: <Standings /> },
    { path: 'teams', element: <Teams /> },
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
