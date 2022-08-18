import { useQuery } from 'react-query';
import { wikiAxios } from '../../../lib/axios';

export const getTeamLogo = (title) => {
  return wikiAxios.get(`https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=pageimages&format=json&pilicense=any&piprop=original&titles=${title}`, {
    // params: { action: 'query', prop:"pageimages", format:"json", piprop:"original", titles: title },
  });
};

export const useTeamLogo = (title) => {
  return useQuery({
    queryKey: ['teamLogo', title],
    queryFn: () => getTeamLogo(title),
    // ...config,
  });
};
