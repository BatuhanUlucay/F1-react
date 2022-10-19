import React, { useState, useContext, useCallback } from 'react';
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
import { convertDate, convertTimeZone } from '../../../util/DateConverter';
import SeasonFilter from '../../../components/Select/SeasonFilter';
import SeasonContext from '../../../context/SeasonContext';
import { Link } from 'react-router-dom';

const lookup = require('coordinate_to_country');

const RaceRow = ({ race, latest, passed }) => {
  const [open, setOpen] = useState(latest);

  const latestRaceRef = useCallback((node) => {
    if (node !== null) {
      node.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  let sessions = [];

  if (race.FirstPractice) {
    sessions.push({
      name: 'First Practice',
      date: race.FirstPractice.date,
      time: race.FirstPractice.time,
    });
  }
  if (race.SecondPractice) {
    sessions.push({
      name: 'Second Practice',
      date: race.SecondPractice.date,
      time: race.SecondPractice.time,
    });
  }
  if (race.ThirdPractice) {
    sessions.push({
      name: 'Third Practice',
      date: race.ThirdPractice.date,
      time: race.ThirdPractice.time,
    });
  }
  if (race.Qualifying) {
    sessions.push({
      name: 'Qualifying',
      date: race.Qualifying.date,
      time: race.Qualifying.time,
    });
  }
  if (race.Sprint) {
    sessions.push({
      name: 'Sprint',
      date: race.Sprint.date,
      time: race.Sprint.time,
    });
  }
  if (race) {
    sessions.push({
      name: 'Race',
      date: race.date,
      time: race.time,
    });
  }

  sessions.sort();

  const sessionsRows = sessions.map((session) => (
    <TableRow>
      <TableCell></TableCell>
      <TableCell>{session.name}</TableCell>
      <TableCell>
        {convertDate(session.date).toLocaleString('default', {
          day: 'numeric',
          month: 'long',
          weekday: 'long',
        })}
      </TableCell>
      <TableCell>
        {convertTimeZone(session.time)[0] + '.' + convertTimeZone(session.time)[1]}
      </TableCell>
    </TableRow>
  ));

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <div className="md:flex relative" ref={latest ? latestRaceRef : undefined}>
            <img
              className="m-4"
              src={`https://countryflagsapi.com/png/${lookup(
                +race.Circuit.Location.lat,
                +race.Circuit.Location.long,
                true
              )}`}
              alt="Flag"
              height={40}
              width={60}
            />
            <div className="my-auto">
              <Typography>{race.raceName}</Typography>
              <Typography className="text-xs">{race.Circuit.circuitName}</Typography>
              {passed && (
                <Link to={`/results/${race.season}/${race.round}`}>
                  <Typography className="absolute right-4 md:top-6 top-12">Results</Typography>
                </Link>
              )}
            </div>
          </div>
        </TableCell>
        <TableCell>{<DateCard date={new Date(race.date)} />}</TableCell>
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
  const { year } = useContext(SeasonContext);

  const racesQuery = useRaces(year);

  if (racesQuery.isSuccess) {
    const rows = racesQuery.data.data.MRData.RaceTable.Races;

    //User is viewing current seasons page.
    if (year === new Date().getFullYear()) {
      let latest = 0;

      for (let i = 0; i < rows.length; i++) {
        if (new Date() < new Date(rows[i].date)) {
          latest = i;
          break;
        }
        rows[i].passed = true;
      }
      rows[latest].latest = true;
    }

    let columns = ['Grand Prix', 'Date'];
    let raceRows = (
      <>
        {rows.map((race) => {
          return <RaceRow race={race} latest={race.latest} passed={race.passed}></RaceRow>;
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
