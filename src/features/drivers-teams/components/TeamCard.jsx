import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTeam } from '../api/getTeam';
import { testData } from '../teamTestData';


function TeamCard({id}) {

    // const teamQuery = useTeam(id);

    if(true){

        const team = testData.response;

        console.log(team);

        return (
          <Card className="max-w-sm">
            <CardMedia
              component="img"
              alt="team logo"
            //   height="140"
                width="100"
              image={team[0].logo}
              />
            <CardContent>
              <Typography variant="h5" component="div" className='m-auto'>
                {"team.name"}
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
  
export default TeamCard