import React, { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { useTeamInfobox } from '../api/getTeamInfobox';
import { Link } from 'react-router-dom';
import { getLogoUrlFromInfobox } from '../../../util/getLogoUrlFromInfobox';

function TeamCard({ team }) {
  const [imgSource, setImgSource] = useState('');
  const [wikiTitle, setWikiTitle] = useState('');
  const infoboxQuery = useTeamInfobox(wikiTitle);

  useEffect(() => {
    setWikiTitle(team.Constructor.url.split('/').pop());
  }, [team]);

  if (infoboxQuery.isSuccess) {
    let teamInfobox = infoboxQuery?.data?.infobox();

    getLogoUrlFromInfobox(teamInfobox, setImgSource);

    return (
      <Link to={`/teams/${team.Constructor.constructorId}`} className="no-underline text-black">
        <div className="w-80 md:w-96 h-80 border-solid border my-10 rounded-xl shadow-2xl">
          <div className="flex w-full relative">
            <Typography variant="h4" className="ml-4">
              {team.position}
            </Typography>
            <Typography className="absolute right-1 my-2">{team.points} points</Typography>
          </div>
          <Divider />
          <div className="w-28 h-28 mx-auto mt-8">
            {imgSource === '' ? (
              <ApartmentIcon className="w-full h-full m-auto block" />
            ) : (
              <img alt="Team logo" src={imgSource} className="max-w-full max-h-full block m-auto" />
            )}
          </div>
          <Typography className="text-center mt-8">{`${team.Constructor.name}`}</Typography>
        </div>
      </Link>
    );
  }
}

export default TeamCard;
