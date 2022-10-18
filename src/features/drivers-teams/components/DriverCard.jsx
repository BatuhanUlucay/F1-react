import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useDriverPhoto } from '../api/getDriverPhoto';
import { Link } from 'react-router-dom';

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
      <Link to={`/drivers/${driver.Driver.driverId}`} className="no-underline text-black">
        <div className="w-96 h-96 border-solid border-r border-t border-b-0 border-l-0">
          <div className="flex w-full relative">
            <Typography variant="h4">{driver.position}</Typography>
            <Typography className="absolute right-1 my-2">{driver.points} points</Typography>
          </div>
          <Divider />
          <div className="w-full h-auto grid grid-cols-2 my-8">
            <img alt="Driver" src={photo} className="w-full h-full object-fit" />
            <div className="ml-6">
              <Typography variant="h6">{`${driver.Driver.givenName} ${driver.Driver.familyName}`}</Typography>
              <Typography
                variant="h7"
                className="text-sm"
              >{`${driver.Constructors[0].name}`}</Typography>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default DriverCard;
