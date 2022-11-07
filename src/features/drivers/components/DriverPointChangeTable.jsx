import React from 'react';
import { useState } from 'react';
import { useLastRace } from '../../races/api/getLastRace';
import { useDriverPointChange } from '../api/getDriverPointChange';
import Plot from 'react-plotly.js';

function DriverPointChangeTable() {
  const [lastRound, setLastRound] = useState(0);
  const lastRaceQuery = useLastRace();
  const pointChangeQuery = useDriverPointChange(new Date().getFullYear(), lastRound, {
    enabled: !!lastRound,
  });

  let standingArray = [];
  let standingMap = {};

  if (lastRaceQuery.isSuccess && !lastRound) {
    const lastRace = lastRaceQuery.data.data.MRData.RaceTable.round;
    setLastRound(lastRace);
  }

  for (const session of pointChangeQuery) {
    if (session.isSuccess) {
      const standing = session.data.data.MRData.StandingsTable.StandingsLists[0];
      standingArray.push(standing);
    }
  }

  standingArray.sort((a, b) => {
    return a.round - b.round;
  });

  for (let result of standingArray) {
    const r = result.round;
    for (let res2 of result.DriverStandings) {
      if (!standingMap[res2.Driver.code]) {
        standingMap[res2.Driver.code] = { code: res2.Driver.code, points: [[r, res2.points]] };
      } else {
        standingMap[res2.Driver.code].points.push([r, res2.points]);
      }
    }
  }

  let plotData = [];

  for (let i = 0; i < Object.keys(standingMap).length; i++) {
    const driver = standingMap[Object.keys(standingMap)[i]];
    let x = [];
    let y = [];
    for (let j = 0; j < driver.points.length; j++) {
      x.push(driver.points[j][0]);
      y.push(driver.points[j][1]);
    }
    plotData.push({
      x: x,
      y: y,
      type: 'scatter',
      mode: 'lines',
      name: driver.code,
      visible: 'legendonly',
    });
  }

  return (
    <div>
      <Plot
        data={plotData}
        layout={{ width: 800, height: 800, hovermode: 'x', legend: { itemclick: 'toggle' } }}
      />
    </div>
  );
}

export default DriverPointChangeTable;
