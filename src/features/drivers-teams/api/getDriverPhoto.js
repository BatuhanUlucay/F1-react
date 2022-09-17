import { useQuery } from 'react-query';
import { wikiImageAxios } from '../../../lib/axios';

export const getDriverPhoto = (wikiTitle) => {
  return wikiImageAxios.get(`api.php`, {
    params: { action: 'query', prop: 'pageimages', format: 'json', titles: wikiTitle, origin: "*" },
  });
};

export const useDriverPhoto = (wikiTitle, config) => {
  return useQuery({
    queryKey: ['driverPhoto', wikiTitle],
    queryFn: () => getDriverPhoto(wikiTitle),
    ...config,
  });
};
