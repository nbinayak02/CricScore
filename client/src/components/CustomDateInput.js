import React, { useRef, useState,useEffect } from "react";
import "../css/DateInput.css"; // Optional: For CSS styling

const CustomDateInput = ({ start_date, Setstart_date, onChange, id, placeholder }) => {
  const inputRef = useRef(null);

  // const formattedSetstart_date = new Date(Setstart_date).toISOString().split("T")[0];
  const formattedstart_date = new Date(start_date);
  // const formattedSetstart_date = new Date(Setstart_date).toISOString().split("T")[0];

  const [index, setindex] = useState(-1);

 const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => {
    if (start_date) {
      const d = new Date(start_date);
      if (!isNaN(d)) {
        const isoDate = d.toISOString().split("T")[0]; // "yyyy-MM-dd"
        setFormattedDate(isoDate);
      }
      else{
          setFormattedDate('');
      }
    }
  }, [start_date]);

  const handlePlaceholderClick = () => {
    // setindex(1);

    if (inputRef.current) {
      inputRef.current.focus();

      // For modern browsers (Chrome, Edge, Opera)
      if (typeof inputRef.current.showPicker === "function") {
        inputRef.current.showPicker();
      }
    }
  };

  return (
    <div className={`date-wrapper ${start_date ? "filled" : ""}`}>
      <input
        style={{ zIndex: formattedDate ? 2 : index}}
        id={id}
        type="date"
        ref={inputRef}
        value={formattedDate || ''}
        required
        onChange={(e) => {
          setFormattedDate(e.target.value);
          Setstart_date(e.target.value);
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
