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

import { groupBy } from 'lodash';

// import { groupBy } from '../../../utils/groupBy';

import { testData } from './testData';

const RaceRow = ({ race }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <div className="flex my-auto">
            {/* <img /> flag here*/}
            <div>
              <Typography>{race[1][0].competition.name}</Typography>
              <Typography>{race[1][0].circuit.name}</Typography>
            </div>
          </div>
        </TableCell>
        <TableCell>{race[1][0].date.toString()}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <CollapsibleTable
            rows={[race[1][1], race[1][2], race[1][3], race[1][4]]}
            columns={[1, 2, 3, 4]}
            open={open}
          ></CollapsibleTable>
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
    let columns = ["", "Grand Prix", "Date"];

    // console.log(rows);

    let raceRows2 = (
      <>
        {rows.map((race) => {
          console.log(race);
          return <RaceRow race={race}></RaceRow>;
        })}
      </>
    );

    let raceRows = rows.map((race) => {
      console.log(race);
      return <RaceRow race={race}></RaceRow>;
    });

    return <GenericTable rows={raceRows2} columns={columns}></GenericTable>;
  }
};
