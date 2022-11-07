## About F1-react

In this project, I've tried to visualize data about Formula 1. This website includes information about races, race results, standings, drivers and teams.

## Project Details

Project is written with [React](https://reactjs.org/). [TailwindCSS](https://tailwindcss.com/) and [Material UI](https://mui.com/) are used for styling.  [Vercel](https://vercel.com/) is used for deployment.

There are several API's that I used for fetching data.

- [Ergast API](http://ergast.com/mrd/) for F1 data from 1950 to today.
- [MediaWiki](https://www.mediawiki.org/wiki/API:Main_page) for getting images and infobox data from Wikipedia pages of drivers and teams.
- [Youtube Data API v3](https://developers.google.com/youtube/v3) for searching highlight videos of completed races.
- [Country Flags API](https://countryflagsapi.com) for getting host countries' flags.

## Project Website
The site can be accessed from [here](https://f1-react.vercel.app/)

## Known bugs and Todos

- Some of the old drivers and teams does not have images.
- I am using [Youtube Data API v3](https://developers.google.com/youtube/v3) for free and therefore, I have 100 request quota of youtube search. When the daily quota is exceeded, this website will not be able to show youtube race highlight videos.
- It needs a lot of styling.