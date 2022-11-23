import { useRoutes } from 'react-router-dom';
import PersistentDrawerLeft from '../components/Layout/Navbar';
import { lazy } from 'react';

const Landing = lazy(() => import('../components/Layout/Landing'));
const Races = lazy(() => import('../features/races/components/Races'));
const Standings = lazy(() => import('../features/rankings/components/Standings'));
const Teams = lazy(() => import('../features/teams/components/Teams'));
const TeamDetail = lazy(() => import('../features/teams/components/TeamDetail'));
const DriverDetail = lazy(() => import('../features/drivers/components/DriverDetail'));
const Drivers = lazy(() => import('../features/drivers/components/Drivers'));
const RaceResult = lazy(() => import('../features/races/components/RaceResult'));

const AppRoutes = () => {
  const commonRoutes = [
    { path: '/', element: <Landing /> },
    { path: 'races', element: <Races /> },
    { path: 'standings', element: <Standings /> },
    { path: 'teams', element: <Teams /> },
    { path: 'teams/:teamId', element: <TeamDetail /> },
    { path: 'drivers', element: <Drivers /> },
    { path: 'drivers/:driverId', element: <DriverDetail /> },
    { path: 'results/:season/:round', element: <RaceResult /> },
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
