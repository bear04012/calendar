let DATA = [
    {eventId: 0, year: 2018, month: 1, date: 1, text: 'jan homework'},
    {eventId: 1, year: 2018, month: 1, date: 8, text: 'play football'},
    {eventId: 2, year: 2018, month: 2, date: 11, text: 'Feb homework'},
    {eventId: 3, year: 2018, month: 2, date: 18, text: 'exercise'},
    {eventId: 4, year: 2018, month: 2, date: 18, text: 'exercise'},
    {eventId: 5, year: 2018, month: 2, date: 21, text: 'play soccer'},
]

class MockDB {
    static getEvents(dateObj,callback){
        let RET = [];
        
        DATA.forEach((val) => {
            if (val.year === dateObj.getFullYear() &&
                val.month === dateObj.getMonth()+1
            ) {
                RET.push(val)
            } 
        })
        
        setTimeout(function() {
            callback(RET);
        },1000)
        
    }
    
    static addEvent(dateObj,text,callback) {
        let newEvent = {
            year: dateObj.getFullYear(),
            month: dateObj.getMonth()+1,
            date:dateObj.getDate(),
            text:text,
            eventId: MockDB.generateKey()
        };
        DATA.push(newEvent);
        callback();
    }
    
    static editEvent(eventObj,text,callback) {
        
        DATA.forEach( val => {
            if (val.eventId === eventObj.eventId) {
                val.text = text;
            }
        })
        
        callback();
        
        
    }
    
    static deleteEvent(eventId,callback) {
        DATA = DATA.filter(ev => ev.eventId !== eventId);
        callback();
    }
    
    static generateKey() {
        return new Date().getTime();        // timestamp
    }
    
}

export default MockDB;