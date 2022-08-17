import React, { useContext } from 'react';
import SeasonContext from '../../../context/SeasonContext';
import GenericTable from '../../../components/Table/GenericTable';

import { testData } from './driverTestData';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { useDriverRankings } from '../api/getDriverRankings';

const DriverRow = ({ driver }) => {
  return (
    <TableRow>
      <TableCell />
      <TableCell>{driver.position}</TableCell>
      <TableCell>{driver.Driver.givenName + " " + driver.Driver.familyName}</TableCell>
      <TableCell>{driver.points}</TableCell>
    </TableRow>
  );
};

function DriverStandings() {
  const { year } = useContext(SeasonContext);

  const columns = ['Position', 'Driver', 'Points'];

  const driverRankingsQuery = useDriverRankings("2022");

    const driverRankings = driverRankingsQuery.data.data.MRData.StandingsTable.StandingsLists[0].DriverStandings

  if(driverRankingsQuery.isSuccess){

      let driverRows = (
          <>
          {driverRankings.map((driver) => {
            console.log(driver);
              return <DriverRow driver={driver}></DriverRow>;
        })}
            </>
      
      
      );  return <GenericTable rows={driverRows} columns={columns} />;
}

}

export default DriverStandings;
