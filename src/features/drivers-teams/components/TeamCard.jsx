import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ImageIcon from '@mui/icons-material/Image';
import { useTeamInfobox } from '../api/getTeamInfobox';
import { useTeamLogo } from '../api/getTeamLogo';
import TeamDrivers from './TeamDrivers';
import { Link } from 'react-router-dom';
import { getLogoUrlFromInfobox } from '../../../util/getLogoUrlFromInfobox';

function TeamCard({ team }) {
  const [imgSource, setImgSource] = useState('');

  const wikiTitle = team.Constructor.url.split('/').pop();
  const infoboxQuery = useTeamInfobox(wikiTitle);
  const teamLogoQuery = useTeamLogo(wikiTitle);

  if (infoboxQuery.isSuccess && teamLogoQuery.isSuccess) {
    let teamInfobox = infoboxQuery.data.infobox();

    getLogoUrlFromInfobox(teamInfobox, setImgSource);

    return (
      <Card className="shadow-xl border-2 border-solid ">
        <CardContent>
          <div className="flex">
            <Link to={team.Constructor.constructorId}>
              <div className="h-28 w-28">
                {imgSource !== '' ? (
                  <CardMedia
                    component="img"
                    alt="team logo"
                    image={imgSource}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <ImageIcon className="h-full w-full object-contain" />
                )}
              </div>
            </Link>
            <div className="w-full">
              <TeamDrivers team={team} />
            </div>
          </div>
          <Link to={team.Constructor.constructorId}>
            <Typography variant="h5" component="div" className="m-auto">
              {team.Constructor.name}
            </Typography>
          </Link>
        </CardContent>
      </Card>
    );
  }
}

export default TeamCard;
