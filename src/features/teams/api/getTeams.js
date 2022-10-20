import { useQuery } from '@tanstack/react-query';
import { ergastAxios } from '../../../lib/axios';

export const getTeams = (season) => {
  return ergastAxios.get(`${season}/constructors`);
};

export const useTeams = (season) => {
  return useQuery({
    queryKey: ['teams', season],
    queryFn: () => getTeams(season),
    // ...config,
  });
};
