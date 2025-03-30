// src/components/Button/Button.jsx
import React from "react";
import "./Button.css";

function Button({ variant = "default", children, onClick }) {
  let className = "btn";
  if (variant === "edit") className += " btn-edit";
  if (variant === "delete") className += " btn-delete";
  if (variant === "default") className += " btn-default";

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
