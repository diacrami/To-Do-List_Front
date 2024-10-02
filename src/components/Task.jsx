/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { taskAPI } from "../api/tasksAPI";
import Swal from "sweetalert2";


const Task = ({ task, setTask, setModal }) => {

  const { taskname, state } = task;

  const editModal = () => {
    setModal(true);
    setTask(task);
  }

  const taskUpdate = async (e) => {

    //console.log(e.target.checked);
    try {
      const { taskid, taskname, state, isActive } = task;
      let estado;
      if (e.target.checked) { //state === 'T'
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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {

        try {
          const { taskid, taskname, state, isActive } = task;
          let activo;
          if (isActive === true) {
            activo = false;
          } else {
            activo = true;
          }
          const objetoTarea = {
            taskname,
            state,
            isActive: activo
          }
          await taskAPI.put(`updatetask/${taskid}`, objetoTarea)
            .then(() => {
              setTask(task);
              Swal.fire({
                title: "Deleted!",
                text: "Your task has been deleted.",
                icon: "success",
                confirmButtonColor: "#3085d6",
              });
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
    });


  }

  return (
    <>
      <div className="w-[400px] h-full flex flex-row justify-center mt-1 mb-1">
        <div className={"border-2 border-white bg-white w-9/12 h-full justify-end p-2 " + (state == 'C' ? 'opacity-60' : 'opacity-100')}>
          <label
            className={"bg-white w-full h-full text-center " + (state == 'C' ? 'line-through' : 'no-underline')}
          >
            {taskname}
          </label>
        </div>

        <div className="w-3/12 border-white bg-white grid grid-cols-3 place-items-center">
          <div className="bg-white w-5 h-full flex items-center">

            <input className="h-5 w-5 hover:cursor-pointer hover:bg-slate-300 accent-black" type="checkbox" onChange={taskUpdate} checked={task.state == 'T' ? false : true} />
          </div>
          {/* <button
            className="border-2 w-10 h-10 flex justify-end bg-white border-white p-2 hover:bg-gray-400"
            onClick={() => { taskUpdate(); }}
          >
            {
              task.state == 'T'
                ?
                <img
                  src="./assets/uncheck_.jpg"
                  className="h-full w-30"
                  alt="uncheck"
                />
                :
                <img
                  src="./assets/check_.jpg"
                  className="h-full w-30"
                  alt="check"
                />


            }

          </button> */}
          <button
            className="h-full w-5 bg-white"
            onClick={() => editModal()}
          >
            <img
              src="./assets/edit.svg"
              className=" hover:cursor-pointer hover:bg-slate-300"
              alt="edit"
            />

          </button>

          <button
            className="h-full w-5 bg-white"
            onClick={() => taskDelete()}
          >
            <img
              src="./assets/delete_.png"
              className=" hover:cursor-pointer hover:bg-slate-300"
              alt="delete"
            />

          </button>
        </div>
      </div>
    </>
  )
}


export default Task