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
}