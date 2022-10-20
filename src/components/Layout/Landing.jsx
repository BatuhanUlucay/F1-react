import React from 'react';
import Timeline from '../../features/twitter/components/Timeline';
import NextRace from '../../features/races/components/NextRace';
import DriverPointChangeTable from '../../features/drivers/components/DriverPointChangeTable';
import TeamPointChangeChart from '../../features/teams/components/TeamPointChangeChart';

const Landing = () => {
  return (
    <>
      {
        <NextRace />
        /* <Timeline /> */
      }
      <div className="flex">
        <DriverPointChangeTable />
        <TeamPointChangeChart />
      </div>
    </>
  );
};

export default Landing;
