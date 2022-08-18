import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTeam } from '../api/getTeam';
import { testData } from './teamTestData';
import wtf from 'wtf_wikipedia';
import { useTeamInfobox } from '../api/getTeamInfobox';
import { hashMessage } from '../../../utils/md5hash';
import { useTeamLogo } from '../api/getTeamLogo';

function TeamCard({ team }) {
  function getImage(logoFileName) {
    if (logoFileName !== undefined) {
      let url = '';

      const extracted = logoFileName.split(':').pop().replaceAll(' ', '_');
      const hash = hashMessage(extracted);
      const firstChar = hash.charAt(0);
      const firstAndSecond = firstChar + hash.charAt(1);
      url = `https://upload.wikimedia.org/wikipedia/commons/${firstChar}/${firstAndSecond}/${extracted}`;

      var img = new Image();
      img.src = url;

      if (img.height !== 0) {
        return url;
      } else {
        url = `https://upload.wikimedia.org/wikipedia/en/${firstChar}/${firstAndSecond}/${extracted}`;
        img.src = url;

        if (img.height !== 0) {
          return url;
        } else {
          return '';
        }
      }
    }
  }

  const wikiTitle = team.Constructor.url.split('/').pop();

  const infoboxQuery = useTeamInfobox(wikiTitle);

  const teamLogoQuery = useTeamLogo(wikiTitle);

  if (infoboxQuery.isSuccess && teamLogoQuery.isSuccess) {
    let teamInfobox = infoboxQuery.data.infobox();

    let urlLogo = ""

    if (teamInfobox.data.logo !== undefined) {
      const logoFileName = teamInfobox.data.logo.data.text;
      
      urlLogo = getImage(logoFileName)
    }

    // const fileName = teamInfobox.data.logo.data.text.split(":").pop().replaceAll(" ", "_");
    // const hash1 = hashMessage(fileName);
    // const firstChar = hash1.charAt(0)
    // const firstAndSecond = firstChar + hash1.charAt(1);

    return (
      <Card className="max-w-xs mx-auto">
        <CardMedia
          component="img"
          alt="team logo"
          //   height="140"
          width="100"
          image={urlLogo}
        />
        <CardContent>
          <Typography variant="h5" component="div" className="m-auto">
            {/* {team[0].name} */}
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
