import React, { useCallback } from "react";
import AddEventButton from "../components/AddEventButton";
export default function EventBar({
  events,
  setEvents,
  currentEvent,
  setCurrentEvent,
}) {
  //useCallback：父传子通过回调函数通信时，可以避免子组件重复渲染
  //添加新事件
  const handleAdd = useCallback(() => {
    const title = prompt("Enter the Title:");
    //如果事件名已存在则return
    if (
      events.find((event) => event.title.toLowerCase() === title.toLowerCase())
    ) {
      alert("event already existed");
      return;
    }
    //通过setEvents子传父，添加新事件
    if (title) {
      setEvents((prev) => [
        ...prev,
        {
          title,
          ["To do"]: [],
          ["In progress"]: [],
          ["Completed"]: [],
        },
      ]);
    }
  }, [events, setEvents]);

  return (
    <div className="event-bar">
      <h1 className="event-bar-title">DragToDoList</h1>
      <AddEventButton handleClick={handleAdd} />
      <div className="event-container">
        {events.map((item) => (
          <div
            key={item.title}
            className={`event over-hide ${
              currentEvent.title === item.title ? "selected-event" : ""
            }`}
            onClick={() => setCurrentEvent(item)}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
}
