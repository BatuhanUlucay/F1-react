import React from 'react'
import { useParams } from 'react-router-dom'
import { useTeamDetails } from '../api/getTeamDetail';

function TeamDetail() {

    const params = useParams();

    console.log(params.teamId);

    const teamDetailsQuery = useTeamDetails(params.teamId);

    if(teamDetailsQuery.isSuccess){

        console.log(teamDetailsQuery.data.data.MRData.ConstructorTable.Constructors[0]);
    }

  return (
    <div>TeamDetail</div>
  )
}

export default TeamDetail