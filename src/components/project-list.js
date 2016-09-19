import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { moveProject } from '../actions';
import ProjectItem from './project-item';
import ProjectCounter from './project-counter';
import './project-list.css';

class ProjectList extends Component {
  render () {
    let { list, dispatch } = this.props;
    let projectList = list.projects.map((project, i) => (
      <ProjectItem key={project.id}
        allowDrag={true}
        projectId={project.id}
        listId={list.id}
        index={i}
        text={project.name}
        moveProject={(args) => {
          dispatch(moveProject({
            ...args
          }));
        }}/>
    ));
    if (!projectList || !projectList.length) {
      projectList = [
        <ProjectItem key={'project-pllaceholder-' + list.id}
          allowDrag={false}
          index={0}
          listId={list.id}
          moveProject={(args) => {
            dispatch(moveProject({
              ...args
            }));
          }}/>
      ];
    }
    return (
      <div className="project-list">
        <div className="list-head">
          <h2 className="list-title">{list.name}</h2>
          <ProjectCounter source={[list.id]}/>
        </div>
        <div className="list-content">
          {projectList}
        </div>
      </div>
    );
  }
}

// let ProjectList = ({ list, dispatch }) => {
//   return (
//     <div className="project-list">
//       <div className="list-head">
//         <h2 className="list-title">{list.name}</h2>
//         <ProjectCounter source={[list.id]}/>
//       </div>
//       <div className="list-content">
//         {list.projects.map((project, i) => (
//           <ProjectItem key={project.id}
//             projectId={project.id}
//             listId={list.id}
//             index={i}
//             text={project.name}
//             moveProject={(args) => {
//               dispatch(moveProject({
//                 ...args
//               }));
//             }}/>
//         ))}
//       </div>
//     </div>
//   );
// };

ProjectList.propTypes = {
  listId: PropTypes.number
};

const mapStateToProps = (state, ownProps) => ({
  list: state.lists.filter(list => list.id === ownProps.listId)[0],
  // draggingIndex: state.draggingIndex
});

ProjectList = connect(mapStateToProps)(ProjectList);

export default ProjectList;
