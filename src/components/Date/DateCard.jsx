import React from 'react';

function DateCard({ date }) {
  const month = date.toLocaleString('en-US', { month: 'long' });
  const day = date.toLocaleString('en-US', { day: '2-digit' });
  // eslint-disable-next-line no-unused-vars
  const year = date.getFullYear();

  return (
    <div className="expense-date">
      <div className="expense-date__month">{month}</div>
      {/* <div className="expense-date__year">{year}</div> */}
      <div className="expense-date__day">{day}</div>
    </div>
  );
}

export default DateCard;
