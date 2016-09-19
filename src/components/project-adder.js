import React from 'react'
import { connect } from 'react-redux';
import { addProject } from '../actions';
import './project-adder.css';

let ProjectAdder = ({ dispatch }) => {
  let input;
  return (
    <div className="project-adder">
      <span className="label">Add Project</span>
      <input className="input"
        ref={node => { input = node; }}
        type="text"
        onKeyDown={(e) => {
          if (e.which === 13) {
            if (input.value.trim()) {
              dispatch(addProject({
                listId: 1,
                projectName: input.value.trim()
              }));
            }
            input.value = '';
          }
        }}/>
    </div>
  );
}

ProjectAdder = connect(() => ({}))(ProjectAdder);

export default ProjectAdder;
