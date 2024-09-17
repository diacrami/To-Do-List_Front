/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useReducer } from "react"
import axios from "axios";
import Swal from "sweetalert2";
import { taskAPI } from "../api/tasksAPI";

const TaskForm = ({setTask, taskList, setError}) => {

    const [taskname, setTaskName] = useState('');
    const [state, setState] = useState('T');
    

    useEffect(() => {
          
      return () => {
        
      }
    }, [taskList])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if ([taskname.trim()].includes("")) {
                setError(true);
                return;
            }
            setError(false);

            const taskObject = {
                taskname,
                state
            }
            

            await taskAPI.post("/createtask", taskObject);
            setTask(taskObject)
            setTaskName('');

        } catch (error) {
            Swal.fire({
                title: "There has been an error.",
                text: error,
                icon: "error",
                confirmButtonText: "OK",
            });
        }        
    }   

  return (
    
    <>
          <div>
              <form
                  id="form"
                  onSubmit={handleSubmit}
                  action=""

              >
                  <div className="md:w-full lg:w-full mb-5 flex flex-row rounded-tl-md rounded-bl-md">
                      <input
                          id="task"
                          type="text"
                          placeholder="Enter Task"
                          className="border-2 w-4/5 h-12 p-2 border-white rounded-tl-md rounded-bl-md"
                          value={taskname}
                          onChange={(e) => setTaskName(e.target.value)}
                      />
                      <button
                          type="submit"
                          className="border-2 w-1/5 h-12 flex justify-end bg-white border-white rounded-tr-md rounded-br-md"
                      >
                          <img
                              src="./assets/add_.png"
                              className="h-8 w-8 mt-1 mr-2"
                              alt="add"
                          />
                      </button>
                  </div>
              </form>
          </div>    
    </>
  )
}

export default TaskForm