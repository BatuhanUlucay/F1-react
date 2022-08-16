import React, { useContext } from 'react';
import SeasonContext from '../../../context/SeasonContext';
import GenericTable from '../../../components/Table/GenericTable';

import { testData } from './teamsTestData';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const ConstructorRow = ({ constructor }) => {
  return (
    <TableRow>
      <TableCell />
      <TableCell>{constructor.position}</TableCell>
      <TableCell>{constructor.team.name}</TableCell>
      <TableCell>{constructor.points}</TableCell>
    </TableRow>
  );
};

function ConstructorStandings() {
  const { year } = useContext(SeasonContext);

  const columns = ['Position', 'Constructor', 'Points'];

  const result = testData.response;

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

export default ConstructorStandings;
