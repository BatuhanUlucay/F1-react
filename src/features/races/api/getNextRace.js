import { useQuery } from '@tanstack/react-query';
import { ergastAxios } from '../../../lib/axios';

export const getNextRace = () => {
  return ergastAxios.get(`current/next.json`);
};

export const useNextRace = () => {
  return useQuery({
    queryKey: ['nextRace'],
    queryFn: () => getNextRace(),
    // ...config,
  });
};
