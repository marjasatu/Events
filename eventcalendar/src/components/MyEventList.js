import React from 'react'
import { forwardRef } from 'react';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import moment from 'moment';
import 'moment/locale/fi'
import Link from '@material-ui/core/Link';


export default function MyEventList(props) {

   moment.locale('fi')

   const tableIcons = {
      Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
      Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
      Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
      DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
      Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
      Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
      Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
      FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
      LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
      NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
      PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
      ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
      SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
      ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
      ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    }
    
    const columns = [
      {
         title: 'Event',
         field: 'name',
         type: 'string',
         editable: 'onAdd' 
      },
      {
         title: 'Place',
         field: 'place',
         type: 'string', 
         editable: 'onAdd',
      },
      {
         title: 'Place info',
         field: 'place_url',
         type: 'string',
         editable: 'onAdd',
         render: rowData => rowData.place_url !== "" ? <Link href={rowData.place_url}> Place info</Link> : "" 
      },
      {
         title: 'Start',
         field: 'starttime',
         type: 'datetime',
         editable: 'onAdd',
         render: rowData => moment(rowData.starttime).format('LLL') 
      },
      {
         title: 'End',
         field: 'endtime',
         type: 'datetime',
         editable: 'onAdd',
         render: rowData => moment(rowData.endtime).format('LLL') 
      },
      {
         title: 'Info url',
         field: 'url',
         type: 'string',
         editable: 'onAdd',
         render: rowData => rowData.url !== "" ? <Link href={rowData.url}> Event info</Link>: ""
      },
      {
         title: 'Comments',
         field: 'notes',
         type: 'string',
      },
    ]

    const addEvent = (newEvent) => {
      props.addNewEvent(newEvent)
    }
    
    const updateEvent = (EditedEvent, id) => {
      const EEvent = {...EditedEvent, starttime: moment(EditedEvent.starttime).format(), endtime: moment(EditedEvent.endtime).format()}
      console.log(EEvent)
      props.updateEvent(EEvent, id)
    }
    
    const deleteEvent = (id) => {
      console.log(id)
      console.log(props.events)
      props.deleteEvent(id)
    }
  

    return ( 
        <div>
            <MaterialTable  
               title= {<h1 style={{textAlign: "left"}} >My events</h1>}
               options={{pageSize: 20, addRowPosition:'first'}}
               icons={tableIcons}
               filterable={true}
               data={props.events}
               columns={columns}
               
               
               editable={{
                  onRowAdd: (newData) =>
                     new Promise((resolve) => {
                        setTimeout(() => {
                           addEvent(newData)
                           resolve();
                        }, 500)
                     }),
                  onRowUpdate: (newData, rowData) => 
                     new Promise((resolve) => {
                        setTimeout(() => {
                           updateEvent(newData, rowData.id)
                           resolve();
                        }, 500)
                 }),
                  onRowDelete: (rowData) => 
                  new Promise((resolve) => {
                     setTimeout(() => {
                        deleteEvent(rowData.id)
                        resolve();
                     }, 500)
                   }),
               }}
               
            />
        </div>

        
    )
}