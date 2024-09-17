/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { taskAPI } from "../api/tasksAPI";

const TaskType = ({setTaskList}) => {

    const selectedOption = async(option) => {
        const resp = await taskAPI.get(`/filter/${option}`);
        const list = [].concat(resp.data).sort((a, b) => a.taskid > b.taskid ? 1 : -1)
        setTaskList(list);

    }

  return (

    <>
          <form action="">
              <div className="md:h-1/2 md:w-full lg:h-1/2 lg:w-full rounded-md">

                  <div className="mb-5 h-12">
                      <select
                          className="border-2 w-full h-full p-2 ml-2 rounded-md"
                          onChange={(e)=> selectedOption(e.target.value)}
                      >
                          <option value="A">All</option>
                          <option value="C">Completed</option>
                          <option value="T">To Do</option>
                      </select>
                  </div>

              </div>

          </form>
    </>
  )
}

export default TaskType