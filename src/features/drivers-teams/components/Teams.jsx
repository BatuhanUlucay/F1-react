import React from 'react';
import { useTeamRankings } from '../../rankings/api/getTeamRankings';
import TeamCards from './TeamCards';
import { testData } from '../../rankings/components/teamsTestData';
import { useTeams } from '../api/getTeams';

function Teams() {
  //TODO: get the season info from context.
  const teamsQuery = useTeamRankings(2022);

  if (teamsQuery.isSuccess) {
    
    const teams = teamsQuery.data.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings

    console.log(teams);

    return (
      <div>
        <TeamCards teams={teams} />
      </div>
    );
  }
}

export default Teams;
