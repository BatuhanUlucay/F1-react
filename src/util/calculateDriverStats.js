export function calculateDriverStats(races) {
  // [points, wins, podiums]
  let stats = [0, 0, 0];

  for (const race of races) {
    const result = race.Results[0];

    //points
    stats[0] += Number(result.points);

    //wins
    stats[1] += Number(result.position) === 1 ? 1 : 0;

    //podiums
    stats[2] += Number(result.position) <= 3 ? 1 : 0;
  }

  const firstSeason = races[0].season;
  const latestTeam = races[races.length - 1].Results[0].Constructor;
  return [...stats, firstSeason, latestTeam];
}

export function calculateDriverChamps(seasons) {
  let championships = 0;

  for (const season of seasons) {
    const position = season.DriverStandings[0].position;
    if (position === '1') championships++;
  }

  return championships;
}
