import delButton from "../images/button-dell.svg";
import DeleteAlert from "./DeleteAlert";
import { useRef, useState } from "react";
import TaskButtons from "./TaskButtons";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../utils/ItemTypes";
import { Task } from "../types/Task";
import { useSelector } from "react-redux";
import { IRootState } from "../types/IRootState";
import { getTaskPinnedLength } from "../store/tasksActions";

type Props = {
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  setAlert: (alert: JSX.Element) => void;
  task: Task;
};

export default function TaskExemp(props: Props) {
  const [buttonsVisible, setButtonsVisible] = useState<Boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  function showDeleteAlert() {
    props.setAlert(
      <DeleteAlert setAlert={props.setAlert} index={props.index} />
    );
  }

  const maxPinIndex = useSelector((state: IRootState) =>
    getTaskPinnedLength(state)
  );

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: props.task.pinned ? ItemTypes.PINNED_TASK : ItemTypes.TASK,
      item: { index: props.index },
      canDrag: props.task.pinned ? false : true,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [props.index, props.task]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.TASK,
      hover(item: { index: number; type: string; id: string }, monitor) {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = props.index;

        if (dragIndex === hoverIndex) {
          return;
        }

        if (hoverIndex < maxPinIndex) {
          return;
        }

        const hoverBoundingRect = ref.current.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        props.moveCard(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    }),
    [props.index, props.moveCard]
  );

  drag(drop(ref));

  return (
    <div ref={ref}>
      <div
        className="task"
        onClick={() => setButtonsVisible(!buttonsVisible)}
        style={
          props.task.pinned
            ? {
                borderColor: "#ff7033",
                borderRadius: "32px",
                borderWidth: "8px",
              }
            : {}
        }
      >
        <div className="text-task">
          <h2> {props.task.title}</h2>
          <p> {props.task.about}</p>
        </div>
        <div className="delete-button">
          <button onClick={showDeleteAlert} className="button-del">
            <img src={delButton} alt="" />
          </button>
        </div>
      </div>
      {buttonsVisible && (
        <TaskButtons
          setAlert={props.setAlert}
          index={props.index}
          pinned={props.task.pinned}
        />
      )}
    </div>
  );
}
