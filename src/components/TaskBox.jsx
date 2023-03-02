import React, { useCallback } from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
export default function TaskBox({
  events,
  setEvents,
  currentEvent,
  setCurrentEvent,
}) {
  //父传子就用usecallback处理回调函数性能优化
  const handleRemove = useCallback(() => {
    if (confirm("You really want to remove it?")) {
      setEvents((prev) => {
        const res = prev.filter((item) => item.title !== currentEvent.title);
        if (!res.length) {
          const initEvent = [
            {
              title: "Add a new Event",
              ["To do"]: [],
              ["In progress"]: [],
              ["Completed"]: [],
            },
          ];
          setEvents(initEvent);
        } else {
          setCurrentEvent(res[0]);
        }
        return res;
      });
    }
  }, [events, setEvents, currentEvent, setCurrentEvent]);

  //拖拽的核心函数，对列表进行增删
  const handleDragEnd = useCallback(
    (res) => {
      if (!res.destination) return;
      const { source, destination } = res;
      const curEvent = events.find((item) => item.title === currentEvent.title);
      const taskCopy = curEvent[source.droppableId][source.index];
      setEvents((prev) =>
        prev.map((event) => {
          if (event.title === currentEvent.title) {
            let eventCopy = { ...event };
            // remove from source
            const taskListSource = event[source.droppableId];
            taskListSource.splice(source.index, 1);
            eventCopy = { ...event, [source.droppableId]: taskListSource };
            // add to destination
            const taskListDes = event[destination.droppableId];
            taskListDes.splice(destination.index, 0, taskCopy);
            eventCopy = { ...event, [destination.droppableId]: taskListDes };
            return eventCopy;
          } else {
            return event;
          }
        })
      );
    },
    [events, setEvents, currentEvent]
  );
  return (
    <div className="task-box">
      <header className="task-box-header">
        <h1 className="task-box-title">All Tasks</h1>
        <button className="remove-button" onClick={handleRemove}>
          Remove this Event
        </button>
      </header>
      <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
        <div className="task-box-body">
          {["To do", "In progress", "Completed"].map((tag) => (
            <Column
              key={tag}
              tag={tag}
              events={events}
              setEvents={setEvents}
              currentEvent={currentEvent}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
