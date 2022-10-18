import React from 'react';
import { useTeamRankings } from '../../rankings/api/getTeamRankings';
import TeamCard from './TeamCard';

function Teams() {
  //TODO: get the season info from context.
  const teamsQuery = useTeamRankings(2022);

  if (teamsQuery.isSuccess) {
    const teams = teamsQuery.data.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

    return (
        // <TeamCards teams={teams} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-auto w-4/5 mt-36 justify-items-center">
        {teams.map((team) => (
          <TeamCard team={team} />
        ))}
      </div>
    );
  }
}

export default Teams;
