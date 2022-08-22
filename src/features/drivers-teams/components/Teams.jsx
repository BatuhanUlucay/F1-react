import React from 'react';
import { useTeamRankings } from '../../rankings/api/getTeamRankings';
import TeamCards from './TeamCards';

function Teams() {
  //TODO: get the season info from context.
  const teamsQuery = useTeamRankings(2022);

  if (teamsQuery.isSuccess) {
    const teams = teamsQuery.data.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

    return (
        <TeamCards teams={teams} />
    );
  }
}

export default Teams;
