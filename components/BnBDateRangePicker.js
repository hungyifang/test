import React, { useState, useRef } from 'react';
import 'react-dates/initialize';
import moment from 'moment';
import {
  DateRangePicker,
  DayPicker,
  SingleDatePicker,
  DayPickerRangeController,
} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/lib/css/custom_datepicker.css';

function BnBDateRangePicker(props) {
  const [focused, setFocused] = useState(false);
  const [date, setDate] = useState(moment());

  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [focusedInput, setFocusedInput] = useState('');
  const RWD = props.RWD;

  const rwddisplay = (
    <SingleDatePicker
      date={date} // momentPropTypes.momentObj or null
      onDateChange={(date) => setDate(date)} // PropTypes.func.isRequired
      focused={focused} // PropTypes.bool
      onFocusChange={({ focused }) => setFocused(focused)} // PropTypes.func.isRequired
      id="your_unique_id" // PropTypes.string.isRequired,
    />
  );
  const display = (
    <DayPickerRangeController
      startDate={startDate} // momentPropTypes.momentObj or null,
      endDate={endDate} // momentPropTypes.momentObj or null,
      onDatesChange={({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);
      }} // PropTypes.func.isRequired,
      focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
      onFocusChange={({ focusedInput }) => {
        setFocusedInput(focusedInput);
      }} // PropTypes.func.isRequired,
      initialVisibleMonth={() => moment().add(2, 'M')} // PropTypes.func or null,
      numberOfMonths={1}
      onDayClick={() => {
        console.log(startDate);
      }}
    />
  );

  return <>{RWD ? rwddisplay : display}</>;
}
export default BnBDateRangePicker;
