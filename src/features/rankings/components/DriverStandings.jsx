import React, { useContext } from 'react';
import SeasonContext from '../../../context/SeasonContext';
import GenericTable from '../../../components/Table/GenericTable';

import { testData } from './driverTestData';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const DriverRow = ({ driver }) => {
  return (
    <TableRow>
      <TableCell />
      <TableCell>{driver.position}</TableCell>
      <TableCell>{driver.driver.name}</TableCell>
      <TableCell>{driver.points}</TableCell>
    </TableRow>
  );
};

function DriverStandings() {
  const { year } = useContext(SeasonContext);

  const columns = ['Position', 'Driver', 'Points'];

  const result = testData.response;

  let driverRows = (
    <>
      {result.map((driver) => {
        console.log(driver);
        return <DriverRow driver={driver}></DriverRow>;
      })}
    </>
  );

  return <GenericTable rows={driverRows} columns={columns} />;
}

export default DriverStandings;
