import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useRaceResult } from '../api/getRaceResult';
import GenericTable from '../../../components/Table/GenericTable';
import { TableRow, TableCell } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';

function RaceResult() {
  const { season, round } = useParams();

  const raceResultQuery = useRaceResult(season, round);

  const columns = ['Position', 'Driver', 'Time', 'Status', 'Points', 'Fastest Lap'];

  if (raceResultQuery.isSuccess) {
    const raceResult = raceResultQuery.data.data.MRData.RaceTable.Races[0].Results;

    const resultRows = raceResult.map((row, index) => (
      <TableRow key={index}>
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
        <TableCell>
          {row.FastestLap?.rank === '1' ? <TimerIcon className="fill-purple-700" /> : ''}
        </TableCell>
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
