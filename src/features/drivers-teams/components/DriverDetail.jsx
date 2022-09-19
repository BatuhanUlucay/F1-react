import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDriverDetails } from '../api/getDriverDetails';
import { useDriverInfobox } from '../api/getDriverInfobox';
import { useDriverPhoto } from '../api/getDriverPhoto';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDriverStats } from '../api/getDriversStats';
import { calculateDriverStats } from '../../../util/calculateDriverStats';

//TODO:CLEAN UP HERE

function DriverDetail() {
  const [wikiTitle, setWikiTitle] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [stats, setStats] = useState();

  const driverId = useParams().driverId;
  const driverDetailsQuery = useDriverDetails(driverId);
  const driverPhotoQuery = useDriverPhoto(wikiTitle, { enabled: wikiTitle !== '' });
  const driverStats = useDriverStats(driverId);

  if (driverDetailsQuery.isSuccess) {
    const driverDetails = driverDetailsQuery.data.data.MRData.DriverTable.Drivers[0];
    const wikiUrl = driverDetails.url;
    // console.log('wikiUrl', wikiUrl);

    if (wikiTitle === '') {
      setWikiTitle(decodeURI(wikiUrl).split('/').pop());
    }

    if (driverPhotoQuery.isSuccess && profilePhoto === '') {
      const temp =
        driverPhotoQuery.data.data.query.pages[Object.keys(driverPhotoQuery.data.data.query.pages)];

      //TODO: some of the photos are not coming from wiki api.
      // console.log('title', wikiTitle);

      // console.log('temp', temp);
      const temp2 = temp.thumbnail;

      // console.log('temp2', temp2);
      const temp3 = temp2.source?.replaceAll('thumb/', '').split('/');

      temp3.pop();

      // console.log('URL', temp3.join('/'));

      setProfilePhoto(temp3.join('/'));

      console.log(driverDetails);
    }
    if (driverStats.isSuccess) {
      const driverAllRaces = driverStats.data.data.MRData.RaceTable.Races;

      if (!stats) setStats(calculateDriverStats(driverAllRaces));
      // console.log(stats);
    }

    return (
      <Card className="w-2/3 mx-auto flex">
        <div className="w-1/5 h-1/5" >
          <CardMedia component="img" alt="Driver photo" image={profilePhoto} />
        </div>
        <CardContent className='ml-8'>
          <Typography variant="h5" component="div" className='mb-8'>
            {driverDetails.givenName + ' ' + driverDetails.familyName}
          </Typography>
          <Typography color="text.primary">
            {`Birthday : ${driverDetails.dateOfBirth}`}
          </Typography>
          <Typography>{`Nationality : ${driverDetails.nationality}`}</Typography>
          <Typography>{`Permanent number : ${driverDetails.permanentNumber}`}</Typography>
          {stats && (
            <>
              <Typography>{`Career points : ${stats[0]}`}</Typography>
              <Typography>{`Career wins : ${stats[1]}`}</Typography>
              <Typography>{`Career podiums : ${stats[2]}`}</Typography>
            </>
          )}

          {/* TODO:
            Last win
            Current team
          */}
        </CardContent>
      </Card>
    );
  }
}

export default DriverDetail;
