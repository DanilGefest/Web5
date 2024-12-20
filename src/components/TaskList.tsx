import { useSelector, useDispatch } from "react-redux";
import TaskExemp from "./TaskExemp";
import NoTaskMessage from "./NoTaskMessage";
import { moveTask } from "../store/tasksActions";
import { IRootState } from "../types/IRootState";
import { Task } from "../types/Task";

type Props = { setAlert: (alert: JSX.Element) => void };

export default function TaskList({ setAlert }: Props) {
  const tasks = useSelector((state: IRootState) => state.tasks);
  const dispatch = useDispatch();

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    dispatch(moveTask(dragIndex, hoverIndex));
  };

  if (tasks.length == 0) {
    return (
      <div>
        <NoTaskMessage />
      </div>
    );
  }
  const taskList = tasks.map((task: Task, index: number) => (
    <TaskExemp
      key={`${task.title}-${index}-${task.about}`}
      index={index}
      task={task}
      setAlert={setAlert}
      moveCard={moveCard}
    />
  ));
  return <div className="to-do-list-container">{taskList}</div>;
}
