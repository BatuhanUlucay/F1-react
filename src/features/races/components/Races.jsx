import React, { useState } from 'react';
import { useRaces } from '../api/getRaces';
import GenericTable from '../../../components/Table/GenericTable';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Typography } from '@mui/material';
import CollapsibleTable from '../../../components/Table/CollapsibleTable';
import DateCard from '../../../components/Date/DateCard';
import { groupBy } from 'lodash';

import { testData } from './testData';
import SeasonFilter from '../../../components/Select/SeasonFilter';

const RaceRow = ({ race }) => {
  const [open, setOpen] = useState(false);

  const sessions = race[1].sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  const sessionsRows = sessions.map((session) => {
    return (
      <TableRow>
        <TableCell></TableCell>
        <TableCell>{session.type}</TableCell>
        <TableCell>{session.date}</TableCell>
      </TableRow>
    );
  });

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <div className="flex my-auto">
            {/* <img /> flag here*/}
            <div className="">
              <Typography>{race[1][0].competition.name}</Typography>
              <Typography className="text-xs">{race[1][0].circuit.name}</Typography>
            </div>
          </div>
        </TableCell>
        <TableCell>{<DateCard date={new Date(race[1][0].date)} />}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="pb-0 pt-0" colSpan={6}>
          <CollapsibleTable rows={sessionsRows} open={open}></CollapsibleTable>
        </TableCell>
      </TableRow>
    </>
  );
};

export const Races = () => {
  //const racesQuery = useRaces('2022', '11');

  if (true) {
    const groupedSessions = groupBy(testData, (data) => {
      return data.competition.id;
    });

    let rows = Object.entries(groupedSessions);
    let columns = ['Grand Prix', 'Date'];

    let raceRows = (
      <>
        {rows.map((race) => {
          console.log(race);
          return <RaceRow race={race}></RaceRow>;
        })}
      </>
    );

    return (
      <>
        <SeasonFilter />
        <GenericTable rows={raceRows} columns={columns}></GenericTable>;
      </>
    );
  }
};
