import React, { useState } from "react";
import Layout from "../../components/Layout";
import { format, startOfMonth, endOfMonth,  startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, addMonths, subMonths, parseISO} from 'date-fns'
import "../../assets/styles/calendar.scss";
import LeftArrow from "../../assets/images/left-arrow.svg";
import RightArrow from "../../assets/images/right-arrow.svg";
import CloseIcon from "../../assets/images/close.svg";

const Calendar = () => {
  const [showEventsModal, setShowEventsModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const eventDates = [
    "2021-03-01T17:18:00Z",
    "2021-03-05T11:19:00Z",
    "2021-03-06T12:18:00Z",
    "2021-03-15T13:20:00Z",
    "2021-03-18T15:45:00Z",
    "2021-03-19T14:30:00Z",
    "2021-03-31T17:18:00Z",
  ];
   
  const header = () => {
    const dateFormat = "MMM yyyy";
    return (
      <div className="calendar-header">
        <div className="icon" onClick={prevMonth}>
          <img src={LeftArrow} alt=""/>
        </div>
        <div className="column col-center">
          <span>{format(currentDate, dateFormat)}</span>
        </div>
        <div className="icon" onClick={nextMonth}>
          <img src={RightArrow} alt=""/>
        </div>
      </div>
    );
  };

  const days = () => {
    const dateFormat = "eee";
    const days = [];
    let startDate = startOfWeek(currentDate);
    for (let i = 0; i < 7; i++) {
      days.push(
          <div className="column col-center" key={i}>
            {format(addDays(startDate, i), dateFormat)}
          </div>
      );
    }
    return <div className="days row">{days}</div>;
  };
   
  const cells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";    
    
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        // const cloneDay = format(day, 'yyyy-MM-dd');
        const cloneDay = day;
        let hasEvent = false;

        // eslint-disable-next-line no-loop-func
        eventDates.map(item => {
          if(isSameDay(day, parseISO(item))) {
            hasEvent = true;
          }
          return hasEvent;
        });
        
        days.push(
          <div 
            className={`column cell ${!isSameMonth(day, monthStart) ? "disabled" : isSameDay(day, currentDate) ? "today" : "" } ${hasEvent ? 'has-event' : 'no-event'}`} 
            key={day}             
            onClick={() => onDateClick(cloneDay, hasEvent)}
          > 
            <div>
              <span className="number">{formattedDate}</span>
            </div>                  
          </div>
        );
        day = addDays(day, 1);
      }
  
      rows.push(<div className="row" key={day}> {days} </div>);
      days = [];
    }
  
    return <div className="body">{rows}</div>;
  }

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
   
  const onDateClick = (day, hasEvent) => {
    setSelectedDate(format(day, "yyyy-MM-dd"))

    if(hasEvent) {
      setShowEventsModal(true);
    }
  }

  const hideModal = () => {
    setShowEventsModal(false);
  }

  return (
    <Layout>
      <div className="appointment-calendar">      
        <h4 className="main-title">Appointment Calendar</h4>
        <div className="divider"/>
        <div className="calendar">
          {header()}
          {days()}
          {cells()}
        </div>
      </div>

      {
        showEventsModal ? 
          <div className="events-modal modal">
            <div className="modal-content">              
              <div className="title-header">
                <h4 className="main-title">Events ({selectedDate})</h4>
                <img src={CloseIcon} alt="" onClick={() => hideModal()}/>
              </div>
              <div className="divider"/>
              <table>
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Time</th>                
                  </tr>
                </thead>                
                <tbody>
                  <tr>
                    <td>Student #4</td>
                    <td>11:20AM PT</td>
                  </tr>
                  <tr>
                    <td>Student #12</td>
                    <td>3:45PM PT</td>
                  </tr>
                </tbody>                
              </table>
            </div>            
          </div> : ""
      }
    </Layout>    
  )
}

export default Calendar;
