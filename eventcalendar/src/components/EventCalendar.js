import {Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/fi'
import React, {useState} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function EventCalendar(props) {

    moment.locale('fi')

  const [open, setOpen] = useState(false)
  const [event, setEvent] = useState([])

  const localizer = momentLocalizer(moment)

  const handleClickOpen = (e) => {
    setEvent(e)
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false)
  }

    return (
      <div style={{margin: "20px"}}>
        <h1 style={{textAlign: "left"}} >Event Calendar </h1>
        {console.log(props.events)}
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={props.events}
          selectable={true}
          onSelectEvent = {e => handleClickOpen(e)}
          titleAccessor={(event) => event.name}
          startAccessor={(event) => new Date(event.starttime)}
          endAccessor={(event) => new Date(event.endtime)}
          style={{ height: "100vh"}}
        />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{event.name}</DialogTitle>
                    <DialogContent>
                    <Typography >
                        {moment(event.starttime).format('llll')} - {moment(event.endtime).format('llll')}
                    </Typography>
                    <Typography >
                        <Link href={event.place_url}> {event.place}</Link>
                    </Typography>
                    <Typography >
                        Comments: {event.notes}
                    </Typography>
                    </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>    
        </div>
    )
}
