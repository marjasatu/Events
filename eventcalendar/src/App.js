import React, {useState, useEffect} from 'react'
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListIcon from '@material-ui/icons/List';
import Event from '@material-ui/icons/Event';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import MyEventList from './components/MyEventList'
import EventCalendar from './components/EventCalendar'
import eventService from './services/events'
import myeventService from './services/myevents'
import Eventlist from './components/Eventlist'


function App() {

  const [events, setEvents] = useState([])
  const [myevents, setMyevents] = useState([])

  
  useEffect(() => {
    getEvents("today", "today", "", "", "")
    myeventService
      .getAll()
      .then (e => {
        setMyevents(e)
      })
  }, [])

  const getEvents = (startdate, enddate, division, keyword, text) => {
    eventService      
      .getAll(startdate, enddate, division, keyword, text)
      .then(e => {
        setEvents(
          e.filter(ev => ev.images[0] !== undefined)
          .map(ev => ({
          apiId: ev.id,
          name: ev.name !== null ? ev.name.fi : "", 
          start: ev.start_time,
          end: ev.end_time !== null ? ev.end_time : "",
          place: {
            name: ev.location.name !== null ? ev.location.name.fi : "",
            street_address: (ev.location.street_address !== null && ev.location.street_address !== undefined) ? ev.location.street_address.fi : "",
            info_url: ev.location.info_url !== null ? ev.location.info_url.fi : ""
          },
          description: ev.short_description !== null ? ev.short_description.fi : "",
          url: ev.info_url !== null ? ev.info_url.fi : "",
          image: ev.images[0].url,
          }))
        )
      })
  }

  const addNewEvent = (eventObject) => {
    myevents.filter(e => e.apiId === eventObject.apiId).length < 1 ? 
    myeventService      
      .create(eventObject)
      .then(e => {
        setMyevents(myevents.concat(e))
      })
    : setMyevents(myevents)
  }

  const editEvent = (newEventObject, id) => {
    console.log(id)
    myeventService
    .update(id, newEventObject)    
    .then(e => {        
      setMyevents(myevents.map(event => event.id !== id ? event : e))
    })
  }

  const deleteEvent = (id) => {
    myeventService
    .remove(id)
    .then(e=> {
      setMyevents(myevents.filter(event => event.id !== id))
    })
  }

  return (
    <div className="App" >
      <Router>
      <AppBar position="static" >
        <Toolbar >
          <Typography variant="h6" style = {{display: 'flex', flexGrow: 1}}>
            EventCalendar
          </Typography >
          <div >
          <Tooltip title="Seach events">
            <IconButton  href="/Eventlist" color='inherit' >
              <SearchIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Event Calendar">
            <IconButton  href="/EventCalendar" color='inherit' >
              <Event fontSize="large"/>
            </IconButton >
          </Tooltip>
          <Tooltip title="My event list">
            <IconButton  href="/MyEventList" color='inherit' >
              <ListIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          </div>
          </Toolbar>
      </AppBar>
      <Switch>
          <Route path="/MyEventList">
            <MyEventList addNewEvent={addNewEvent} updateEvent={editEvent} deleteEvent={deleteEvent} events={myevents}/>
          </Route>
          <Route path="/EventCalendar">
            <EventCalendar events={myevents} editEvent={editEvent}/>
          </Route>
          <Route path="/">
            <Eventlist getEvents={getEvents} events={events} add={addNewEvent} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
