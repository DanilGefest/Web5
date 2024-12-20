import { createStore } from "redux";
import rootReducer from ".";
import { getTaskList } from "../utils/TaskStorageController";

const persistedState = getTaskList() || [];

const store = createStore(rootReducer, { tasks: persistedState });

export default store;
