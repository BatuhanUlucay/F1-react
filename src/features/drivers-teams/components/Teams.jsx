import React from 'react';
import { useTeamRankings } from '../../rankings/api/getTeamRankings';
import TeamCards from './TeamCards';

function Teams() {
  //const teamsQuery = useTeamRankings(new Date().getFullYear());

  //   if (teamsQuery.isSuccess) {

  if (true) {
    let teamIds = [];

    const teams = teamsQuery.data.response;

    for (let i = 0; i < teams.length; i++) {
      teamIds.push(teams[i].team.id);
    }

    console.log(teamIds);

    return (
      <div>
        <TeamCards ids={teamIds} />
      </div>
    );
  }
}

export default Teams;
