import React, { useState, useEffect } from 'react';
import 'react-dates/initialize';
import moment from 'moment';
import {
  DateRangePicker,
  DayPicker,
  SingleDatePicker,
  DayPickerRangeController,
} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import '../styles/custom_datepicker.css';

function BnBDateRangePicker(props) {
  const [focused, setFocused] = useState(false);
  const [date, setDate] = useState(moment());

  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [focusedInput, setFocusedInput] = useState('startDate');
  const RWD = props.RWD;
  useEffect(() => {
    console.log(startDate);
  }, [startDate]);
  useEffect(() => {
    console.log(date);
  }, [date]);
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
      onFocusChange={(focusedInput) => {
        setFocusedInput(focusedInput);
      }} // PropTypes.func.isRequired,
      initialVisibleMonth={() => moment()} // PropTypes.func or null,
      numberOfMonths={1}
      endDateOffset={(day) => day}
      daySize={50}
      hideKeyboardShortcutsPanel={true}
    />
  );

  return <>{RWD ? rwddisplay : display}</>;
}
export default BnBDateRangePicker;
