import React from 'react';
import { useTeamDrivers } from '../api/getTeamDrivers';
import Typography from '@mui/material/Typography';


function TeamDrivers({ team }) {
  const teamDriversQuery = useTeamDrivers(team.Constructor.constructorId, 2022);

  if (teamDriversQuery.isSuccess) {
    let drivers = teamDriversQuery.data.data.MRData.DriverTable.Drivers;
    return (
      <div className='m-8'>
        {drivers.map((driver) => {
          return <Typography className='my-auto text-center'>{driver.givenName + ' ' + driver.familyName}</Typography>;
        })}
      </div>
    );
  }
}

export default TeamDrivers;
