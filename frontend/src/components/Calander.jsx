import React, { useState } from 'react';
import CalenderDays from './CalenderDays';
import '../styles/Calendar.css';
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";

const Calendar = ({tasks}) => {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const [currentDay, setCurrentDay] = useState(new Date());

  const changeCurrentDay = (day) => {
    setCurrentDay(new Date(day.year, day.month, day.number));
  }

  const nextMonth = () => {
    setCurrentDay(new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 1));
  }

  const previousMonth = () => {
    setCurrentDay(new Date(currentDay.getFullYear(), currentDay.getMonth() - 1, 1));
  }

  return (
    <div className="calendar">
      <div className="calendar-header">
        <div className="title">
          <h2>{months[currentDay.getMonth()]} {currentDay.getFullYear()}</h2>
        </div>
        <div className="d-flex align-items-center justify-content-center">
            <button className='btn d-flex align-items-center justify-content-center' onClick={previousMonth}>
                <PiArrowLeft size={24} />
            </button>
            <p className='mb-0 mx-3 d-flex align-items-center justify-content-center'>
                {months[currentDay.getMonth()].substring(0, 3)} {currentDay.getDate()}
            </p>
            <button className='btn d-flex align-items-center justify-content-center' onClick={nextMonth}>
                <PiArrowRight size={24} />
            </button>
        </div>
      </div>
      <div className="calendar-body">
        <div className="table-header">
          {weekdays.map((weekday) => (
            <div className="weekday" key={weekday}><p>{weekday}</p></div>
          ))}
        </div>
        <CalenderDays day={currentDay} changeCurrentDay={changeCurrentDay} tasks={tasks} />
      </div>
    </div>
  );
}

export default Calendar;
