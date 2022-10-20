import { useQueries, useQuery } from '@tanstack/react-query';
import { ergastAxios } from '../../../lib/axios';

export const getDriverPointChange = (season, round) => {
  return ergastAxios.get(`/${season}/${round}/driverStandings.json`);
};

//TODO: Fix this.

export const useDriverPointChange = (season, rounds, config) => {
  let queries = [];
  for (let i = 0; i < rounds; i++) {
    queries.push({
      queryKey: ['points', i],
      queryFn: () => getDriverPointChange(season, i),
      enabled: !!config,
    });
  }

  return useQueries({ queries: queries });
};
