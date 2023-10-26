import React, { useState, useEffect } from 'react';
import { insertRemindTask } from '@/lib/actions/user.actions';
const ReminderSetDays = ({ task, onClose }) => {
  const [reminderDays, setReminderDays] = useState(1);
  const [minDays, setMinDays] = useState(1);
  const [maxDays, setMaxDays] = useState(1);

  useEffect(() => {
    // Calculate minimum and maximum days based on current date and due date
    const currentDate = new Date();
    const differenceInDays = Math.floor((task.due_date - currentDate) / (1000 * 60 * 60 * 24));

    // Set minDays to 0 to prevent negative values
    setMinDays(1);
    // Set maxDays to the difference between due date and current date
    setMaxDays(differenceInDays + 1);
  }, [task.due_date]);

  // const handleDaysChange = (e) => {
  //   const days = parseInt(e.target.value, 10);
  //   setReminderDays(days);
  // };
  // const handleDaysChange = (event) => {
  //   if (event.target.value !== NaN) {
  //     let newValue = parseInt(event.target.value, 10); // Parse the input value as an integer

  //     // Check if the newValue is greater than the maxDays
  //     if (newValue === NaN) {
  //       newValue = minDays;
  //     }
  //     if (newValue > maxDays) {
  //       newValue = maxDays; // Set the value to maxDays
  //     }

  //     // Check if the newValue is less than the minDays
  //     if (newValue < minDays) {
  //       newValue = minDays; // Set the value to minDays
  //     }

  //     // Update the state with the sanitized value
  //     setReminderDays(newValue);
  //   }
  // };
  const handleDaysChange = (event) => {
    let newValue = parseInt(event.target.value, 10); // Parse the input value as an integer

    // Check if the parsed value is NaN
    if (isNaN(newValue)) {
      newValue = minDays; // Set a default value or handle the error accordingly
    } else {
      // Check if the newValue is greater than the maxDays
      if (newValue > maxDays) {
        newValue = maxDays; // Set the value to maxDays
      }

      // Check if the newValue is less than the minDays
      if (newValue < minDays) {
        newValue = minDays; // Set the value to minDays
      }
    }

    // Update the state with the sanitized value
    setReminderDays(newValue);
  };

  function saveReminder() {
    
      console.log('remieder days are going to be seeted',reminderDays);
     // setReminderDays(minDays);
      const d =insertRemindTask(reminderDays, task.taskId);
    onClose(-1);
  }


return (
  <div className="fixed z-[100] top-0 right-0 h-screen w-screen flex items-center justify-center bg-gray-700 bg-opacity-50">
    <div className="bg-white w-[304px] p-6 rounded-lg shadow-lg">
      <div className="flex justify-end">
        <span className="cursor-pointer" onClick={() => { onClose(-1) }}>X</span>
      </div>
      <span className=' text-xl font-semibold'>{reminderDays} of days before the deadline</span>
      <span className=' text-xl font-bold pl-2'>
        {task.due_date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) + ',' + task.due_date.getFullYear()}

      </span>
      <div className="flex items-center justify-between mt-3 w-full">
        <input
          type="number"
          className="w-16 mr-4 p-2 border rounded text-base font-semibold"
          value={reminderDays}
          onChange={handleDaysChange}
          min={minDays} // Set the minimum value
          max={maxDays} // Set the maximum value
        />
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-[20%] rounded"
          onClick={() => { saveReminder() }}
        >
          Save
        </button>
      </div>
    </div>
  </div>
);
};

export default ReminderSetDays;
