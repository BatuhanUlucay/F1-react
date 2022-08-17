import React, { useContext } from 'react';
import SeasonContext from '../../../context/SeasonContext';
import GenericTable from '../../../components/Table/GenericTable';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useTeamRankings } from '../api/getTeamRankings';

const ConstructorRow = ({ constructor }) => {
  return (
    <TableRow>
      <TableCell />
      <TableCell>{constructor.position}</TableCell>
      <TableCell>{constructor.Constructor.name}</TableCell>
      <TableCell>{constructor.points}</TableCell>
    </TableRow>
  );
};

function ConstructorStandings() {
  const { year } = useContext(SeasonContext);

  const teamRankingsQuery = useTeamRankings(2022);

  const columns = ['Position', 'Constructor', 'Points'];

  if (teamRankingsQuery.isSuccess) {
    const result =
      teamRankingsQuery.data.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

    console.log(result);

    let constructorRows = (
      <>
        {result.map((team) => {
          console.log(team);
          return <ConstructorRow constructor={team}></ConstructorRow>;
        })}
      </>
    );
    return <GenericTable rows={constructorRows} columns={columns} />;
  }
}

export default ConstructorStandings;
