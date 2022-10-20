import { useQuery } from '@tanstack/react-query';
import { ergastAxios } from '../../../lib/axios';

export const getDriverChamps = (driverId) => {
  return ergastAxios.get(`/drivers/${driverId}/driverStandings.json`, { params: { limit: 500 } });
};

export const useDriverChamps = (driverId) => {
  return useQuery({
    queryKey: ['driverChamps', driverId],
    queryFn: () => getDriverChamps(driverId),
    // ...config,
  });
};
