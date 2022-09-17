import Axios from 'axios';

function requestInterceptor(config) {
  config.headers.Accept = 'application/json';
  return config;
}

export const ergastAxios = Axios.create({
  baseURL: "http://ergast.com/api/f1",
});

export const wikiAxios = Axios.create({
  // baseURL: `http://en.wikipedia.org/w/`
});

export const wikiImageAxios = Axios.create({
  baseURL: "http://en.wikipedia.org/w/"
});