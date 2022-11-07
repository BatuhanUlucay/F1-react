import React, { useState } from 'react';
import { useDriverRankings } from '../../rankings/api/getDriverRankings';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material';

function DriversDropdown() {
  const [hovered, setHovered] = useState('');
  const driverRankingsQuery = useDriverRankings(new Date().getFullYear());
  const theme = useTheme();

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
              <Link
                key={driver.Driver.driverId}
                to={`drivers/${driver.Driver.driverId}`}
                reloadDocument
                className="no-underline text-inherit"
              >
                <div
                  className={`w-56 h-8 border-solid border-r border-b border-t-0 border-l-0 rounded-sm  mx-2 my-2 text-center gap-4`}
                  onMouseOver={handleMouseOver}
                  onMouseLeave={handleMouseLeave}
                  style={
                    driver.Driver.givenName + ' ' + driver.Driver.familyName === hovered
                      ? {
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                        }
                      : {
                          borderColor: theme.palette.secondary.main,
                          color: theme.palette.secondary.main,
                        }
                  }
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
