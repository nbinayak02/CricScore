// import React, { useState,useEffect } from 'react';
// import TimePicker from 'react-time-picker';
// import 'react-time-picker/dist/TimePicker.css';
// import 'react-clock/dist/Clock.css';
// import '../css/DateInput.css'; // Optional: For CSS styling
// import { useRef } from 'react';


// export default function MyTimePicker({ match_time,onChange,id,placeholder }) {

//     const Timeref=useRef(null);
//   const [value, setValue] = useState(match_time? match_time :null);
  // const [index,setindex]=useState('-1');
  // const [dateIndex,setdateIndex]=useState('1');

//     // ✅ Sync prop change with local state
//   useEffect(() => {
//     setValue(match_time || null);
//   }, [match_time]);
  
//   const handlePlaceholderClick=()=>{
//     setindex('0');
//     setdateIndex('-1');

// if (Timeref.current) {
//       Timeref.current.focus();

//       // For modern browsers (Chrome, Edge, Opera)
//       if (typeof Timeref.current.showPicker === 'function') {
//         Timeref.current.showPicker();
//       }
//     }

//   }

//   return (
//     <div  style={{ padding: '1rem',position:'relative',display:'inline-block'}}>
//       <div ref={Timeref} style={{zIndex:index,display:'flex', position: 'absolute',left: '0px',right:'0px'
// }}>
//       <TimePicker
//         onChange={(val) => {
//     setValue(val);
//    if (val) {
//     onChange(val);
//   } else {
//     onChange(null);
//   } // this will pass the value (e.g. "10:30") to parent
//   }}
//         id={id}
//         value={value}
//         disableClock={true}
//         format="hh:mm a"
//         clearIcon={null}
//         amPmAriaLabel="Select AM/PM"
//         required
//         />
//         </div>
            // <span  style={{zIndex:dateIndex}}className="date-placeholder" onClick={handlePlaceholderClick}>{placeholder}</span>
//         </div>
//   );
// }
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

    const handlePlaceholderClick=()=>{
    setindex('0');
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
    <div
      className="time-picker-wrapper"
      style={{ position: 'relative', width: '100%' }}
      ref={inputWrapperRef}
    >
      <TimePicker
        id={id}
        ref={Timeref}
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
        // <div
        //   className="time-placeholder"
        //   onClick={() => {
        //     const input = inputWrapperRef.current?.querySelector('input');
        //     if (input) input.focus();
        //   }}
        //   style={{
            // position: 'absolute',
            // top: '50%',
            // left: '12px',
            // transform: 'translateY(-50%)',
            // color: '#aaa',
            // pointerEvents: 'auto',
            // cursor: 'text',
            // fontSize: '1rem',
        //   }}
        // >
        //   {placeholder}
        // </div>
      )}
    </div>
  );
}
