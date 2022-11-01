import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useDriverPhoto } from '../api/getDriverPhoto';
import { Link } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';

function DriverCard({ driver }) {
  const [photo, setPhoto] = useState('');
  const [wikiTitle, setWikiTitle] = useState('');
  const driverPhotoQuery = useDriverPhoto(wikiTitle, { enabled: !!wikiTitle });
  useEffect(() => {
    const wikiUrl = driver.Driver.url;
    setWikiTitle(decodeURI(wikiUrl).split('/').pop());

    if (driverPhotoQuery.isSuccess) {
      let profilePic =
        driverPhotoQuery.data.data.query.pages[Object.keys(driverPhotoQuery.data.data.query.pages)]
          .thumbnail?.source;

      if (profilePic) {
        profilePic = profilePic.replaceAll('thumb/', '').split('/');
        profilePic.pop();
        setPhoto(profilePic.join('/'));
      }
    }
  }, [driver.Driver.url, driverPhotoQuery]);

  return (
    <Link to={`/drivers/${driver.Driver.driverId}`} className="no-underline text-black">
      <div className="w-96 h-96 border-solid border-r border-t border-b-0 border-l-0 my-10 rounded-xl shadow-2xl">
        <div className="flex w-full relative">
          <Typography variant="h4">{driver.position}</Typography>
          <Typography className="absolute right-1 my-2">{driver.points} points</Typography>
        </div>
        <Divider />
        <div className="w-full h-auto grid grid-cols-2 my-8">
          {photo === '' ? (
            <ImageIcon className="w-full h-full m-auto block" />
          ) : (
            <img alt="Driver" src={photo} className="w-full h-full object-fit" />
          )}

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

export default DriverCard;
