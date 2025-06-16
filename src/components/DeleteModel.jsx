import { close } from "../scripts/Image";

function DeleteModel({ task, cancel, del }) {
  return (
    <>
        <div className="delete-box">
            <div className="close"><img src={close} /></div>
            <div className="content">
                <h4>Do you want to delete <strong>{ task.title }</strong> ?</h4>
            </div>
            <div className="action">
                <button onClick={() => cancel()}>Cancel</button>
                <button className="addbtn" onClick={() => del(task)}>Delete</button>
            </div>
        </div>
        <div className="overlay"></div>
    </>
  )
}

export default DeleteModel;