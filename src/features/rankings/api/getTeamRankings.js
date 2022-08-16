import { useQuery } from 'react-query';
import { axios } from '../../../lib/axios';

export const getTeamRankings = (season, team) => {
  let params = {};
  if (season !== undefined) {
    params.season = season;
  }
  if (team !== undefined) {
    params.competition = team;
  }

  return axios.get(`rankings/teams`, {
    params: params,
  });
};

export const useTeamRankings = (season, team) => {
  return useQuery({
    queryKey: ['teamRankings', season],
    queryFn: () => getTeamRankings(season, team),
    // ...config,
  });
};
