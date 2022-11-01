import React, { useEffect, useState } from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ImageIcon from '@mui/icons-material/Image';
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
        <div className="w-96 h-80 border-solid border my-10 rounded-xl shadow-2xl">
          <div className="flex w-full relative">
            <Typography variant="h4">{team.position}</Typography>
            <Typography className="absolute right-1 my-2">{team.points} points</Typography>
          </div>
          <Divider />
          <div className="w-28 h-28 mx-auto mt-8">
            {imgSource === '' ? (
              <ImageIcon className="w-full h-full m-auto block" />
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
