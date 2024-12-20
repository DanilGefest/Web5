import { useState } from "react";
import TaskList from "./components/TaskList.tsx";
import { Provider } from "react-redux";
import store from "./store/Store";
import AddTask from "./components/AddTask.tsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [alert, setAlert] = useState<JSX.Element>();
  return (
    <>
      <Provider store={store}>
        {alert}
        <AddTask />
        <DndProvider backend={HTML5Backend}>
          <TaskList setAlert={setAlert} />
        </DndProvider>
      </Provider>
    </>
  );
}

export default App;
