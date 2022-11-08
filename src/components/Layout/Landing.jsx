import React from 'react';
import Timeline from '../../features/twitter/components/Timeline';
import NextRace from '../../features/races/components/NextRace';
import DriverPointChangeTable from '../../features/drivers/components/DriverPointChangeTable';
import TeamPointChangeChart from '../../features/teams/components/TeamPointChangeChart';

const Landing = () => {
  return (
    <div>
      <Timeline />
      <NextRace />
      <div className="justify-center mt-56 hidden xl:flex">
        <h2>Points chart race by race</h2>
      </div>
      <div className="justify-center hidden xl:flex">
        <DriverPointChangeTable />
        <TeamPointChangeChart />
      </div>
    </div>
  );
};

export default Landing;
