import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useRaceResult } from '../api/getRaceResult';
import GenericTable from '../../../components/Table/GenericTable';
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
  useEffect(() => {
    getUrl(search);
  }, [search]);

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

  const columns = ['Position', 'Driver', 'Time', 'Status', 'Points', 'Fastest Lap'];

  if (raceResultQuery.isSuccess) {
    const raceResult = raceResultQuery.data.data.MRData.RaceTable.Races[0].Results;

    if (!search)
      setSearch(
        `${raceResultQuery.data.data.MRData.RaceTable.season} ${raceResultQuery.data.data.MRData.RaceTable.Races[0].raceName} Race Highlights`
      );

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
        <GenericTable columns={columns} rows={resultRows} />;
      </div>
    );
  }
}

export default RaceResult;
