import { useQuery } from 'react-query';
import { ergastAxios } from '../../../lib/axios';

export const getDriverStats = (driverId) => {
  return ergastAxios.get(`/drivers/${driverId}/results.json`, {params: {limit: 500}});
};

export const useDriverStats = (driverId) => {
  return useQuery({
    queryKey: ['driverStats', driverId],
    queryFn: () => getDriverStats(driverId),
    // ...config,
  });
};
