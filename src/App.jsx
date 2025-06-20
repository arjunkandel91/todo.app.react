// react
import React, { useState } from 'react';

// script
import { FilterTodo, NotifyPop, TodoUniqueId, SearchTodoList } from './scripts/Todo';
import Storage from './scripts/Storage';

// components
import TodoWrap from './components/TodoWrap';
import TodoHeader from './components/TodoHeader';
import TodoCard from './components/TodoCard';
import Notification from './components/Notification';
import DeleteModel from './components/DeleteModel';



function App() {
  
  // the todo list constant which sets data initially from the Local Storage
  // it is reactive data and will modified in other actions
  const [TodoList, setTodoList] = useState(Storage.get());

  // toast notification object ref, property [show: true] will show the toast
  // it will be hidden within 2 seconds automatically
  // property [content] will be updated according to the activity on todo list
  const [Notify, setNotify] = useState({
    show: false,
    content: ''
  });

  // task delete object state, property [show: true] will show the delete model
  // and property [task] contains the object which user want to delete
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
    const updated = TodoList.filter(todo => todo.id !== toDelete);
    setTodoList(updated);

    // hide the model
    setDeleteTodo({
      ...DeleteTodo,
      show: false
    })

    // update storage
    Storage.store(updated);

    // toast notify
    NotifyPop(Notify, setNotify, 'Task successfully deleted');
  }

  /**
   * This function initiate the edit todo
   * @param {Object} task 
   * the selected task will have property edit: true, and false to other all
  */
  const EditTaskInitiate = (task) => {
    setTodoList(TodoList.map(t => {
      if (t.id == task.id) t.edit = true;
      else t.edit = false;
      return t;
    }));
  };

  // This function disable all todo edit mode 
  const EditCancel = () => {
    setTodoList(TodoList.map(t => {
      t.edit = false;
      return t;
    }));
  }

  /**
   * This function is called from the child component 'TodoCard.vue' after submission to update the selected task
   * @param {String} id 
   * @param {String} title updated title
   * @param {String} description updated description
  */

  const EditTask = (id, title, description) => {
    let updated = TodoList.map(t => {
      if (t.id == id) {
        t.title = title;
        t.description = description;
        t.edit = false;
      }
      return t;
    });
    setTodoList(updated);

    // update local storage
    Storage.store(updated);

    // toast notify
    NotifyPop(Notify, 'Task successfully updated!');
  }


  // this function add new task with unique id to the todo array list
  // also update the local storage and show the toast notification
  const AddNewTask = (task) => {
    task['id'] = TodoUniqueId(TodoList);

    // update local storage
    Storage.store([task, ...TodoList]);

    // update the dom
    setTodoList([task, ...TodoList]);   

    // toast notify
    NotifyPop(Notify, setNotify, 'New task added!');
  }



  return (
    <TodoWrap>
        {/* Header content / search / task search 
            Add new task / task input section */}
        <TodoHeader count={TodoList.length} addTask={AddNewTask} searchTask={(keyword) => SearchTodoList(TodoList, setTodoList, keyword)} />

        {/* Task App List contains all task list created */}
        <ul className="todo-list">
          {TodoList.map(todo => {
            return (<TodoCard key={todo.id} todo={todo} 
                              complete={ToggleComplete} 
                              del={DeleteInitiate} 
                              editInit={EditTaskInitiate} 
                              editCancel={EditCancel}
                              editTask={EditTask} />)
          })}
        </ul>
        {/* Task App List */}


        {Notify.show && <Notification content={Notify.content} />}

        {DeleteTodo.show && <DeleteModel task={DeleteTodo.task} cancel={() => setDeleteTodo({...DeleteTodo, show: false})} del={DeleteTask} />}
          
        

    </TodoWrap>
  )
}

export default App