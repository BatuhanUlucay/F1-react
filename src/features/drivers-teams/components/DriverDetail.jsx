import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDriverDetails } from '../api/getDriverDetails';
import { useDriverInfobox } from '../api/getDriverInfobox';
import { useDriverPhoto } from '../api/getDriverPhoto';

function DriverDetail() {
  const [wikiTitle, setWikiTitle] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');

  const driverId = useParams().driverId;

  const driverDetailsQuery = useDriverDetails(driverId);

  const driverPhotoQuery = useDriverPhoto(wikiTitle, { enabled: wikiTitle !== '' });

  if (driverDetailsQuery.isSuccess) {
    const driverDetails = driverDetailsQuery.data.data.MRData.DriverTable.Drivers[0];
    const wikiUrl = driverDetails.url;

    if (wikiTitle === '') {
      setWikiTitle(decodeURI(wikiUrl).split('/').pop());
    }

    if (driverPhotoQuery.isSuccess && profilePhoto === '') {
      const temp = driverPhotoQuery.data.data.query.pages[
        Object.keys(driverPhotoQuery.data.data.query.pages)
      ].thumbnail.source
        .replaceAll('thumb/', '')
        .split('/');

      temp.pop();

    //   console.log(temp.join('/'));
      setProfilePhoto(temp.join("/"));
    }
  }

  return (
    <div>
      <img src={profilePhoto} alt="Profile pic" />
    </div>
  );
}

export default DriverDetail;
