import React, { useState } from 'react';
import { useTeamRankings } from '../../rankings/api/getTeamRankings';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link } from 'react-router-dom';

function TeamsDropdown() {
  const [hovered, setHovered] = useState('');
  const teamsQuery = useTeamRankings(new Date().getFullYear());

  const handleMouseOver = (e) => {
    setHovered(e.target.innerText);
  };

  const handleMouseLeave = () => {
    setHovered('');
  };

  //TODO: Take the colors from theme.

  if (teamsQuery.isSuccess) {
    const teams = teamsQuery.data.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    return (
      <div className="w-1/2 h-full mx-auto py-24">
        <div className="grid grid-rows-3 grid-flow-col justify-around">
          {teams.map((team) => {
            return (
              <Link to={`teams/${team.Constructor.constructorId}`} reloadDocument>
                <div
                  className={`h-8 w-56 border-solid border-r border-b border-t-0 border-l-0 rounded-sm ${
                    team.Constructor.name === hovered
                      ? 'border-red-600 text-red-600'
                      : 'border-white text-white'
                  } mx-8 my-4 text-center`}
                  onMouseOver={handleMouseOver}
                  onMouseLeave={handleMouseLeave}
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
