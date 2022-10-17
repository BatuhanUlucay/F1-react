import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useDriverPhoto } from '../api/getDriverPhoto';

function DriverCard({ driver }) {
  const [photo, setPhoto] = useState('');

  const wikiUrl = driver.Driver.url;
  const wikiTitle = decodeURI(wikiUrl).split('/').pop();

  const driverPhotoQuery = useDriverPhoto(wikiTitle);

  if (driverPhotoQuery.isSuccess) {
    const profilePic = driverPhotoQuery.data.data.query.pages[
      Object.keys(driverPhotoQuery.data.data.query.pages)
    ].thumbnail.source
      .replaceAll('thumb/', '')
      .split('/');

    profilePic.pop();

    if (photo === '') setPhoto(profilePic.join('/'));

    return (
      <div className="w-80 h-80 border-solid border-r border-t border-b-0 border-l-0">
        <div className="flex w-full relative">
          <Typography variant="h4">{driver.position}</Typography>
          <Typography className="absolute right-1 my-2">{driver.points} points</Typography>
        </div>
        <Divider />
            <Typography>{`${driver.Driver.givenName} ${driver.Driver.familyName}`}</Typography>
            <Typography>{`${driver.Constructors[0].name}`}</Typography>
        <div className="h-1/2 w-1/2">
          <img alt="Driver" src={photo} width={150} className="float-right mr-5 my-auto object-cover" />
        </div>
      </div>
    );
  }
}

export default DriverCard;
