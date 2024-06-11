/**
 * this function will detete item from state
 * @param {String} title Notification title
 * @param {Integer} duration Duration to visible notification in minutes
 * @param {Function} setFunc state function to change the state
 * @returns {void} nothing to return
*/

const Notification = (title, duration, setFunc) => {
      // show notification
      setFunc(title);

      // hide notification
      setTimeout(() => {
            setFunc('');
      }, duration * 1000);
}


/**
 * This function will complete the selected task or item
 * @param {Object} todo Current seleted item to complete the task
 * @param {Array} todolist TodoList state
 * @param {Function} setFunc setTodo list function to change the state
 * @returns {void} nothing to return
*/

const CompleteTaskItem = (todo, todolist, setFunc, setNotiFunc) => {
      const toCompleteId = todo.id;
      setFunc(todolist.map(item => item.id == toCompleteId ? {...item, completed: !item.completed} : item));

      // notification
      Notification('Task Updated', 3, setNotiFunc);

}

/**
 * This function will create new task
 * @param {Array} todolist TodoList context
 * @param {String} title task input for title 
 * @param {String} description task input for description
 * @param {Function} setFunc setTodoList to set the todolist state
 * @param {Function} setNotiFunc setNotification to set new notification
 * @returns {void} Nothing to return
*/

const CreateNewTask = (todolist, title, description, setFunc, setNotiFunc) => {
      setFunc([...todolist,  {
            id: todolist.length + 1,
            title: title.current.value,
            description: description.current.value,
            completed: false,
      }]);

      title.current.value = '';
      description.current.value = '';

      // notification
      Notification('Task Created', 3, setNotiFunc);
}


export default {
      Notification,
      CompleteTaskItem,
      CreateNewTask,
}