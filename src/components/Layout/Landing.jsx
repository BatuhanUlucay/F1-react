import React from 'react';
import Timeline from '../../features/twitter/components/Timeline';
import CurrentDriversContext from '../../context/CurrentDriversContext';
import NextRace from '../../features/races/components/NextRace';

const Landing = () => {
  return <>{
    <NextRace />
    /* <Timeline /> */}</>;
};

export default Landing;
