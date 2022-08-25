import { useQuery } from 'react-query';
import wtf from 'wtf_wikipedia';

export const getTeamInfobox = (title) => {
  return wtf.fetch(title);
};

export const useTeamInfobox = (title, config) => {
  return useQuery({
    queryKey: ['teamInfoBox', title],
    queryFn: () => getTeamInfobox(title),
    ...config,
  });
};
