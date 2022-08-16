import { useQuery } from 'react-query';
import { axios } from '../../../lib/axios';

export const getDriverRankings = (season, driver, team) => {
  let params = {};
  if (season !== undefined) {
    params.season = season;
  }
  if (driver !== undefined) {
    params.driver = driver;
  }
  if (team !== undefined) {
    params.competition = team;
  }

  return axios.get(`rankings/drivers`, {
    params: params,
  });
};

export const useDriverRankings = (season, driver, team) => {
  return useQuery({
    queryKey: ['driverRankings', season],
    queryFn: () => getDriverRankings(season, driver, team),
    // ...config,
  });
};
