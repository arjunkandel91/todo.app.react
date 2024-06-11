import { useRef } from "react";

import { VscSymbolNumeric, VscCalendar } from "react-icons/vsc";
import { GrFlag } from "react-icons/gr";

function TaskInputModal () {

      // input fields as ref
      const title = useRef('');
      const description = useRef('');

      const textAreaAdjust = () => {
            description.current.style.height = "auto";
            description.current.style.height = (description.current.scrollHeight) + "px";
      }
            
      return (
            <>
                  <div className="addtask-modal todo15s fadeInUp">
                        <div className="input-box" style={{border: 'none'}}>
                              <div className="input">
                                    <input className="title" type="Task Title" placeholder="Title" ref={title} />
                                    <textarea placeholder="Description" ref={description} onKeyUp={textAreaAdjust}></textarea>
                              </div>
                              <div className="dueproj">
                                    <div className="btn">
                                          <VscCalendar color="#5f5f5f" size={16} />
                                          <p>Due Date</p>
                                    </div>
                                    <div className="btn">
                                          <VscSymbolNumeric color="#5f5f5f" size={16} />
                                          <p>Project</p>
                                    </div>
                                    <div className="btn">
                                          <GrFlag color="#5f5f5f" size={14} />
                                          <p>Priority</p>
                                    </div>
                              </div>
                              <div className="button">
                                    <button>Cancel</button>
                                    <button className="addbtn">Add task</button>
                              </div>
                        </div>
                   </div>
                   <div className="overlay"></div>            
            </>
      );
}

export default TaskInputModal;