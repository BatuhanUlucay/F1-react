import React from 'react';
import { useDriverRankings } from '../../rankings/api/getDriverRankings';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';

function Drivers() {
  const driversQuery = useDriverRankings(2022);

  if (driversQuery.isSuccess) {
    const drivers = driversQuery.data.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    console.log(drivers);

    return (
      <div className="grid grid-cols-4 gap-4 mx-auto w-4/5 mt-36">
        {drivers.map((driver) => (
          <div className="w-56 h-56 border-solid border-r border-t border-b-0 border-l-0">
            <div className='flex'>
              <Typography>{driver.position} "</Typography>
              <Typography className='float-right'>{driver.points}</Typography>
              {/* TODO: Photo here */}
            </div>
            <Divider />
            <Typography>{driver.Driver.givenName}</Typography>
          </div>
        ))}
      </div>
    );
  }
}

export default Drivers;
