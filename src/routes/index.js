import { useRoutes } from 'react-router-dom';
import Landing from '../components/Layout/Landing';
import PersistentDrawerLeft from '../components/Layout/Navbar';
import { Races } from '../features/races/components/Races';
import Standings from '../features/rankings/components/Standings';
import Teams from '../features/teams/components/Teams';
import TeamDetail from '../features/teams/components/TeamDetail';
import DriverDetail from '../features/drivers/components/DriverDetail';
import Drivers from '../features/drivers/components/Drivers';

const AppRoutes = () => {
  const commonRoutes = [
    { path: '/', element: <Landing /> },
    { path: 'schedule', element: <Races /> },
    { path: 'standings', element: <Standings /> },
    { path: 'teams', element: <Teams /> },
    { path: 'teams/:teamId', element: <TeamDetail /> },
    { path: 'drivers', element: <Drivers /> },
    { path: 'drivers/:driverId', element: <DriverDetail /> },
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
