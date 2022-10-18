import React from 'react';
import { useDriverRankings } from '../../rankings/api/getDriverRankings';
import DriverCard from './DriverCard';

function Drivers() {
  const driversQuery = useDriverRankings(2022);

  if (driversQuery.isSuccess) {
    const drivers = driversQuery.data.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    console.log(drivers);

    return (
      <div className="grid grid-cols-3 gap-4 mx-auto w-4/5 mt-36 justify-items-center">
        {drivers.map((driver) => (
          <DriverCard driver={driver} />
        ))}
      </div>
    );
  }
}

export default Drivers;
