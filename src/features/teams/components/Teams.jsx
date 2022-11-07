import React, { useContext } from 'react';
import { useTeamRankings } from '../../rankings/api/getTeamRankings';
import TeamCard from './TeamCard';
import SeasonFilter from '../../../components/Select/SeasonFilter';
import SeasonContext from '../../../context/SeasonContext';
import { Typography } from '@mui/material';

function Teams() {
  const { year } = useContext(SeasonContext);
  const teamsQuery = useTeamRankings(year);

  if (teamsQuery.isSuccess) {
    const teams =
      teamsQuery.data.data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings;

    if (!teams) {
      return (
        <>
          <SeasonFilter />
          <Typography
            variant="h5"
            className="text-center mb-8"
          >{`${year} Formula 1 Constructors`}</Typography>
          <Typography className="text-center mt-8">
            No Constructor Championship found in this year.
          </Typography>
        </>
      );
    } else {
      return (
        <>
          <SeasonFilter />
          <Typography
            variant="h5"
            className="text-center mb-8"
          >{`${year} Formula 1 Constructors`}</Typography>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-auto w-4/5 mt-16 justify-items-center">
            {teams.map((team) => (
              <TeamCard team={team} key={team.Constructor.constructorId} />
            ))}
          </div>
        </>
      );
    }
  }
}

export default Teams;
