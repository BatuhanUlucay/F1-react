import { useQuery } from '@tanstack/react-query';
import { ergastAxios } from '../../../lib/axios';

export const getDriverDetails = (driverId) => {
  return ergastAxios.get(`/drivers/${driverId}.json`);
};

export const useDriverDetails = (driverId) => {
  return useQuery({
    queryKey: ['driverDetails', driverId],
    queryFn: () => getDriverDetails(driverId),
    // ...config,
  });
};
