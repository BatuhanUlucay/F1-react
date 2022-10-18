import { useQuery } from 'react-query';
import wtf from 'wtf_wikipedia';

export const getDriverInfobox = (title) => {
  return wtf.fetch(title);
};

export const useDriverInfobox = (title, config) => {
  return useQuery({
    queryKey: ['driverInfoBox', title],
    queryFn: () => getDriverInfobox(title),
    ...config,
  });
};
