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
import ImageIcon from '@mui/icons-material/Image';
import { parsePhotoFromWiki } from '../../../util/parsePhotoFromWiki';

function DriverDetail() {
  const [wikiTitle, setWikiTitle] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [stats, setStats] = useState();
  const [champs, setChamps] = useState(null);

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

    if (driverPhotoQuery.isSuccess && driverStatsQuery.isSuccess && driverChampsQuery.isSuccess) {
      const pp =
        driverPhotoQuery.data.data.query.pages[Object.keys(driverPhotoQuery.data.data.query.pages)]
          .thumbnail?.source;

      const photoSrc = parsePhotoFromWiki(pp);

      if (profilePhoto === null) setProfilePhoto(photoSrc);

      const driverAllRaces = driverStatsQuery.data.data.MRData.RaceTable.Races;

      if (!stats) setStats(calculateDriverStats(driverAllRaces));

      const allSeasons = driverChampsQuery.data.data.MRData.StandingsTable.StandingsLists;
      if (champs === null) setChamps(calculateDriverChamps(allSeasons));
    }

    return (
      <Card className="lg:w-2/3 mx-auto lg:flex mt-24">
        <div className="md:w-1/3 w-2/3 mx-auto">
          {profilePhoto === '' ? (
            <ImageIcon className="w-full h-full m-auto block" />
          ) : (
            <CardMedia component="img" alt="DriverPhoto" image={profilePhoto} />
          )}
        </div>
        <CardContent className="mx-auto md:w-1/2 w-full">
          <Typography variant="h2" component="div" className="mb-8 text-center">
            {driverDetails.givenName + ' ' + driverDetails.familyName}
          </Typography>
          <div className="grid grid-cols-2 mt-16">
            <Typography className="font-bold text-2xl mt-4">Nationality</Typography>
            <Typography className="font-medium text-md mt-4">
              {driverDetails.nationality}
            </Typography>
            <Typography className="font-bold text-2xl mt-4">Age</Typography>
            <Typography className="font-medium text-md mt-4">
              {new Date().getFullYear() - driverDetails.dateOfBirth.split('-')[0]}
            </Typography>
            <Typography className="font-bold text-2xl mt-4">Permanent number</Typography>
            <Typography className="font-medium text-md mt-4">
              {driverDetails.permanentNumber}
            </Typography>
            <Typography className="font-bold text-2xl mt-4">Championships</Typography>
            <Typography className="font-medium text-md mt-4">{champs}</Typography>
          </div>
          {stats && (
            <>
              <div className="grid grid-cols-2">
                <Typography className="font-bold text-2xl mt-4">Carreer Points</Typography>
                <Typography className="font-medium text-md mt-4">{stats[0]}</Typography>
                <Typography className="font-bold text-2xl mt-4">Carreer Wins</Typography>
                <Typography className="font-medium text-md mt-4">{stats[1]}</Typography>
                <Typography className="font-bold text-2xl mt-4">Carreer Podiums</Typography>
                <Typography className="font-medium text-md mt-4">{stats[2]}</Typography>
                <Typography className="font-bold text-2xl mt-4">First Entry</Typography>
                <Typography className="font-medium text-md mt-4">{stats[3]}</Typography>
                <Typography className="font-bold text-2xl mt-4">Latest Team</Typography>
                <Link to={`/teams/${stats[4].constructorId}`}>
                  <Typography className="font-medium text-md mt-4">{stats[4].name}</Typography>
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
