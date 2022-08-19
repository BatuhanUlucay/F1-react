import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImageIcon from '@mui/icons-material/Image';
// import AspectRatio from '@mui/joy/AspectRatio';
import { useTeam } from '../api/getTeam';
import { testData } from './teamTestData';
import wtf from 'wtf_wikipedia';
import { useTeamInfobox } from '../api/getTeamInfobox';
import { hashMessage } from '../../../utils/md5hash';
import { useTeamLogo } from '../api/getTeamLogo';

import { doesImageExists } from '../../../util/checkImageExists';

function TeamCard({ team }) {
  const [imgSource, setImgSource] = useState('');

  const wikiTitle = team.Constructor.url.split('/').pop();

  const infoboxQuery = useTeamInfobox(wikiTitle);

  const teamLogoQuery = useTeamLogo(wikiTitle);

  if (infoboxQuery.isSuccess && teamLogoQuery.isSuccess) {
    let teamInfobox = infoboxQuery.data.infobox();

    if (teamInfobox.data.logo !== undefined) {
      const logoFileName = teamInfobox.data.logo.data.text;

      const extracted = logoFileName.split(':').pop().replaceAll(' ', '_');
      const hash = hashMessage(extracted);
      const firstChar = hash.charAt(0);
      const firstAndSecond = firstChar + hash.charAt(1);
      const urlFirst = `https://upload.wikimedia.org/wikipedia/commons/${firstChar}/${firstAndSecond}/${extracted}`;

      const urlSecond = `https://upload.wikimedia.org/wikipedia/en/${firstChar}/${firstAndSecond}/${extracted}`;

      let img = new Image();
      img.src = urlFirst;

      img.onload = () => {
        if (img.height !== 0) {
          setImgSource(urlFirst);
        }
      };
      let img2 = new Image();

      img2.src = urlSecond;

      img2.onload = () => {
        if (img2.height !== 0) {
          setImgSource(urlSecond);
        }
      };
    }

    return (
      <Card className="max-w-xs mx-auto">
        <CardContent>
          <div className='h-28 w-28'>
            {imgSource !== '' ? (
              <CardMedia
                component="img"
                alt="team logo"
                image={imgSource}
                className="bg-cover"
              />
            ) : (
              <ImageIcon />
            )}
          </div>
          <Typography variant="h5" component="div" className="m-auto">
            {team.Constructor.name}
          </Typography>
        </CardContent>
        {/* <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions> */}
      </Card>
    );
  }
}

export default TeamCard;
