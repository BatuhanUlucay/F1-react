import { useQuery } from '@tanstack/react-query';
import { ergastAxios } from '../../../lib/axios';

export const getTeamDrivers = (constructorId, season) => {
  return ergastAxios.get(`${season}/constructors/${constructorId}/drivers.json`);
};

export const useTeamDrivers = (constructorId, season) => {
  return useQuery({
    queryKey: ['teamDrivers', constructorId, season],
    queryFn: () => getTeamDrivers(constructorId, season),
  });
};
