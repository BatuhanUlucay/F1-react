import React from 'react';
import Timeline from '../../features/twitter/components/Timeline';
import NextRace from '../../features/races/components/NextRace';
import DriverPointChangeTable from '../../features/drivers/components/DriverPointChangeTable';

const Landing = () => {
  return (
    <>
      {
        <NextRace />
        /* <Timeline /> */
      }
      <DriverPointChangeTable />
    </>
  );
};

export default Landing;
