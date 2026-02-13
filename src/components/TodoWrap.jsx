import Storage from "../scripts/Storage";

function TodoWrap({ children }) {
  
  const ClearStorage = () => {
    Storage.remove();
  }

  return (
    <>
      <div className="todo-app">
          {children}
      </div>

      <div className="info">
          <a href="https://github.com/arjunkandel91/todo.app.vue" target="_blank">This project was built using React.js</a>
          <a href="#" onClick={ClearStorage}>Clear Storage</a>
      </div>
    </>
  )
}

export default TodoWrap