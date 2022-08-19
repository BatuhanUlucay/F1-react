import React from 'react';
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
  
 async function getImage(logoFileName) {
    const extracted = logoFileName.split(':').pop().replaceAll(' ', '_');
    const hash = hashMessage(extracted);
    const firstChar = hash.charAt(0);
    const firstAndSecond = firstChar + hash.charAt(1);
    const urlFirst = `https://upload.wikimedia.org/wikipedia/commons/${firstChar}/${firstAndSecond}/${extracted}`;

    const urlSecond = `https://upload.wikimedia.org/wikipedia/en/${firstChar}/${firstAndSecond}/${extracted}`;

    const doesImageExists1 = await doesImageExists(urlFirst);
    const doesImageExists2 = await doesImageExists(urlSecond);

    if (!!doesImageExists1) {
      console.log("doesImage 1",doesImageExists1);
      return urlFirst;
    }

    else if (!!doesImageExists2) {
      return urlSecond;
    }

    return '';

  }

  const wikiTitle = team.Constructor.url.split('/').pop();

  const infoboxQuery = useTeamInfobox(wikiTitle);

  const teamLogoQuery = useTeamLogo(wikiTitle);

  if (infoboxQuery.isSuccess && teamLogoQuery.isSuccess) {
    let teamInfobox = infoboxQuery.data.infobox();

    let urlLogo = '';

    if (teamInfobox.data.logo !== undefined) {
      const logoFileName = teamInfobox.data.logo.data.text;

      urlLogo = getImage(logoFileName);
       console.log('asdasdasds', urlLogo);
    }

    return (
      <Card className="max-w-xs mx-auto">
        <CardContent>
          {urlLogo !== "" ? (
            <CardMedia component="img" alt="team logo" height="140" width="100" image={urlLogo} />
          ) : (
            <ImageIcon />
          )}
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
