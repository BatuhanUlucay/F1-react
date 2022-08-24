import React from 'react';
import { useParams } from 'react-router-dom';
import { useTeamDetails } from '../api/getTeamDetail';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

function TeamDetail(props) {
  const params = useParams();

  console.log(params.teamId);

  const teamDetailsQuery = useTeamDetails(params.teamId);

  if (teamDetailsQuery.isSuccess) {
    console.log(teamDetailsQuery.data.data.MRData.ConstructorTable.Constructors[0]);
  }

  return (
    <div className="max-w-7xl mx-auto">
      <Card>
        <CardMedia
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default TeamDetail;
