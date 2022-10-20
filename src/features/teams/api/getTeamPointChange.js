import { useQueries } from '@tanstack/react-query';
import { ergastAxios } from '../../../lib/axios';

export const getTeamPointChange = (season, round) => {
  return ergastAxios.get(`/${season}/${round}/constructorStandings.json`);
};

export const useTeamPointChange = (season, rounds, config) => {
  const roundsArr = Array.from({ length: rounds }, (_, i) => i + 1);

  return useQueries({
    queries: roundsArr.map((round) => {
      return {
        queryKey: ['teamPoints', round],
        queryFn: () => getTeamPointChange(season, round),
        ...config,
      };
    }),
  });
};
