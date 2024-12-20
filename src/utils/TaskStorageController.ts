import { Task } from "../types/Task";
import { ItemTypes } from "./ItemTypes";

export function resetList() {
  const arr: Task[] = [];
  localStorage.setItem("TaskStorage", JSON.stringify(arr));
}

export function addTask(task: Task) {
  const taskList = getTaskList();
  taskList.push(task);
  localStorage.setItem("TaskStorage", JSON.stringify(taskList));
}

export function editTask(index: number, newTitle: String, newAbout: String) {
  const taskList = getTaskList();
  taskList[index].title = newTitle;
  taskList[index].about = newAbout;
  localStorage.setItem("TaskStorage", JSON.stringify(taskList));
}

export function delTask(index: number) {
  const taskList = getTaskList();
  taskList.splice(index, 1);
  localStorage.setItem("TaskStorage", JSON.stringify(taskList));
}

export function getTaskList() {
  const taskList = JSON.parse(localStorage.getItem("TaskStorage") ?? "[]");
  const sortedTasks = taskList.sort((a: Task, b: Task) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });
  return sortedTasks;
}

export function toggleTask(index: number) {
  const taskList = getTaskList();
  if (getPinnedTaskCount() >= 3 && !taskList[index].pinned) {
    return;
  }
  taskList[index].pinned = !taskList[index].pinned;
  localStorage.setItem("TaskStorage", JSON.stringify(taskList));
}

export function getPinnedTaskCount() {
  let pinnedCount = 0;
  const taskList = getTaskList();
  taskList.map((task: Task) => {
    if (task.pinned) {
      pinnedCount++;
    }
  });
  return pinnedCount;
}

export function moveTask(dragIndex: number, hoverIndex: number) {
  const taskList = getTaskList();
  const draggedTask = taskList[dragIndex];

  if (draggedTask.type == ItemTypes.PINNED_TASK) {
    return;
  }

  taskList.splice(dragIndex, 1);
  taskList.splice(hoverIndex, 0, draggedTask);
  localStorage.setItem("TaskStorage", JSON.stringify(taskList));
}
