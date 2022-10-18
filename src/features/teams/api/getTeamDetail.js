import { useQuery } from 'react-query';
import { ergastAxios } from '../../../lib/axios';

export const getTeamDetails = (constructorId) => {
  return ergastAxios.get(`/constructors/${constructorId}.json`);
};

export const useTeamDetails = (constructorId) => {
  return useQuery({
    queryKey: ['teamDetails', constructorId],
    queryFn: () => getTeamDetails(constructorId),
    // ...config,
  });
};
