// src/components/Toggle/Toggle.jsx
import React, { useState } from "react";
import "./Toggle.css";

function Toggle({ defaultChecked = false, onChange }) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const newValue = !checked;
    setChecked(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={checked} onChange={handleToggle} />
      <span className="slider" />
    </label>
  );
}

export default Toggle;
