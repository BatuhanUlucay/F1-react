import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useRaceResult } from '../api/getRaceResult';
import { useQualiResult } from '../api/getQualifyingResult';
import { useSprintResult } from '../api/getSprintResults';
import GenericTable from '../../../components/Table/GenericTable';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TableRow, TableCell, Typography } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import { useState } from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useEffect } from 'react';
import axios from 'axios';
import { API_KEY } from '../../../config/index';

function RaceResult() {
  const { season, round } = useParams();
  const [search, setSearch] = useState('');
  const [ytUrl, setYtUrl] = useState('');
  const [value, setValue] = useState(2);

  useEffect(() => {
    getUrl(search);
  }, [search]);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  const getUrl = (keyword) => {
    axios
      .get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          part: 'snippet',
          maxResults: 1,
          q: keyword,
          type: 'video',
          key: API_KEY,
        },
      })
      .then((response) => {
        setYtUrl(response.data.items[0].id.videoId);
      })
      .catch((e) => {
        console.log(e);
        setYtUrl('');
      });
  };

  const raceResultQuery = useRaceResult(season, round);
  const qualiResultQuery = useQualiResult(season, round);
  const sprintResultQuery = useSprintResult(season, round);

  const raceColumns = ['Position', 'Driver', 'Time', 'Status', 'Points', 'Fastest Lap'];
  const sprintColumns = ['Grid Start', 'Position', 'Driver', 'Time', 'Status', 'Points'];
  const qualiColumns = ['Position', 'Driver', 'Time'];

  if (raceResultQuery.isSuccess && qualiResultQuery.isSuccess && sprintResultQuery.isSuccess) {
    const raceResult = raceResultQuery.data.data.MRData.RaceTable.Races[0]?.Results;
    const qualiResult = qualiResultQuery.data.data.MRData.RaceTable.Races[0]?.QualifyingResults;
    const sprintResult = sprintResultQuery.data.data.MRData.RaceTable.Races[0]?.SprintResults;

    console.log(sprintResult);

    if (!search)
      setSearch(
        `${raceResultQuery.data.data.MRData.RaceTable.season} ${raceResultQuery.data.data.MRData.RaceTable.Races[0].raceName} Race Highlights`
      );

    let raceRows = undefined;
    let qualiRows = undefined;
    let sprintRows = undefined;

    if (qualiResult) {
      qualiRows = qualiResult.map((row, index) => (
        <TableRow key={index}>
          <TableCell />
          <TableCell>{row.position}</TableCell>
          <TableCell>
            <Link to={`/drivers/${row.Driver.driverId}`} className="text-inherit">
              {`${row.Driver.givenName} ${row.Driver.familyName}`}
            </Link>
            <div className="text-xs">{row.Constructor.name}</div>
          </TableCell>
          <TableCell>{row.position <= 10 ? row.Q3 : row.position <= 15 ? 'Q2' : 'Q1'}</TableCell>
        </TableRow>
      ));
    }

    if (sprintResult) {
      sprintRows = sprintResult.map((row, index) => (
        <TableRow key={index}>
          <TableCell />
          <TableCell>{row.grid}</TableCell>
          <TableCell>{row.position}</TableCell>
          <TableCell>
            <Link to={`/drivers/${row.Driver.driverId}`} className="text-inherit">
              {`${row.Driver.givenName} ${row.Driver.familyName}`}
            </Link>
            <div className="text-xs">{row.Constructor.name}</div>
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
        </TableRow>
      ));
    }

    if (raceResult) {
      raceRows = raceResult.map((row, index) => (
        <TableRow key={index}>
          <TableCell />
          <TableCell>{row.position}</TableCell>
          <TableCell>
            <Link to={`/drivers/${row.Driver.driverId}`} className="text-inherit">
              {`${row.Driver.givenName} ${row.Driver.familyName}`}
            </Link>
            <div className="text-xs">{row.Constructor.name}</div>
          </TableCell>
          <TableCell>
            {row.status === 'Finished' || row.status.includes('Lap')
              ? row.Time?.time
                ? row.Time.time
                : row.status
              : 'DNF'}
          </TableCell>
          <TableCell>{row.status.includes("Lap") ? "Finished" : row.status}</TableCell>
          <TableCell>{row.points}</TableCell>
          <TableCell>
            {row.FastestLap?.rank === '1' ? <TimerIcon className="fill-purple-700 ml-5" /> : ''}
          </TableCell>
        </TableRow>
      ));
    }

    return (
      <div className="mt-32">
        <Typography
          variant="h5"
          className="text-center mb-8"
        >{`${raceResultQuery.data.data.MRData.RaceTable.season} ${raceResultQuery.data.data.MRData.RaceTable.Races[0].raceName} Results`}</Typography>
        {Number(raceResultQuery.data.data.MRData.RaceTable.season) > 2015 && ytUrl ? (
          <div>
            <a
              href={`https://www.youtube.com/watch?v=${ytUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex justify-center">
                <YouTubeIcon className="mx-2" />
                <Typography>Race highlights are available on YouTube</Typography>
              </div>
            </a>
          </div>
        ) : (
          ''
        )}
        <Tabs value={value} onChange={handleChange} centered className="my-6">
          <Tab label="Qualifying" />
          <Tab label="Sprint" />
          <Tab label="Race" />
        </Tabs>
        {value === 0 && qualiResult ? (
          <GenericTable columns={qualiColumns} rows={qualiRows} />
        ) : value === 1 && sprintResult ? (
          <GenericTable columns={sprintColumns} rows={sprintRows} />
        ) : value === 2 && raceResult ? (
          <GenericTable columns={raceColumns} rows={raceRows} />
        ) : (
          <h2 className="text-center">No results.</h2>
        )}
      </div>
    );
  }
}

export default RaceResult;
