import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/tasksActions";
import plusButton from "../images/plus-button.svg";

function YourComponent() {
  const dispatch = useDispatch();
  const inputTitleRef = useRef<HTMLInputElement>(null);
  const inputAboutRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputAboutRef.current?.focus();
  }, []);

  function newTaskHandler() {
    const title = inputTitleRef.current!.value.trim();
    const about = inputAboutRef.current!.value.trim();
    if (title !== "" && about !== "") {
      dispatch(addTask(title, about));
      inputTitleRef.current!.value = "";
      inputAboutRef.current!.value = "";
    }
  }

  const handleKeyDown = (event:  React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      newTaskHandler();
    }
  };

  return (
    <div className="form-container">
      <div className="form-inputs">
        <input
          ref={inputTitleRef}
          id="input-title"
          type="text"
          placeholder="Title..."
          onKeyDown={handleKeyDown}
        />
        <input
          ref={inputAboutRef}
          id="input-about"
          type="text"
          placeholder="About..."
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="button-add-task-container">
        <button onClick={newTaskHandler} id="add-task-button">
          <img src={plusButton} alt="" />
        </button>
      </div>
    </div>
  );
}

export default YourComponent;
