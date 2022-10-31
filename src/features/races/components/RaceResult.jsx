import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useRaceResult } from '../api/getRaceResult';
import GenericTable from '../../../components/Table/GenericTable';
import { TableRow, TableCell } from '@mui/material';

function RaceResult() {
  const { season, round } = useParams();

  const raceResultQuery = useRaceResult(season, round);

  const columns = ['Position', 'Driver', 'Time', 'Status', 'Points'];

  if (raceResultQuery.isSuccess) {
    const raceResult = raceResultQuery.data.data.MRData.RaceTable.Races[0].Results;

    const resultRows = raceResult.map((row) => (
      <TableRow>
        <TableCell />
        <TableCell>{row.position}</TableCell>
        <TableCell>
          <Link to={`/drivers/${row.Driver.driverId}`} className="no-underline text-inherit">
            {`${row.Driver.givenName} ${row.Driver.familyName}`}
          </Link>
        </TableCell>
        <TableCell>
          {row.status === 'Finished' || row.status.includes('Lap')
            ? row.Time?.time
              ? row.Time.time
              : 'No Time'
            : 'DNF'}
        </TableCell>
        <TableCell>{row.status}</TableCell>
        <TableCell>{row.points}</TableCell>
        <TableCell>{row.FastestLap?.rank === '1' ? 'F' : ''}</TableCell>
      </TableRow>
    ));

    return (
      <div className="mt-32">
        <GenericTable columns={columns} rows={resultRows} />;
      </div>
    );
  }
}

export default RaceResult;
