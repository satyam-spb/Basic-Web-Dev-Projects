import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleDown,faTrashCan } from '@fortawesome/free-solid-svg-icons';

// import FontAwesomeIcon from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";

function ToDoList(){
    const [tasks,setTasks] = useState([]);
    function addNewTask(){
        const newTask = document.getElementById("inputTask").value;
        if (newTask.trim() !== '') {
            setTasks(t => [...t,newTask]);
        }
        document.getElementById("inputTask").value = "";

    }
    function removeTask(index){
        const updatedTasks = tasks.filter((_,i) => i !== index);
        setTasks(updatedTasks);
    }
    function moveTaskUp(index){
        const updatedTasks = [...tasks];
        if(index>0){
            [updatedTasks[index],updatedTasks[index-1]] = [updatedTasks[index-1],updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }
    function moveTaskDown(index){
        const updatedTasks = [...tasks];
        if(index < tasks.length - 1){
            [updatedTasks[index],updatedTasks[index+1]] = [updatedTasks[index+1],updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return(
        <div className="to-do-list">
            <h1>To Do List</h1>
            <input type="text" id="inputTask" placeholder="Enter a task" />
            <button onClick={addNewTask}>Add task</button>
            <ul>
                {tasks.map((task,index) => 
                    <li className='list' key={index} >
                        <span className="text">{task}</span>
                        
                        <FontAwesomeIcon className='icon' id='up-icon' icon={faArrowCircleDown} rotation={180} onClick={() => moveTaskUp(index)} />
                        <FontAwesomeIcon className='icon' id='down-icon' icon={faArrowCircleDown}  onClick={() => moveTaskDown(index)} />
                        <FontAwesomeIcon className='icon' id='delete-icon' icon={faTrashCan} onClick={() => removeTask(index)} />
                    </li>
                )}
            </ul>
            
        </div>
    );
}
export default ToDoList