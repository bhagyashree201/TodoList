import React,{useEffect, useState} from 'react';
import CreateTaskPopup from '../modals/CreateTaskPopup';
import Card from './Card'
const TodoList = () => {
    const [modal, setModal]= useState(false);

    const [taskList,setTaskList]=useState([]);

    useEffect(()=>{
        let arr=localStorage.getItem("taskList")

        if(arr){
            let obj=JSON.parse(arr)
            setTaskList(obj)
        }
    },[])


    const deleteTask=(index)=>{
        let tempList=taskList
        tempList.splice(index,1)
        localStorage.setItem("taskList",JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()

    }

    const updateListArray=(obj,index)=>{
        let tempList=taskList
        tempList[index]=obj
        localStorage.setItem("taskList",JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
            var tempList=taskList
            tempList.push(taskObj)
            localStorage.setItem("taskList",JSON.stringify(tempList))
            setTaskList(tempList)
            setModal(false)
    }

    return (<>
        <div className="header text-center">
            <h2 >Todo List</h2>
            <button className =" btn btn-primary mt-2 " onClick= {() => setModal(true)}>Create Task</button>
        </div>
        <div>
            <div className="task-container">
                    {taskList && taskList.map((obj,index)=> <Card taskObj={obj} index={index} deleteTask={deleteTask} updateListArray={updateListArray}/>)}

            </div>
            <CreateTaskPopup toggle={toggle} modal={modal} save={saveTask} />
        </div>
        </>
    );
};

export default TodoList;