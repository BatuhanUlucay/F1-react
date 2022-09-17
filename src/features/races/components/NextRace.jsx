import React from 'react';
import NextRaceCountdown from './NextRaceCountdown';
import { useQuery } from 'react-query';
import axios from 'axios';

import { useLastRace } from '../api/getLastRace';
import { useNextRace } from '../api/getNextRace';

import Card from '@mui/material/Card';
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';

// import { css } from "@emotion/react";

const lookup = require('coordinate_to_country');

function NextRace() {

const lastRaceQuery = useLastRace();
const nextRaceQuery = useNextRace();

  if (lastRaceQuery.isSuccess && nextRaceQuery.isSuccess) {
    const nextRace = nextRaceQuery.data.data.MRData.RaceTable.Races[0];
    const lastRace = lastRaceQuery.data.data.MRData.RaceTable.Races[0];

    const nextRaceName = nextRace.raceName;
    const nextRaceDate = nextRace.date;
    const nextRaceTime = nextRace.time;
    const lastRaceDate = lastRace.date;
    const lastRaceTime = lastRace.time;

    const nextRaceCircuit = nextRace.Circuit;

    const [nRyear, nRmonth, nRday] = nextRaceDate.split('-');
    const [nRhours, nRminutes, nRsecond] = nextRaceTime.split(':');

    const [lRyear, lRmonth, lRday] = lastRaceDate.split('-');
    const [lRhours, lRminutes, lRsecond] = lastRaceTime.split(':');

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
      <Card className="max-w-lg mx-auto">
        <Typography variant="h2" component="div" sx={{ textAlign: 'center', marginBottom: '1rem' }}>
          Next Race
        </Typography>
        <div className='text-center'
        >
          <img 
        //   className='mr-4'
            src={`https://countryflagsapi.com/png/${lookup(
              +nextRaceCircuit.Location.lat,
              +nextRaceCircuit.Location.long,
              true
            )}`}
            alt="Flag"
            height={40}
          />
          <Typography variant="h5" component="div">
            {nextRaceName}
          </Typography>
        </div>
        <NextRaceCountdown nextDate={nextRaceDateFormatted} lastDate={lastRaceDateFormatted} />
      </Card>
    );
  }
}

export default NextRace;
