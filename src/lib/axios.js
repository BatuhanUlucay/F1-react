import Axios from 'axios';

export const ergastAxios = Axios.create({
  baseURL: 'http://ergast.com/api/f1',
});

export const wikiImageAxios = Axios.create({
  baseURL: 'http://en.wikipedia.org/w/',
});
