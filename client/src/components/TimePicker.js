import React, { useState } from 'react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import '../css/DateInput.css'; // Optional: For CSS styling
import { useRef } from 'react';


export default function MyTimePicker({ onChange,id,placeholder }) {

    const Timeref=useRef(null);
  const [value, setValue] = useState(null);
  const [index,setindex]=useState('-1');
  const [dateIndex,setdateIndex]=useState('1');
  
  const handlePlaceholderClick=()=>{
    setindex('1');
    setdateIndex('-1');

if (Timeref.current) {
      Timeref.current.focus();

      // For modern browsers (Chrome, Edge, Opera)
      if (typeof Timeref.current.showPicker === 'function') {
        Timeref.current.showPicker();
      }
    }

  }

  return (
    <div  style={{ padding: '1rem',position:'relative',display:'inline-block'}}>
      <div ref={Timeref} style={{zIndex:index,display:'flex', position: 'absolute',left: '0px',right:'0px'
}}>

      <TimePicker
        onChange={(val) => {
    setValue(val);
   if (val) {
    const [hourStr, minute] = val.split(':');
    let hour = parseInt(hourStr);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    const formatted = `${hour}:${minute} ${ampm}`;
    onChange(formatted);
  } else {
    onChange(null);
  } // this will pass the value (e.g. "10:30") to parent
  }}
        id={id}
        value={value}
        disableClock={true}
        format="hh:mm a"
        clearIcon={null}
        amPmAriaLabel="Select AM/PM"
        required
        />
        </div>
            <span  style={{zIndex:dateIndex}}className="date-placeholder" onClick={handlePlaceholderClick}>{placeholder}</span>
        </div>
  );
}
