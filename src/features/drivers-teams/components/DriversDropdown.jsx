import React from 'react';
import { useDriverRankings } from '../../rankings/api/getDriverRankings';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function DriversDropdown() {
  const driverRankingsQuery = useDriverRankings(new Date().getFullYear());

  if (driverRankingsQuery.isSuccess) {
    const drivers =
      driverRankingsQuery.data.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    return (
      <div className="w-3/4 h-full mx-auto py-24">
        <div className="grid grid-rows-5 grid-flow-col justify-around">
          {drivers.map((driver) => {
            return (
              <div className="text-white w-56 h-8 border-solid border-r border-b border-t-0 border-l-0 rounded-sm border-white mx-2 my-2 text-center gap-4">
                <div>
                  {driver.Driver.givenName + ' ' + driver.Driver.familyName}{' '}
                  <KeyboardArrowRightIcon className="float-right" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default DriversDropdown;
