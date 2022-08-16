import { useQuery } from 'react-query';

import { axios } from '../../../lib/axios';

import { ExtractFnReturnType, QueryConfig } from '../../../lib/react-query';

export const getRaces = (season, competition) => {

    let params = {}
    if(season !== undefined){
        params.season = season;
    }
    if(competition !== undefined){
        params.competition = competition;
    }

  return axios.get(`races`, {
    params: params,
  });
};

export const useRaces = (season, competition) => {
  return useQuery({
    queryKey: ['races', season],
    queryFn: () => getRaces(season, competition),
    // ...config,
  });
};
