/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { taskAPI } from "../api/tasksAPI";
import Swal from "sweetalert2";


const Task = ({task, setTask, setModal}) => {

    const {taskname, state} = task;

    const editModal = () => {
        setModal(true);
        setTask(task);
    }

    const taskUpdate = async () => {

        try {
            const {taskid, taskname, state, isActive} = task;
            let estado;
            if (state === 'T') {
                estado = 'C';
            } else {
                estado = 'T';
            }
            const objetoTarea = {
                taskname, 
                state: estado,
                isActive
            }
    
          
          await taskAPI.put(`updatetask/${taskid}`, objetoTarea)
          .then(() => {
            setTask(task);
          });
        } catch (error) {
          Swal.fire({
            title: "There has been an error",
            text: error,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      };

    const taskDelete = async () => {
        try{
          const {taskid, taskname, state, isActive} = task;
          let activo;
          if(isActive===true){
            activo=false;
          }else{
            activo=true;
          }
          const objetoTarea = {
            taskname, 
            state,
            isActive:activo
          }
          await taskAPI.put(`updatetask/${taskid}`, objetoTarea)
          .then(() => {
            setTask(task);
          });
        } catch (error) {
          Swal.fire({
            title: "There has been an error",
            text: error,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      
      }
    
  return (
    <>
          <div className="w-96 h-full flex flex-row justify-center mt-1 mb-1">
              <div className={"border-2 border-white bg-white w-10/12 h-full justify-end p-2 " + (state == 'C' ? 'opacity-60' : 'opacity-100')}>
                  <label
                      className={"bg-white w-full h-full text-center " + (state == 'C' ? 'line-through' : 'no-underline')}
                  >
                      {taskname}
                  </label>
              </div>

              <div className="border-white bg-white flex">
                  <button
                      className="border-2 w-10 h-10 flex justify-end bg-white border-white p-2"
                      onClick={() => { taskUpdate(); }}
                  >
                      {
                          task.state == 'T'
                              ?
                              <img
                                  src="./assets/uncheck_.jpg"
                                  className="h-full w-30"
                                  alt="add"
                              />
                              :
                              <img
                                  src="./assets/check_.jpg"
                                  className="h-full w-30"
                                  alt="add"
                              />


                      }

                  </button>
                  <button
                      className="border-2 w-10 h-10 flex justify-end bg-white border-white p-2"
                      onClick={() => editModal()}
                  >
                      <img
                          src="./assets/edit_.jpg"
                          className="h-full w-30"
                          alt="edit"
                      />

                  </button>

                  <button
                      className="border-2 w-10 h-10 flex justify-end bg-white border-white p-2"
                      onClick={() => taskDelete()}
                  >
                      <img
                          src="./assets/delete_.png"
                          className="h-full w-30"
                          alt="delete"
                      />

                  </button>
              </div>
          </div>
    </>
  )
}


export default Task