
import React, { useState, useEffect, useRef } from 'react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import '../css/DateInput.css';
import '../css/timepicker.css';

export default function MyTimePicker({ match_time, onChange, id, placeholder }) {
  const [value, setValue] = useState(match_time || '');
  const inputWrapperRef = useRef(null);
  const Timeref=useRef(null);
    const [index,setindex]=useState('-1');
  const [dateIndex,setdateIndex]=useState('1');

  useEffect(() => {
    setValue(match_time || '');
  }, [match_time]);

  const handleChange = (val) => {
    setValue(val);
    onChange(val || '');
  };

const handlePlaceholderClick = () => {
  setindex('0');
  setdateIndex('-1');

  const input = inputWrapperRef.current?.querySelector('input');
  if (input) {
    input.focus();
    if (typeof input.showPicker === 'function') {
      input.showPicker();
    }
  }
};

  return (
    <div
      className="time-picker-wrapper"
      style={{ position: 'relative', width: '100%' }}
      ref={inputWrapperRef}
    >
      <TimePicker
        id={id}
        onChange={handleChange}
        value={value}
        disableClock={true}
        format="hh:mm a"
        clearIcon={null}
        amPmAriaLabel="Select AM/PM"
        className="custom-time-picker"
        required
      />

      {/* Simulated placeholder */}
      {!value && (
                <div>
            <span  style={{ position: 'absolute',
            zIndex:dateIndex,
            top: '27%',
            left: '-30px',
            transform: 'translateY(-50%)',
            color: '#aaa',
            pointerEvents: 'auto',
            cursor: 'text',
            fontSize: '1rem',}}
           className="date-placeholder"
            onClick={handlePlaceholderClick}>{placeholder}</span>
        </div>
      )}
    </div>
  );
}
