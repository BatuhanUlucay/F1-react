import { useQuery } from 'react-query';

import { axios } from '../../../lib/axios';

import { ExtractFnReturnType, QueryConfig } from '../../../lib/react-query';

export const getRaces = (season, competition) => {
  return axios.get(`races`, {
    params: {
      season: season,
    },
  });
};

export const useRaces = (config) => {
  return useQuery({
    queryKey: ['races'],
    queryFn: () => getRaces("2022"),
    ...config,
  });
};
