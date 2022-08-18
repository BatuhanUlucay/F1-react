import { useQuery } from 'react-query';
import { axios } from '../../../lib/axios';

export const getTeams = (season) => {
  return axios.get(`${season}/constructors`);
};

export const useTeams = (season) => {
  return useQuery({
    queryKey: ['teams', season],
    queryFn: () => getTeams(season),
    // ...config,
  });
};
