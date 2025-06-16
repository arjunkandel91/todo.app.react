import { emptytask } from "../scripts/Image";

export default function EmptyTask() {
  return (
    <div className="empty-task">
        <img src={emptytask} />
        <p>There are no tasks assigned to you at the moment. Feel free to add new tasks here.</p>
    </div>
  )
}