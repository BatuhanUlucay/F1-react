import React, { useContext } from 'react';
import GenericTable from '../../../components/Table/GenericTable';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import SeasonContext from '../../../context/SeasonContext';
import { useDriverRankings } from '../api/getDriverRankings';

const DriverRow = ({ driver }) => {
  return (
    <TableRow>
      <TableCell />
      <TableCell>{driver.position}</TableCell>
      <TableCell>{driver.Driver.givenName + ' ' + driver.Driver.familyName}</TableCell>
      <TableCell>{driver.points}</TableCell>
    </TableRow>
  );
};

function DriverStandings() {
  const { year } = useContext(SeasonContext);
  const columns = ['Position', 'Driver', 'Points'];
  const driverRankingsQuery = useDriverRankings(year);

  if (driverRankingsQuery.isSuccess) {
    const driverRankings =
      driverRankingsQuery.data.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    const driverRows = (
      <>
        {driverRankings.map((driver) => {
          return <DriverRow key={`${driver.Driver.driverId}`} driver={driver}></DriverRow>;
        })}
      </>
    );
    return <GenericTable rows={driverRows} columns={columns} />;
  }
}

export default DriverStandings;
