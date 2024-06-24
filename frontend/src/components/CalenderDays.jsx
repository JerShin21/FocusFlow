import React, {useState, useEffect} from 'react';

const CalenderDays = ({ day, changeCurrentDay }) => {
  const firstDayOfMonth = new Date(day.getFullYear(), day.getMonth(), 1);
  const weekdayOfFirstDay = firstDayOfMonth.getDay();
  let currentDays = [];

  const [today, setToday] = useState(new Date());

  useEffect(() => {
    setToday(new Date());
  }, [])

  for (let i = 0; i < 42; i++) {
    if (i === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (i === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (i - weekdayOfFirstDay));
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    let calendarDay = {
      currentMonth: (firstDayOfMonth.getMonth() === day.getMonth()),
      date: (new Date(firstDayOfMonth)),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: (firstDayOfMonth.toDateString() === day.toDateString()),
      year: firstDayOfMonth.getFullYear()
    }

    currentDays.push(calendarDay);
  }

  return (
    <div className="table-content">
      {console.log(today)}
      {currentDays.map((calendarDay) => (
        <div 
          className={`calendar-day${calendarDay.currentMonth ? " current" : ""}${calendarDay.selected ? " selected" : ""}`}
          onClick={() => changeCurrentDay(calendarDay)}
          key={calendarDay.date}
        >
          <p className={`${calendarDay.date.toDateString() === today.toDateString() ? "text-primary" : ""}`} >{calendarDay.number}</p>
        </div>
      ))}
    </div>
  );
}

export default CalenderDays;
