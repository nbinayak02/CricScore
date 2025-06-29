import React, { useRef, useState } from "react";
import "../css/DateInput.css"; // Optional: For CSS styling

const CustomDateInput = ({ setMatchDate, onChange, id, placeholder }) => {
  const [date, setDate] = useState("");
  const inputRef = useRef(null);

  const [index, setindex] = useState(-1);

  const handlePlaceholderClick = () => {
    setindex(1);

    if (inputRef.current) {
      inputRef.current.focus();

      // For modern browsers (Chrome, Edge, Opera)
      if (typeof inputRef.current.showPicker === "function") {
        inputRef.current.showPicker();
      }
    }
  };

  return (
    <div className={`date-wrapper ${date ? "filled" : ""}`}>
      <input
        style={{ zIndex: index }}
        id={id}
        type="date"
        ref={inputRef}
        value={date}
        required
        onChange={(e) => {
          setDate(e.target.value);
          setMatchDate(e.target.value)
          onChange?.(e.target.value);
        }}
      />
      <span className="date-placeholder" onClick={handlePlaceholderClick}>
        {placeholder}
      </span>
    </div>
  );
};

export default CustomDateInput;
