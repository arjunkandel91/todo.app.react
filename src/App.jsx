// react
import React, { useState } from 'react';

// script
import { FilterTodo, NotifyPop } from './scripts/Todo';
import Storage from './scripts/Storage';

// components
import TodoWrap from './components/TodoWrap';
import TodoHeader from './components/TodoHeader';
import TodoCard from './components/TodoCard';
import Notification from './components/Notification';
import DeleteModel from './components/DeleteModel';



function App() {
  
  // Task list
  const [TodoList, setTodoList] = useState(Storage.get());
  const [Notify, setNotify] = useState({
    show: false,
    content: ''
  });

  const [DeleteTodo, setDeleteTodo] = useState({
    show: false,
    task: {}
  });

  // complete or incomplete tasks (toggled)
  const ToggleComplete = (task) => {
    setTodoList(TodoList.map(t => {
      if (t.id == task.id) t.completed = !t.completed;
      return t;
    }));

    // default filter
    setTodoList(FilterTodo('incomplete', TodoList));    

    // update storage
    Storage.store(TodoList);

    // toast notify
    NotifyPop(Notify, setNotify, 'Task successfully updated!');
    
  };


  // This function initiate the delete function
  // delete model will be shown and the task which user want to delete will be updated to the ref
  const DeleteInitiate = (task) => {
    setDeleteTodo({
      ...DeleteTodo,
      show: true,
      task: task
    });
  }

  // This function finally delete the selected task
  // step1: removed from the todo array list
  // step2: delete model will be closed
  // step3: update the local storage
  // step4: show toast notification to the user
  const DeleteTask = () => {
    let toDelete = DeleteTodo.task.id;
    setTodoList(TodoList.filter(todo => todo.id !== toDelete));

    // hide the model
    setDeleteTodo({
      ...DeleteTodo,
      show: false
    })

    // update storage
    Storage.store(TodoList);

    // toast notify
    NotifyPop(Notify, setNotify, 'Task successfully deleted');
  }

  return (
    <TodoWrap>
        {/* Header content / search / task search 
            Add new task / task input section */}
        <TodoHeader count={TodoList.length} />

        {/* Task App List contains all task list created */}
        <ul className="todo-list">
          {TodoList.map(todo => {
            return (<TodoCard key={todo.id} todo={todo} complete={ToggleComplete} del={DeleteInitiate} />)
          })}
        </ul>
        {/* Task App List */}


        {Notify.show && <Notification content={Notify.content} />}

        {DeleteTodo.show && <DeleteModel task={DeleteTodo.task} cancel={() => setDeleteTodo({...DeleteTodo, show: false})} del={DeleteTask} />}


    </TodoWrap>
  )
}

export default App