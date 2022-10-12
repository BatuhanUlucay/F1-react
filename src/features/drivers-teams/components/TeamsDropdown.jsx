import React from 'react';
import { useTeamRankings } from '../../rankings/api/getTeamRankings';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function TeamsDropdown() {
  const teamsQuery = useTeamRankings(new Date().getFullYear());

  if (teamsQuery.isSuccess) {
    const teams = teamsQuery.data.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    return (
      <div className="w-1/2 h-full mx-auto py-24">
        <div className="grid grid-rows-3 grid-flow-col justify-around">
          {teams.map((team) => {
            return (
              <div className="text-white h-8 w-56 border-solid border-r border-b border-t-0 border-l-0 rounded-sm border-white mx-8 my-4 text-center">
                {team.Constructor.name}
                <KeyboardArrowRightIcon className="float-right" />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default TeamsDropdown;
