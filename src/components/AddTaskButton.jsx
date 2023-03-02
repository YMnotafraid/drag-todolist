import React from "react";

export default function AddTaskButton({ handleClick }) {
  return (
    <button className="add-task-button" onClick={handleClick}>
      +
    </button>
  );
}
