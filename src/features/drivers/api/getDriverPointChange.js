import { useQueries } from '@tanstack/react-query';
import { ergastAxios } from '../../../lib/axios';

export const getDriverPointChange = (season, round) => {
  return ergastAxios.get(`/${season}/${round}/driverStandings.json`);
};

export const useDriverPointChange = (season, rounds, config) => {
  const roundsArr = Array.from({ length: rounds }, (_, i) => i + 1);

  return useQueries({
    queries: roundsArr.map((round) => {
      return {
        queryKey: ['driverPoints', round],
        queryFn: () => getDriverPointChange(season, round),
        ...config,
      };
    }),
  });
};
