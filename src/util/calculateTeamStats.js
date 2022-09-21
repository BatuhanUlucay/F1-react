export function calculateTeamStats(seasons) {
  let championships = 0;

  for (const season of seasons) {
    if (season.ConstructorStandings[0].position === '1') championships++;
  }
  return championships;
}
