import React, { useState } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "../css/DateInput.css"; // Optional: For CSS styling
import { useRef } from "react";

export default function MyTimePicker({ placeholder }) {
  const Timeref = useRef(null);
  const [value, setValue] = useState(null);
  const [index, setindex] = useState("-1");
  const [dateIndex, setdateIndex] = useState("1");

  const handlePlaceholderClick = () => {
    setindex("1");
    setdateIndex("-1");

    if (Timeref.current) {
      Timeref.current.focus();

      // For modern browsers (Chrome, Edge, Opera)
      if (typeof Timeref.current.showPicker === "function") {
        Timeref.current.showPicker();
      }
    }
  };

  return (
    <div
      style={{ padding: "1rem", position: "relative", display: "inline-block" }}
    >
      {/* <label style={{ display: 'block', marginBottom: '0.5rem' }}>Select Time:</label> */}
      <div
        ref={Timeref}
        style={{
          zIndex: index,
          display: "flex",
          position: "absolute",
          left: "0px",
          right: "0px",
        }}
      >
        <TimePicker
          onChange={setValue}
          value={value}
          disableClock={true}
          format="hh:mm a"
          clearIcon={null}
          amPmAriaLabel="Select AM/PM"
          required
        />
      </div>
      <span
        style={{ zIndex: dateIndex }}
        className="date-placeholder"
        onClick={handlePlaceholderClick}
      >
        {placeholder}
      </span>
    </div>
  );
}
