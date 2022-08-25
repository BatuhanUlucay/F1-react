import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTeamDetails } from '../api/getTeamDetail';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useTeamInfobox } from '../api/getTeamInfobox';
import { getLogoUrlFromInfobox } from '../../../util/getLogoUrlFromInfobox';

function TeamDetail() {
  const [imgSource, setImgSource] = useState('');
  const [wikiTitle, setWikiTitle] = useState('');

  const params = useParams();

  const teamDetailsQuery = useTeamDetails(params.teamId);

  const infoboxQuery = useTeamInfobox(wikiTitle, { enabled: wikiTitle !== '' });

  if (teamDetailsQuery.isSuccess) {
    const teamDetails = teamDetailsQuery.data.data.MRData.ConstructorTable.Constructors[0];
    const wikiUrl = teamDetails.url;

    if (wikiTitle === '') {
      setWikiTitle(wikiUrl.split('/').pop());
    }

    if (infoboxQuery.isSuccess) {
      const wikiInfobox = infoboxQuery.data.infobox();
      if (imgSource === '') getLogoUrlFromInfobox(wikiInfobox, setImgSource);

      console.log('sorcee', imgSource);

      return (
        <div className="max-w-7xl mx-auto">
          <Card>
            <div className="h-28 w-28">
              <CardMedia
                component="img"
                alt="team logo"
                image={imgSource}
                title="Contemplative Reptile"
              />
            </div>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {/* {teamDetails.name} */}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </Card>
        </div>
      );
    }
  }
}

export default TeamDetail;
