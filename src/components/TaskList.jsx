/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Task from "./Task"
import { useEffect } from "react"
import { taskAPI } from "../api/tasksAPI";

const TaskList = ({taskList, setTaskList, task, setTask, setModal}) => {

  const loadTasks = async()=> {
    const resp= await taskAPI.get("listtask");
    const myData = [].concat(resp.data).sort((a, b) => a.taskid > b.taskid ? 1 : -1)
    setTaskList(myData);
  }
  useEffect(() => {
    loadTasks();
  }, [task]);

  return (
    <>
        <div className="flex flex-col items-center justify-center mt-14">

            {taskList.map((task)=>{
              return (
                
                <Task
                  key={task.taskid}
                  task={task}
                  setTask={setTask}
                  setModal={setModal}
                />
                
              )
            })}
        </div>
    </>
  )
}

export default TaskList