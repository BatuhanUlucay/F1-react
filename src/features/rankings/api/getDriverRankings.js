import { useQuery } from 'react-query';
import { ergastAxios } from '../../../lib/axios';

export const getDriverRankings = (season) => {
  return ergastAxios.get(`${season}/driverStandings.json`);
};

export const useDriverRankings = (season) => {
  return useQuery({
    queryKey: ['driverRankings', season],
    queryFn: () => getDriverRankings(season),
    // ...config,
  });
};
