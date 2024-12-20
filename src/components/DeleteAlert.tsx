import { useDispatch } from "react-redux";
import { deleteTask } from "../store/tasksActions";

type Props = { setAlert: (alert: JSX.Element) => void; index: number };

export default function DeleteAlert(props: Props) {
  const dispatch = useDispatch();
  function deleteTaskHandle() {
    dispatch(deleteTask(props.index));
    closeAlert();
  }
  function closeAlert() {
    props.setAlert(<></>);
  }
  return (
    <div className="del-blur">
      <div className="del-alert-container">
        Delete this task ?
        <div className="del-button-section">
          <button onClick={deleteTaskHandle} id="yes-del-button">
            Yes
          </button>
          <button onClick={closeAlert} id="no-del-button">
            No
          </button>
        </div>
      </div>
    </div>
  );
}
