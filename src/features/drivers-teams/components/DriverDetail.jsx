import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDriverDetails } from '../api/getDriverDetails';
import { useDriverPhoto } from '../api/getDriverPhoto';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useDriverStats } from '../api/getDriversStats';
import { calculateDriverChamps, calculateDriverStats } from '../../../util/calculateDriverStats';
import { useDriverChamps } from '../api/getDriverChamps';
import { Link } from 'react-router-dom';

function DriverDetail() {
  const [wikiTitle, setWikiTitle] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [stats, setStats] = useState();
  const [champs, setChamps] = useState(0);

  const driverId = useParams().driverId;
  const driverDetailsQuery = useDriverDetails(driverId);
  const driverPhotoQuery = useDriverPhoto(wikiTitle, { enabled: !!wikiTitle });
  const driverStatsQuery = useDriverStats(driverId);
  const driverChampsQuery = useDriverChamps(driverId);

  if (driverDetailsQuery.isSuccess) {
    const driverDetails = driverDetailsQuery.data.data.MRData.DriverTable.Drivers[0];
    const wikiUrl = driverDetails.url;

    if (!wikiTitle) {
      setWikiTitle(decodeURI(wikiUrl).split('/').pop());
    }

    if (
      driverPhotoQuery.isSuccess &&
      profilePhoto === '' &&
      driverStatsQuery.isSuccess &&
      driverChampsQuery.isSuccess
    ) {
      const profilePic = driverPhotoQuery.data.data.query.pages[
        Object.keys(driverPhotoQuery.data.data.query.pages)
      ].thumbnail.source
        .replaceAll('thumb/', '')
        .split('/');

      const driverAllRaces = driverStatsQuery.data.data.MRData.RaceTable.Races;

      profilePic.pop();

      setProfilePhoto(profilePic.join('/'));

      if (!stats) setStats(calculateDriverStats(driverAllRaces));

      const allSeasons = driverChampsQuery.data.data.MRData.StandingsTable.StandingsLists;
      setChamps(calculateDriverChamps(allSeasons));
    }

    return (
      <Card className="lg:w-2/3 mx-auto lg:flex mt-24">
        <div className="md:w-1/3 w-2/3 mx-auto">
          <CardMedia component="img" alt="Driver photo" image={profilePhoto} />
        </div>
        <CardContent className="mx-auto md:w-1/2 w-full">
          <Typography variant="h2" component="div" className="mb-8 text-center">
            {driverDetails.givenName + ' ' + driverDetails.familyName}
          </Typography>
          <div className="grid grid-cols-2 mt-16">
            <Typography className="font-bold text-2xl">Nationality</Typography>
            <Typography className="font-medium text-2xl">{driverDetails.nationality}</Typography>
          </div>
          <div className="grid grid-cols-2">
            <Typography className="font-bold text-2xl">Age</Typography>
            <Typography className="font-medium text-2xl">
              {new Date().getFullYear() - driverDetails.dateOfBirth.split('-')[0]}
            </Typography>
          </div>
          <div className="grid grid-cols-2">
            <Typography className="font-bold text-2xl">Permanent number</Typography>
            <Typography className="font-medium text-2xl">
              {driverDetails.permanentNumber}
            </Typography>
          </div>
          <div className="grid grid-cols-2">
            <Typography className="font-bold text-2xl">Championships</Typography>
            <Typography className="font-medium text-2xl">{champs}</Typography>
          </div>
          {stats && (
            <>
              <div className="grid grid-cols-2">
                <Typography className="font-bold text-2xl">Carreer Points</Typography>
                <Typography className="font-medium text-2xl">{stats[0]}</Typography>
              </div>
              <div className="grid grid-cols-2">
                <Typography className="font-bold text-2xl">Carreer Wins</Typography>
                <Typography className="font-medium text-2xl">{stats[1]}</Typography>
              </div>
              <div className="grid grid-cols-2">
                <Typography className="font-bold text-2xl">Carreer Podiums</Typography>
                <Typography className="font-medium text-2xl">{stats[2]}</Typography>
              </div>
              <div className="grid grid-cols-2">
                <Typography className="font-bold text-2xl">First Entry</Typography>
                <Typography className="font-medium text-2xl">{stats[3]}</Typography>
              </div>
              <div className="grid grid-cols-2">
                <Typography className="font-bold text-2xl">Latest Team</Typography>
                <Link to={`/teams/${stats[4].constructorId}`}>
                  <Typography className="font-medium text-2xl">{stats[4].name}</Typography>
                </Link>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    );
  }
}

export default DriverDetail;
