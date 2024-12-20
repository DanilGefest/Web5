import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../store/tasksActions";
import { IRootState } from "../types/IRootState";

type Props = { setAlert: (alert: JSX.Element) => void; index: number };

export default function EditTaskMenu(props: Props) {
  const dispatch = useDispatch();
  const task = useSelector((state: IRootState) => state.tasks[props.index]);

  const inputTitleRef = useRef<HTMLInputElement>(null);
  const inputAboutRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputTitleRef.current?.focus();
  }, []);

  function closeAlert() {
    props.setAlert(<></>);
  }

  function showEditTask() {
    const newTitle = inputTitleRef.current!.value.trim();
    const newAbout = inputAboutRef.current!.value.trim();

    if (newTitle !== "" && newAbout !== "") {
      dispatch(editTask(props.index, newTitle, newAbout));
      closeAlert();
    }
  }

  return (
    <div className="blur">
      <div className="edit-button-container">
        <input
          ref={inputTitleRef}
          className="edit-title-input"
          placeholder="Title..."
          defaultValue={task.title}
        ></input>
        <textarea
          ref={inputAboutRef}
          className="edit-about-input"
          placeholder="About..."
          defaultValue={task.about}
        ></textarea>

        <div>
          <button className="no-edit-button" onClick={closeAlert}>
            Cancel
          </button>
          <button className="yes-edit-button" onClick={showEditTask}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
