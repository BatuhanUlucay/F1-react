import React from 'react';
import { useState } from 'react';
import { useLastRace } from '../../races/api/getLastRace';
import { useDriverPointChange } from '../api/getDriverPointChange';
import Plot from 'react-plotly.js';
import { Typography } from '@mui/material';

function DriverPointChangeTable() {
  const [lastRound, setLastRound] = useState(0);
  const lastRaceQuery = useLastRace();
  const pointChangeQuery = useDriverPointChange(2022, lastRound, !!lastRound);

  let data = [];
  let data2 = {};

  if (lastRaceQuery.isSuccess && !lastRound) {
    const lastRace = lastRaceQuery.data.data.MRData.RaceTable.round;
    setLastRound(lastRace);
  }

  for (const session of pointChangeQuery) {
    if (session.isSuccess) {
      const tmp = session.data.data.MRData.StandingsTable.StandingsLists[0];
      data.push(tmp);
    }
  }

  data.sort((a, b) => {
    return a.round - b.round;
  });

  // console.log(data);

  for (let result of data) {
    const r = result.round;
    for (let res2 of result.DriverStandings) {
      if (!data2[res2.Driver.code]) {
        data2[res2.Driver.code] = { code: res2.Driver.code, points: [[r, res2.points]] };
      } else {
        data2[res2.Driver.code].points.push([r, res2.points]);
      }
    }
  }

  console.log(data2);

  let data3 = [];

  for (let i = 0; i < Object.keys(data2).length; i++) {
    const driver = data2[Object.keys(data2)[i]];
    let x = [];
    let y = [];
    for (let j = 0; j < driver.points.length; j++) {
      x.push(driver.points[j][0]);
      y.push(driver.points[j][1]);
    }
    data3.push({ x: x, y: y, type: "scatter", mode: 'lines', name: driver.code });
  }

  console.log(data3);

  return (
    <div>
      <Plot data={data3} layout={{ width: 800, height: 800, hovermode: "x", legend: {itemclick: "false"}}}/>
      <Typography>You can select a driver by double clicking and try to compare with others.</Typography>
    </div>
  );
}

export default DriverPointChangeTable;
