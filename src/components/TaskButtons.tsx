import editIcon from "../images/edit_button_icon.svg";
import shareIcon from "../images/share_button_icon.svg";
import EditTaskMenu from "./EditTaskMenu";
import ShareMenu from "./ShareMenu";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../types/IRootState";
import { getTaskPinnedLength } from "../store/tasksActions";
import { togglePinned } from "../store/tasksActions";

type Props = {
  setAlert: (alert: JSX.Element) => void;
  index: number;
  pinned: boolean;
};

export default function TaskButtons(props: Props) {
  const dispatch = useDispatch();

  const maxPinIndex = useSelector((state: IRootState) =>
    getTaskPinnedLength(state)
  );

  function switchPinned() {
    if (maxPinIndex >= 3 && !props.pinned) {
      alert("Maximum pinned tasks!");
    } else {
      dispatch(togglePinned(props.index));
      location.reload();
    }
  }

  function ShowEditTaskMenu() {
    props.setAlert(
      <EditTaskMenu setAlert={props.setAlert} index={props.index} />
    );
  }

  function ShowPublishMenu() {
    props.setAlert(<ShareMenu setAlert={props.setAlert} />);
  }

  return (
    <div className="interact-task-buttons">
      <button className="edit-button" onClick={ShowEditTaskMenu}>
        <img className="interact-button-img-scale" src={editIcon} alt=""></img>
      </button>
      <button>i</button>
      <button className="share-button" onClick={ShowPublishMenu}>
        <img className="interact-button-img-scale" src={shareIcon} alt=""></img>
      </button>
      <button onClick={switchPinned}>Pin</button>
    </div>
  );
}
