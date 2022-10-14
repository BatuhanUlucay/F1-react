import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTeamDetails } from '../api/getTeamDetail';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTeamInfobox } from '../api/getTeamInfobox';
import { getLogoUrlFromInfobox } from '../../../util/getLogoUrlFromInfobox';
import { parseTeamInfo } from '../../../util/parseTeamInfo';
import { useTeamDrivers } from '../api/getTeamDrivers';
import { useTeamStats } from '../api/getTeamStats';
import { Link } from 'react-router-dom';
import { calculateTeamStats } from '../../../util/calculateTeamStats';

function TeamDetail() {
  const [imgSource, setImgSource] = useState('');
  const [wikiTitle, setWikiTitle] = useState('');

  const params = useParams();

  const teamDetailsQuery = useTeamDetails(params.teamId);
  const infoboxQuery = useTeamInfobox(wikiTitle, { enabled: wikiTitle !== '' });
  const teamDriversQuery = useTeamDrivers(params.teamId, 2022);
  const teamStatsQuery = useTeamStats(params.teamId);

  if (teamDetailsQuery.isSuccess) {
    const teamDetails = teamDetailsQuery.data.data.MRData.ConstructorTable.Constructors[0];
    const wikiUrl = teamDetails.url;

    if (wikiTitle === '') {
      setWikiTitle(wikiUrl.split('/').pop());
    }

    if (infoboxQuery.isSuccess && teamDriversQuery.isSuccess && teamStatsQuery.isSuccess) {
      const wikiInfobox = infoboxQuery.data.infobox();
      if (imgSource === '') getLogoUrlFromInfobox(wikiInfobox, setImgSource);

      const info = parseTeamInfo(wikiInfobox.data);

      const drivers = teamDriversQuery.data.data.MRData.DriverTable.Drivers;

      const championships = calculateTeamStats(
        teamStatsQuery.data.data.MRData.StandingsTable.StandingsLists
      );

      return (
        <div className="max-w-7xl mx-auto shadow-2xl mt-24 grid grid-cols-2">
          <Card className="grid grid-cols-2">
            <div className="w-2/3 mx-auto my-auto">
              <CardMedia
                component="img"
                alt="team logo"
                image={imgSource}
                className="border-solid p-12 border-2"
              />
            </div>
            <CardContent>
              <div className="my-4">
                <Typography gutterBottom variant="h5" component="h2">
                  {teamDetails.name}
                </Typography>
              </div>
              {Object.keys(info).map((keyString) => (
                <Box className="my-2" key={keyString}>
                  {keyString[0].toUpperCase() + keyString.slice(1)} : {info[keyString]}
                </Box>
              ))}
              <Box className="my-2">Constructor Championships : {championships}</Box>
              <Box className="my-2">
                Drivers :{' '}
                {drivers.map((driver) => (
                  <Link to={`/drivers/${driver.driverId}`} key={driver.driverId}>
                    <Typography>{`${driver.givenName} ${driver.familyName}`}</Typography>
                  </Link>
                ))}
              </Box>
            </CardContent>
          </Card>
        </div>
      );
    }
  }
}

export default TeamDetail;
