import React, {Component} from 'react';
import MockDB from '../data/MockDB';
import EventList from '../containers/EventList';


const Event = (props) => {
  return (
      <div className = "event">
        {props.event.text}
      </div>
    );
} ;


const Day = (props) => {
  
  if (typeof props.selectedDate === "undefined") {
        return <div></div>
    }
    
  let isSelectedDate = props.date === props.selectedDate.getDate();
  
  let events = props.events
    .filter(event => event.date===props.date)
    .map (event => (
      <Event event={event} key={event.eventId} />
    ));         
            
  
  return (
      <div onClick={() => {
        props.onClickDate(props.date)
      }} className={isSelectedDate ? 'selectedDate' : ''}>
        {props.date}
        {events}
        
      </div>
    )
}

const Week = (props) => {
  return(
      <div>{props.weekdays}</div>
    )
}


const DAYS_OF_WEEK = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];

class Calendar extends Component {
  constructor(props) {
    super(props)
    
    let today = new Date()
    
    this.state = {
      selectedDate:today,
      events:[]
    };
    
    this.loadEvents(today);
    
    
    this.setSelectedDate=this.setSelectedDate.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.editEvent = this.editEvent.bind(this);
  }
  
  deleteEvent(eventId) {
    MockDB.deleteEvent(eventId, () => {
      this.loadEvents(this.state.selectedDate);
    });
  }
  
  addEvent(text){
    MockDB.addEvent(this.state.selectedDate,text,()=>{
      this.loadEvents(this.state.selectedDate);
    });
     }
  
  editEvent(event ,text){
    console.log(event, text);
    MockDB.editEvent(event, text,()=>{
      this.loadEvents(this.state.selectedDate);
    });
  }
  
  loadEvents(dateObj) {
      MockDB.getEvents(dateObj, newEvents =>{
        
          
          // very bad
          // this.state.events.push(events[0]);
          // this.forceUpdate();
          
          // // ok
          // this.setState({events:newEvents});
          
          // // good 
          // this.setState(prevState => {
          //   return {num: prevState.num + 1}
          // })
      })
  }
  
  getNumDays(dateObj) {
    let d = new Date(dateObj.getTime());
    
    let lastDate;
    
    while (true) {
      if (d.getMonth() !== dateObj.getMonth()){
        return lastDate;
      }
      
      lastDate = d.getDate();
      d.setDate(d.getDate()+1);
      
    }
    
  }
  
  getFirstDay(dateObj) {
    let d= new Date(dateObj.getTime());
    d.setDate(1);
    return d.getDay();
  }
  
  setSelectedDate(date) {
    this.setState(prevState => {
      let newSelectedDate = new Date(prevState.selectedDate.valueOf())
      newSelectedDate.setDate(date);
      
      return{
        selectedDate:newSelectedDate
        
      }
    })
  }
  
  setMonth(offset){
    this.setState(prevState => {
      let newSelectedDate = new Date(prevState.selectedDate.valueOf());
      newSelectedDate.setMonth(newSelectedDate.getMonth()+offset);
      
      this.loadEvents(newSelectedDate);
      return{
        selectedDate: newSelectedDate,
        events:[]
        
      }
    })
  }
  
  render() {
    let numDays = this.getNumDays(this.state.selectedDate);
    let firstDay = this.getFirstDay(this.state.selectedDate);
    let date = this.state.selectedDate;
    let days = []
    let weeks = []
    
    for (let i=0;i<firstDay;i++){
      days[i]=<Day key={i+1000} />
    }
    for (let day=1;day<numDays+1;day++) {
      days[day+firstDay-1]= <Day 
                            key={day} 
                            date = {day} 
                            selectedDate={this.state.selectedDate}
                            onClickDate={this.setSelectedDate}
                            events = {this.state.events}
                            />
    }
    
    for (let i=0;i<DAYS_OF_WEEK.length;i++){
      weeks[i]=<Week key={i} weekdays={DAYS_OF_WEEK[i%DAYS_OF_WEEK.length]} />
    }
    
    return (
      <div>
        <div className="setting">
          <button onClick={() =>{
            this.setMonth(-1)
          }}
          >PREV</button>
          {date.getFullYear()}/{date.getMonth()+1}/{date.getDate()}
          <button onClick={() =>{
            this.setMonth(1)
          }}
          >NEXT</button>
        </div>
        
        
        <div className="week">
          {weeks}
        </div>
        <div className="calendar">
          {days}
        </div>
        <EventList  selectedDate={this.state.selectedDate} 
                    addEvent={this.addEvent} 
                    events={this.state.events}
                    deleteEvent={this.deleteEvent}
                    editEvent={this.editEvent} />
      </div>
      )
  }
}

export default Calendar;