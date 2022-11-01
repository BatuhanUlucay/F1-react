import React, { useState } from 'react';
import { useLastRace } from '../../races/api/getLastRace';
import { useTeamPointChange } from '../api/getTeamPointChange';
import Plot from 'react-plotly.js';

function TeamPointChangeChart() {
  //FIXME: refactor here and the driver side asap.
  //TODO: use grand prix as x axis.

  const [lastRound, setLastRound] = useState(0);
  const lastRaceQuery = useLastRace();
  const pointChangeQuery = useTeamPointChange(new Date().getFullYear(), lastRound, {
    enabled: !!lastRound,
  });

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
    for (let res2 of result.ConstructorStandings) {
      if (!data2[res2.Constructor.name]) {
        data2[res2.Constructor.name] = { code: res2.Constructor.name, points: [[r, res2.points]] };
      } else {
        data2[res2.Constructor.name].points.push([r, res2.points]);
      }
    }
  }

  let data3 = [];

  for (let i = 0; i < Object.keys(data2).length; i++) {
    const team = data2[Object.keys(data2)[i]];
    let x = [];
    let y = [];
    for (let j = 0; j < team.points.length; j++) {
      x.push(team.points[j][0]);
      y.push(team.points[j][1]);
    }
    data3.push({
      x: x,
      y: y,
      type: 'scatter',
      mode: 'lines',
      name: team.code,
      visible: 'legendonly',
    });
  }

  return (
    <div>
      <Plot
        data={data3}
        layout={{ width: 800, height: 800, hovermode: 'x', legend: { itemclick: 'toggle' } }}
      />
    </div>
  );
}

export default TeamPointChangeChart;
