import { useQuery } from '@tanstack/react-query';
import { ergastAxios } from '../../../lib/axios';

export const getTeamRankings = (season) => {
  return ergastAxios.get(`${season}/constructorStandings.json`);
};

export const useTeamRankings = (season) => {
  return useQuery({
    queryKey: ['teamRankings', season],
    queryFn: () => getTeamRankings(season),
    // ...config,
  });
};
