import React from 'react';
import { useTeamDrivers } from '../api/getTeamDrivers';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function TeamDrivers({ team }) {
  const teamDriversQuery = useTeamDrivers(team.Constructor.constructorId, 2022);

  if (teamDriversQuery.isSuccess) {
    let drivers = teamDriversQuery.data.data.MRData.DriverTable.Drivers;
    return (
      <div className="m-8">
        {drivers.map((driver) => {
          return (
            <Link to={`/drivers/${driver.driverId}`} key={driver.driverId}>
              <Typography className="my-auto text-center">
                {driver.givenName + ' ' + driver.familyName}
              </Typography>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default TeamDrivers;
