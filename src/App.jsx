import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import "./components/event.css";
import "./components/task.css";
import EventBar from "./components/EventBar";
import TaskBox from "./components/TaskBox";
export default function App() {
  //初始任务,useMemo作用：父组件重新渲染，因为initEvent永不更新，那么引用了initEvent的子组件也不会更新
  const initEvent = useMemo(
    () => [
      {
        title: "Add a new Event",
        ["To do"]: [],
        ["In progress"]: [],
        ["Completed"]: [],
      },
    ],
    []
  );
  //任务列表
  const [events, setEvents] = useState(() => {
    return localStorage.getItem("events")
      ? JSON.parse(localStorage.getItem("events"))
      : initEvent;
  });

  //当前选中的任务
  const [currentEvent, setCurrentEvent] = useState(events[0]);

  //更新任务列表,useCallback作用：当父组件重新渲染时,只要events不变化，updateEvent函数就不变
  //那么引用了updateEvent函数的子组件不会重新渲染
  const updateEvent = useCallback(async () => {
    try {
      if (!events.length) {
        await localStorage.setItem("events", JSON.stringify(initEvent));
        setEvents(JSON.parse(localStorage.getItem("events")));
      } else {
        await localStorage.setItem("events", JSON.stringify(events));
      }
    } catch (e) {
      console.err("Failed to modify events!");
    }
  }, [events]);

  //当任务列表变化时更新任务列表
  useEffect(() => {
    updateEvent();
  }, [events]);
  return (
    //将数据收集到公共组件，实现单向数据流，有利于组件之间解耦和提高组件的复用性
    <div className="App">
      <EventBar
        events={events}
        setEvents={setEvents}
        currentEvent={currentEvent}
        setCurrentEvent={setCurrentEvent}
      ></EventBar>
      <TaskBox
        events={events}
        setEvents={setEvents}
        currentEvent={currentEvent}
        setCurrentEvent={setCurrentEvent}
      ></TaskBox>
    </div>
  );
}
