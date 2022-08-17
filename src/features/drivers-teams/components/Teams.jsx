import React from 'react';
import { useTeamRankings } from '../../rankings/api/getTeamRankings';
import TeamCards from './TeamCards';
import { testData } from '../../rankings/components/teamsTestData';

function Teams() {
  //const teamsQuery = useTeamRankings(new Date().getFullYear());

  //   if (teamsQuery.isSuccess) {

  if (true) {
    let teamIds = [];



    const teams = testData.response;

    for (let i = 0; i < teams.length; i++) {
      teamIds.push(teams[i].team.id);
    }

    console.log(teamIds);

    return (
      <div className=''>
        <TeamCards ids={teamIds} />
      </div>
    );
  }
}

export default Teams;
