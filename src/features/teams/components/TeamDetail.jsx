import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTeamDetails } from '../api/getTeamDetail';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
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
        <Card className="lg:w-2/3 mx-auto mt-24">
          <div className=" w-1/3 mx-auto my-auto">
            <CardMedia component="img" alt="TeamLogo" image={imgSource} />
          </div>
          <CardContent className="mx-auto w-2/3">
            <div className="grid grid-cols-2 mt-16 w-2/3 mx-auto">
              <Typography className="font-bold text-2xl mt-4">Name</Typography>
              <Typography className="font-medium text-md mt-4">{teamDetails.name}</Typography>
              {Object.keys(info).map((keyString) => (
                <>
                  <Typography className="font-bold text-2xl mt-4" key={keyString}>
                    {keyString[0].toUpperCase() + keyString.slice(1)}
                  </Typography>
                  <Typography className="font-medium text-md mt-4">{info[keyString]}</Typography>
                </>
              ))}
              <Typography className="font-bold text-2xl mt-4">Championships</Typography>
              <Typography className="font-medium text-md mt-4">{championships}</Typography>
              <Typography className="font-bold text-2xl mt-4">Drivers</Typography>
              <Typography className="mt-4">
                {drivers.map((driver) => (
                  <Link to={`/drivers/${driver.driverId}`} key={driver.driverId}>
                    <Typography className="font-medium text-md">{`${driver.givenName} ${driver.familyName}`}</Typography>
                  </Link>
                ))}
              </Typography>
            </div>
          </CardContent>
        </Card>
      );
    }
  }
}

export default TeamDetail;
