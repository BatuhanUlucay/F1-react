import React, { useContext } from 'react';
import SeasonContext from '../../../context/SeasonContext';
import GenericTable from '../../../components/Table/GenericTable';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useTeamRankings } from '../api/getTeamRankings';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const ConstructorRow = ({ constructor }) => {
  return (
    <TableRow>
      <TableCell />
      <TableCell>{constructor.position}</TableCell>
      <TableCell>
        <Link
          to={`/teams/${constructor.Constructor.constructorId}`}
          className="no-underline text-inherit"
        >
          {constructor.Constructor.name}
        </Link>
      </TableCell>
      <TableCell>{constructor.points}</TableCell>
    </TableRow>
  );
};

function ConstructorStandings() {
  const { year } = useContext(SeasonContext);
  const teamRankingsQuery = useTeamRankings(year);
  const columns = ['Position', 'Constructor', 'Points'];

  if (teamRankingsQuery.isSuccess) {
    const result =
      teamRankingsQuery.data.data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings;

    if (!result) {
      return (
        <>
          <GenericTable rows={[]} columns={columns} />
          <Typography className="text-center mt-8">
            No Constructor Championship found in this year.
          </Typography>
        </>
      );
    }

    const constructorRows = (
      <>
        {result.map((team) => {
          return (
            <ConstructorRow
              constructor={team}
              key={team.Constructor.constructorId}
            ></ConstructorRow>
          );
        })}
      </>
    );
    return <GenericTable rows={constructorRows} columns={columns} />;
  }
}

export default ConstructorStandings;
