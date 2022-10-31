import React, { useContext } from 'react';
import { useDriverRankings } from '../../rankings/api/getDriverRankings';
import DriverCard from './DriverCard';
import SeasonFilter from '../../../components/Select/SeasonFilter';
import SeasonContext from '../../../context/SeasonContext';

function Drivers() {
  const { year } = useContext(SeasonContext);
  const driversQuery = useDriverRankings(year);

  if (driversQuery.isSuccess) {
    const drivers = driversQuery.data.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    return (
      <>
        <SeasonFilter />
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 mx-auto w-4/5 mt-16 justify-items-center">
          {drivers.map((driver) => (
            <DriverCard driver={driver} />
          ))}
        </div>
      </>
    );
  }
}

export default Drivers;
