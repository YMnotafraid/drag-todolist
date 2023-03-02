import React from "react";

export default function AddEventButton({ handleClick }) {
  return (
    <div>
      <button className="add-button" onClick={handleClick}>
        +
      </button>
    </div>
  );
}
