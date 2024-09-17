/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useReducer, useEffect } from 'react';
import CerrarBtn from '../../public/assets/cerrar.svg';
import { taskAPI } from '../api/tasksAPI';
import Swal from 'sweetalert2';
import ErrorMessage from './ErrorMessage';

const TaskModal = ({setModal, task, setTask}) => {

    const [taskname, setTaskname] = useState('');
    const [error, setError] = useState(false);

    const ocultarModal = () => {        
        setModal(false);
    }

    useEffect(() => {
        if( Object.keys(task).length > 0 ){
            const {taskname} = task;
            setTaskname(taskname);
        }
    }, [task]);

    const taskEdit = async (e) =>{
        e.preventDefault();

        
            //Form Validation
            if ([taskname.trim()].includes("")) {
                setError(true);
                return;
            }
            setError(false);
        try {
          const { taskid, state, isActive } = task;
          const objetoTarea = {
            taskname,
            state,
            isActive
          }
          
          await taskAPI.put(`/updatetask/${taskid}`, objetoTarea)
          .then(() => {
            setTask(objetoTarea);
            setModal(false);
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
    /* 
      background-color: rgb(1 1 1 / 0.92);
    */
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-90 flex justify-center ">
        <div className="absolute top-12 right-12 w-12 h-12">
            <img
                className='hover:cursor-pointer'
                src={CerrarBtn}
                alt="cerrar modal"
                onClick={ocultarModal}
            />
        </div>
        <form 
            action=""
            onSubmit={taskEdit}
        >
            <legend className='text-white flex justify-center mt-40 font-bold text-5xl border-b-2 border-b-gray-400 w-96'>Edit Task</legend>
            <label 
                htmlFor="taskname"
                className='text-white font-medium w-full block mt-10'
            >
                Task Name:
            </label>
            <input 
                id='taskname'
                type="text" 
                className='border-2 w-full mt-2 h-12 p-2 border-white rounded-md'
                value={taskname}
                onChange={(e) => setTaskname(e.target.value)}
            />
            {error && <ErrorMessage>Taskname cannot be blank</ErrorMessage>}
            <div className='w-full flex justify-center mt-10'>
                <button
                    type='submit'
                    className='bg-slate-500 block justify-center h-1/2 w-1/2 font-bold uppercase border-2 rounded-md p-3 hover:bg-slate-600 cursor-pointer'
                >
                    Save
                </button>
            </div>
        </form>
    </div>
  )
}

export default TaskModal