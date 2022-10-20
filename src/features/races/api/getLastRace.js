import { useQuery } from '@tanstack/react-query';
import { ergastAxios } from '../../../lib/axios';

export const getLastRace = () => {
  return ergastAxios.get(`current/last.json`);
};

export const useLastRace = () => {
  return useQuery({
    queryKey: ['lastRace'],
    queryFn: () => getLastRace(),
    // ...config,
  });
};
