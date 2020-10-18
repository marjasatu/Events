import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import parse from 'html-react-parser';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import 'moment/locale/fi'
import Collapse from '@material-ui/core/Collapse';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
  card: { width: 1000},
  media: { height: 500},
})

export default function Event (props) {

  moment.locale('fi')
  
  const classes = useStyles();

  const handleClick = () => {
    console.log(props.event)
    const event = {
      name: props.event.name,
      starttime: props.event.start,
      endtime: props.event.end,
      place: props.event.place.name,
      place_url: props.event.place.info_url,
      url: props.event.url,
      notes: props.event.notes,
      apiId: props.event.apiId
    }
    props.add(event)
  }
  
  return (
    <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image = {props.event.image}
          title="image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.event.name}
          </Typography>
          <Typography gutterBottom variant="h7" component="h3">
            {moment(props.event.start).format('llll') + (props.event.end !== "" ? " - " + moment(props.event.end).format('llll') : "")}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {(props.event.place.info_url !== "" ? (<Link href={props.event.place.info_url}> {props.event.place.name}</Link>) : props.event.place.name + " ")} {props.event.place.street_address}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.event.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.event.url !== "" ? (<Link href={props.event.url}> More info... </Link>) : ""} 
          </Typography>
        </CardContent>
      <CardActions>
        <Button onClick={handleClick} size="small" color="primary" >
          Add to favorites
        </Button>
      </CardActions>
    </Card>
  )

}