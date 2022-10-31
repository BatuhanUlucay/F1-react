import React, { useState } from 'react';
import { useDriverRankings } from '../../rankings/api/getDriverRankings';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link } from 'react-router-dom';

function DriversDropdown() {
  const [hovered, setHovered] = useState('');
  const driverRankingsQuery = useDriverRankings(new Date().getFullYear());

  const handleMouseOver = (e) => {
    setHovered(e.target.innerText);
  };

  const handleMouseLeave = () => {
    setHovered('');
  };

  if (driverRankingsQuery.isSuccess) {
    const drivers =
      driverRankingsQuery.data.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    return (
      <div className="w-3/4 h-full mx-auto py-24">
        <div className="grid grid-rows-5 grid-flow-col justify-around">
          {drivers.map((driver) => {
            return (
              <Link to={`drivers/${driver.Driver.driverId}`} reloadDocument className="no-underline text-inherit">
                <div
                  className={`w-56 h-8 border-solid border-r border-b border-t-0 border-l-0 rounded-sm ${
                    driver.Driver.givenName + ' ' + driver.Driver.familyName === hovered
                      ? 'border-red-600 text-red-600'
                      : 'border-white text-white'
                  } mx-2 my-2 text-center gap-4`}
                  onMouseOver={handleMouseOver}
                  onMouseLeave={handleMouseLeave}
                >
                  <div>
                    {driver.Driver.givenName + ' ' + driver.Driver.familyName}{' '}
                    <KeyboardArrowRightIcon className="float-right" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default DriversDropdown;
