import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ImageIcon from '@mui/icons-material/Image';
import { useTeamInfobox } from '../api/getTeamInfobox';
import TeamDrivers from './TeamDrivers';
import { Link } from 'react-router-dom';
import { getLogoUrlFromInfobox } from '../../../util/getLogoUrlFromInfobox';

function TeamCard({ team }) {
  const [imgSource, setImgSource] = useState('');

  const wikiTitle = team.Constructor.url.split('/').pop();
  const infoboxQuery = useTeamInfobox(wikiTitle);

  if (infoboxQuery.isSuccess) {
    let teamInfobox = infoboxQuery.data.infobox();

    getLogoUrlFromInfobox(teamInfobox, setImgSource);

    return (
      // <Card className="shadow-xl border-2 border-solid ">
      //   <CardContent>
      //     <div className="flex">
      //       <Link to={team.Constructor.constructorId}>
      //         <div className="h-28 w-28">
      //           {imgSource !== '' ? (
      //             <CardMedia
      //               component="img"
      //               alt="team logo"
      //               image={imgSource}
      //               className="h-full w-full object-contain"
      //             />
      //           ) : (
      //             <ImageIcon className="h-full w-full object-contain" />
      //           )}
      //         </div>
      //       </Link>
      //       <div className="w-full">
      //         <TeamDrivers team={team} />
      //       </div>
      //     </div>
      //     <Link to={team.Constructor.constructorId}>
      //       <Typography variant="h5" component="div" className="m-auto">
      //         {team.Constructor.name}
      //       </Typography>
      //     </Link>
      //   </CardContent>
      // </Card>

      <Link to={`/teams/${team.Constructor.constructorId}`} className="no-underline text-black">
        <div className="w-96 h-80 border-solid border-r border-t border-b-0 border-l-0 my-10 rounded-xl shadow-2xl">
          <div className="flex w-full relative">
            <Typography variant="h4">{team.position}</Typography>
            <Typography className="absolute right-1 my-2">{team.points} points</Typography>
          </div>
          <Divider />
          <div className="w-28 h-28 mx-auto mt-8">
            <img alt="Driver" src={imgSource} className="max-w-full max-h-full block m-auto" />
          </div>
          <Typography className='text-center mt-8'>{`${team.Constructor.name}`}</Typography>
        </div>
      </Link>
    );
  }
}

export default TeamCard;
