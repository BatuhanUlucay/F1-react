import React, { useContext, memo } from 'react';
import Timeline from '../../features/twitter/components/Timeline';
import { useDriverRankings } from '../../features/rankings/api/getDriverRankings';
import CurrentDriversContext from '../../context/CurrentDriversContext';
import { testData } from '../../features/rankings/components/driverTestData';

const Landing = () => {
  return <div>{/* <Timeline /> */}</div>;
};

export default Landing;
