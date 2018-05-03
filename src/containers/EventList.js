import React, {Component} from 'react';

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:true,
            text: props.event.text
        }
        
        this.handleChange=this.handleChange.bind(this);
        this.handleEdit=this.handleEdit.bind(this);
    }
    
    handleChange(event){
        this.setState({text: event.target.value});
        
    }
    
    handleEdit(){
        this.props.editEvent(this.props.event,this.state.text);
    }
    
    render() {
        
        if (!this.state.visible) {
            return null;
        }
        
        return (
            <form onSubmit={event => event.preventDefault()}>
                {/*
                    // readOnly <-- 
                    // onChange <--
                    // defaultValue
                */}
                <input type="text" value={this.state.text} onChange={this.handleChange}/>
                
                <button onClick={this.handleEdit}>
                    Edit
                </button>
                <button onClick={() => {
                    this.setState({visible: false})
                    this.props.deleteEvent(this.props.event.eventId);
                }}> 
                    Delete
                </button>
                
            </form>
        )
    }
}

class EventList extends Component {
    constructor(props){
        super(props)
        
        this.state = {
          newEventText: ''
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({newEventText: event.target.value});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.props.addEvent(this.state.newEventText);
        this.setState({newEventText: ''});
    }
    
    render() {
        
        let events = this.props.events
          .filter(event => event.date === this.props.selectedDate.getDate())
          .map((event,i) => (
              <Event event={event} key={event.eventId} deleteEvent={this.props.deleteEvent} editEvent={this.props.editEvent}/>
          ))
        
        
        return(
            <div className="eventList">
              <div className="eventDetail" >
                <div>
                  {events}
                </div>
                
              </div>
              
              <form className="eventForm" onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.newEventText} onChange={this.handleChange} />
                <button>ADD</button>
              </form>
            </div>
        )
    }
}

export default EventList;