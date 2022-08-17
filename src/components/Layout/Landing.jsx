import React, { useContext, memo } from 'react';
import Timeline from '../../features/twitter/components/Timeline';
import { useDriverRankings } from '../../features/rankings/api/getDriverRankings';
import CurrentDriversContext from '../../context/CurrentDriversContext';

const Landing = memo(() => {
  const { setDriverIds } = useContext(CurrentDriversContext);

  const driversQuery = useDriverRankings(new Date().getFullYear());

  if (driversQuery.isLoading) {
    return <h1>Loading..</h1>;
  }
  if (driversQuery.isSuccess) {
    const currentSeasonDrivers = driversQuery.data.response;

    let ids = [];

    for (let i = 0; i < currentSeasonDrivers.length; i++) {
      ids.push(currentSeasonDrivers[i].driver.id);
    }

    //setDriverIds(ids);

    console.log(currentSeasonDrivers);

    return <div>{/* <Timeline /> */}</div>;
  }
});

export default Landing;
