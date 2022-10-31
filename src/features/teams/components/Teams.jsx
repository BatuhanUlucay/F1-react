import React, { useContext } from 'react';
import { useTeamRankings } from '../../rankings/api/getTeamRankings';
import TeamCard from './TeamCard';
import SeasonFilter from '../../../components/Select/SeasonFilter';
import SeasonContext from '../../../context/SeasonContext';

function Teams() {
  const { year } = useContext(SeasonContext);
  const teamsQuery = useTeamRankings(year);

  if (teamsQuery.isSuccess) {
    const teams = teamsQuery.data.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

    return (
      <>
        <SeasonFilter />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-auto w-4/5 mt-16 justify-items-center">
          {teams.map((team) => (
            <TeamCard team={team} />
          ))}
        </div>
      </>
    );
  }
}

export default Teams;
