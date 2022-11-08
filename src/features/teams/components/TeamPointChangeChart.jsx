import React, { useState } from 'react';
import { useLastRace } from '../../races/api/getLastRace';
import { useTeamPointChange } from '../api/getTeamPointChange';
import Plot from 'react-plotly.js';

function TeamPointChangeChart() {

  const [lastRound, setLastRound] = useState(0);
  const lastRaceQuery = useLastRace();
  const pointChangeQuery = useTeamPointChange(new Date().getFullYear(), lastRound, {
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
      const standingList = session.data.data.MRData.StandingsTable.StandingsLists[0];
      standingArray.push(standingList);
    }
  }

  standingArray.sort((a, b) => {
    return a.round - b.round;
  });

  for (let result of standingArray) {
    const r = result.round;
    for (let res2 of result.ConstructorStandings) {
      if (!standingMap[res2.Constructor.name]) {
        standingMap[res2.Constructor.name] = { code: res2.Constructor.name, points: [[r, res2.points]] };
      } else {
        standingMap[res2.Constructor.name].points.push([r, res2.points]);
      }
    }
  }

  let plotData = [];

  for (let i = 0; i < Object.keys(standingMap).length; i++) {
    const team = standingMap[Object.keys(standingMap)[i]];
    let x = [];
    let y = [];
    for (let j = 0; j < team.points.length; j++) {
      x.push(team.points[j][0]);
      y.push(team.points[j][1]);
    }
    plotData.push({
      x: x,
      y: y,
      type: 'scatter',
      mode: 'lines',
      name: team.code,
      visible: 'legendonly',
    });
  }

  plotData.sort((a, b) => {
    return b.y[b.y.length - 1] - a.y[a.y.length - 1];
  });

  return (
    <div>
      <Plot
        data={plotData}
        layout={{ width: 800, height: 800, hovermode: 'x', legend: { itemclick: 'toggle' } }}
      />
    </div>
  );
}

export default TeamPointChangeChart;
