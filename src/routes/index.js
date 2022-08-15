import { useRoutes } from 'react-router-dom';

import Landing from '../components/Layout/Landing';

const AppRoutes = () => {
  const commonRoutes = [{ path: '/', element: <Landing /> }];

  const element = useRoutes([...commonRoutes]);

  return <>{element}</>;
};

export default AppRoutes;