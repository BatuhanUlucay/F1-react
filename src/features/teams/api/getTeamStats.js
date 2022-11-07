import { useQuery } from '@tanstack/react-query';
import { ergastAxios } from '../../../lib/axios';

export const getTeamStats = (teamId) => {
  return ergastAxios.get(`/constructors/${teamId}/constructorStandings.json`);
};

export const useTeamStats = (teamId) => {
  return useQuery({
    queryKey: ['teamStats', teamId],
    queryFn: () => getTeamStats(teamId),
  });
};
