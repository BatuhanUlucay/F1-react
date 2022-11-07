import React, { useState } from 'react';
import { useTeamRankings } from '../../rankings/api/getTeamRankings';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material';

function TeamsDropdown() {
  const [hovered, setHovered] = useState('');
  const teamsQuery = useTeamRankings(new Date().getFullYear());
  const theme = useTheme();

  const handleMouseOver = (e) => {
    setHovered(e.target.innerText);
  };

  const handleMouseLeave = () => {
    setHovered('');
  };

  if (teamsQuery.isSuccess) {
    const teams = teamsQuery.data.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    return (
      <div className="w-1/2 h-full mx-auto py-24">
        <div className="grid grid-rows-3 grid-flow-col justify-around">
          {teams.map((team) => {
            return (
              <Link
                to={`teams/${team.Constructor.constructorId}`}
                reloadDocument
                className="no-underline text-inherit"
              >
                <div
                  className={`h-8 w-56 border-solid border-r border-b border-t-0 border-l-0 rounded-sm mx-8 my-4 text-center`}
                  onMouseOver={handleMouseOver}
                  onMouseLeave={handleMouseLeave}
                  style={
                    team.Constructor.name === hovered
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
                  {team.Constructor.name}
                  <KeyboardArrowRightIcon className="float-right" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default TeamsDropdown;
