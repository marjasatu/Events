import 'date-fns';
import React, { useState } from "react";
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import Event from './Event'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


export default function Eventlist (props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [division, setDivision] = useState("");
  const [keyword, setKeyword] = useState("");
  const [text, setText] = useState("");

   
  const handleClick = () => {
      props.getEvents(moment(startDate).format(), moment(endDate).format(), division, keyword, text)  
  }

  return (
    <div>
      <h1>Search events</h1>
      <Grid container 
        spacing={2}
        justify='center'
      >
        <Grid item xs={12}>
          <Grid container justify='center' >
            <Grid item >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    label="Starting"
                    value={startDate}
                    format="dd/MM/yyyy"
                    margin="normal"
                    onChange={setStartDate}
                    animateYearScrolling
                    margin="normal"
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                  <DatePicker
                    label="Ending"
                    format="dd/MM/yyyy"
                    value={endDate}
                    margin="normal"
                    onChange={setEndDate}
                    animateYearScrolling
                  />
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item >
              <TextField
                label="Text search"
                style={{ margin: 8 }}
                placeholder="Search by text"
                margin="normal"
                variant="outlined"
                onChange = {event => setText(event.target.value)}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" size="large"  onClick={handleClick}>Search events</Button>
            </Grid>  
          </Grid>        
        </Grid>
                  
        <Grid item xs={12}>
          <Grid container 
            justify="center" 
            spacing={2}
          >           
          {props.events.map(e => 
            <Grid item >
              <Event event={e} add={props.add} />
            </Grid> )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
