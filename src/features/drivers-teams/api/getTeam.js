import { useQuery } from 'react-query';
import { axios } from '../../../lib/axios';

export const getTeam = (id) => {

    let params = {}
    if(id !== undefined){
        params.id = id;
    }

  return axios.get(`teams`, {
    params: params,
  });
};

export const useTeam = (id) => {
  return useQuery({
    queryKey: ['team', id],
    queryFn: () => getTeam(id),
    // ...config,
  });
};
