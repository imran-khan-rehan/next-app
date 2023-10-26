

// export default CalendarPicker;
import React, { useState } from 'react';
import Image from 'next/image'
import greater from '@/public/icons/greater.svg'
import less from '@/public/icons/less.svg'
const Calendar = ({ selectedDate, setSelectedDate }) => {
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'
  ];


  const moveToNextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + 1);
    setSelectedDate(newDate);
  };

  const moveToPrevMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() - 1);
    setSelectedDate(newDate);
    
  };

  const moveToNextYear = () => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(selectedDate.getFullYear() + 1);
    setSelectedDate(newDate);
  };

  const generateCalendarDays = () => {
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

    const days = [];
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(firstDayOfMonth);
      currentDate.setDate(firstDayOfMonth.getDate() + i - firstDayOfMonth.getDay());

      const isCurrentMonth = currentDate.getMonth() === selectedDate.getMonth();
      const isCurrentDate = currentDate.toDateString() === selectedDate.toDateString();
      days.push(
        <div
          key={i}
          className={`text-black font-normal text-xs w-fit p-2  cursor-pointer ${isCurrentDate ? 'bg-blue-500 text-white' : isCurrentMonth ? '' : 'text-red-500'
            }`}
          onClick={() => {
            if (isCurrentMonth) {
              setSelectedDate(currentDate);
            }
          }}
        >
          {currentDate.getDate()}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="w-[100%]  mx-auto mb-auto p-4 border rounded-md shadow-lg bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2 ">
          <div className="ml-1 font-bold text-base">
            {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </div>
          <div className="cursor-pointer my-auto" onClick={moveToNextYear}>
            <Image src={greater} width={10} height={11} alt='nextyear' />
          </div>
        </div>

        <div className="cursor-pointer flex flex-row gap-5 text-white rounded" >
          <Image onClick={moveToPrevMonth} src={less} width={10} height={11} alt='prevmonth' />


          <div className=" cursor-pointer text-white  rounded" >
            <Image onClick={moveToNextMonth} src={greater} width={10} height={11} alt='nextmonth' />

          </div>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-black font-normal text-xs">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{generateCalendarDays()}</div>
    </div>
  );
};

export default Calendar;
