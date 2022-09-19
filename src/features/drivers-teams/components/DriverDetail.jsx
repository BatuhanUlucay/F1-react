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

  const driverId = useParams().driverId;

  const driverDetailsQuery = useDriverDetails(driverId);

  const driverPhotoQuery = useDriverPhoto(wikiTitle, { enabled: wikiTitle !== '' });

  const driverStats = useDriverStats(driverId);

  if(driverStats.isSuccess){
    // console.log();
    const driverAllRaces = driverStats.data.data.MRData.RaceTable.Races
    calculateDriverStats(driverAllRaces)
  }

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
    return (
      <Card className="w-1/3">
        <div className="w-1/3">
          <CardMedia component="img" alt="Driver photo" height="200" image={profilePhoto} />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {driverDetails.givenName + ' ' + driverDetails.familyName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {driverDetails.dateOfBirth}
            {driverDetails.nationality}
            {driverDetails.permanentNumber}
            {/* TODO:
            Wins
            Points
            Poles
            Last win
            Current team
            */}
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Card>
    );
  }
}

export default DriverDetail;
