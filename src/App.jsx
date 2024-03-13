/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Header from './components/Header';
import TaskType from './components/TaskType';
import ErrorMessage from "./components/ErrorMessage";
import TaskModal from "./components/TaskModal";

function App() {
  const [task, setTask] = useState({});
  const [taskList, setTaskList] = useState([]);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {

  }, [task])
  
  
  return (
    <>
      <div className='container mx-auto mt-20 flex flex-col items-center justify-center'>
        <Header />

        <div className='w-1/2 mt-12 flex flex-col items-center justify-center'>
          <div className='mt-12 w-full flex-row flex items-center justify-center'>
              <div className='w-3/4'>
                <TaskForm 
                    setTask={setTask}
                    taskList={taskList}
                    setTaskList={setTaskList} 
                    setError={setError}
                />
              </div>
              <div className='w-1/4'>
                <TaskType
                    taskList={taskList}
                    setTaskList={setTaskList}
                />
              </div>
          </div>
          { error && <ErrorMessage>Taskname cannot be blank</ErrorMessage> }

          <TaskList 
              task={task}
              setTask={setTask}
              taskList={taskList}
              setTaskList={setTaskList}  
              setModal={setModal}
              setError={setError}
          />


        </div>

      </div>
      {modal && <TaskModal
        setModal={setModal}
        animarModal={animarModal}
        task={task}
        setTask={setTask}
      />}

    </>
  )
}

export default App
