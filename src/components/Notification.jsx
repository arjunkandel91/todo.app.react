import { bell } from "../scripts/Image";

function Notification({ content }) {
  return (
    <div className="notification">
        <img src={bell} />
        <p>{ content }</p>
    </div>
  )
}

export default Notification