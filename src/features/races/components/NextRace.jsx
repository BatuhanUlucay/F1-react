import React from 'react';
import NextRaceCountdown from './NextRaceCountdown';
import { useLastRace } from '../api/getLastRace';
import { useNextRace } from '../api/getNextRace';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Spinner from '../../../assets/f1-car.gif';

const lookup = require('coordinate_to_country');

function NextRace() {
  const lastRaceQuery = useLastRace();
  const nextRaceQuery = useNextRace();

  if (lastRaceQuery.isSuccess && nextRaceQuery.isSuccess) {
    const nextRace = nextRaceQuery.data.data.MRData.RaceTable.Races[0];
    const lastRace = lastRaceQuery.data.data.MRData.RaceTable.Races[0];

    if (nextRace) {
      const nextRaceName = nextRace.raceName;
      const nextRaceDate = nextRace.date;
      const nextRaceTime = nextRace.time;
      const lastRaceDate = lastRace.date;
      const lastRaceTime = lastRace.time;

      const nextRaceCircuit = nextRace.Circuit;

      const [nRyear, nRmonth, nRday] = nextRaceDate.split('-');
      const [nRhours, nRminutes] = nextRaceTime.split(':');

      const [lRyear, lRmonth, lRday] = lastRaceDate.split('-');
      const [lRhours, lRminutes] = lastRaceTime.split(':');

      const today = new Date();
      const timeZone = today.getTimezoneOffset() / -60;

      const nextRaceDateFormatted = new Date(
        +nRyear,
        +nRmonth - 1,
        +nRday,
        +nRhours + timeZone,
        +nRminutes
      );

      const lastRaceDateFormatted = new Date(
        +lRyear,
        +lRmonth - 1,
        +lRday,
        +lRhours + timeZone,
        +lRminutes
      );

      return (
        <Card className="max-w-lg mx-auto mt-32">
          <Typography
            variant="h2"
            component="div"
            sx={{ textAlign: 'center', marginBottom: '1rem' }}
          >
            Next Race
          </Typography>
          <div className="text-center">
            <img
              src={`https://countryflagsapi.com/png/${lookup(
                +nextRaceCircuit.Location.lat,
                +nextRaceCircuit.Location.long,
                true
              )}`}
              alt="Flag"
              height={80}
            />
            <Typography variant="h5" component="div">
              {nextRaceName}
            </Typography>
            <Typography variant="h7">{nextRaceCircuit.circuitName}</Typography>
          </div>
          <NextRaceCountdown nextDate={nextRaceDateFormatted} lastDate={lastRaceDateFormatted} />
        </Card>
      );
    } else {
      return (
        <>
          <Typography variant="h2" component="div" sx={{ textAlign: 'center', marginTop: '8rem' }}>
            It's off season. See you in {new Date().getFullYear() + 1} !
          </Typography>
          <div className="flex w-1/3 justify-center m-auto">
            <img src={Spinner} alt="Loading" />
          </div>
        </>
      );
    }
  } else {
    return (
      <Card className="max-w-lg mx-auto mt-32">
        <div className="flex items-center justify-center w-screen h-screen">
          <img src={Spinner} alt="Loading" />
        </div>
        <Typography variant="h2" component="div" sx={{ textAlign: 'center', marginBottom: '1rem' }}>
          It's off season. See you in {new Date().getFullYear() + 1} !
        </Typography>
      </Card>
    );
  }
}

export default NextRace;
