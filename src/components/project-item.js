import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import './project-item.css';

const cardSource = {
  beginDrag(props) {
    return {
      index: props.index,
      listId: props.listId,
      projectId: props.projectId
    };
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    const fromListId = monitor.getItem().listId;
    const fromProjectId = monitor.getItem().projectId;
    const toListId = props.listId;
    const toProjectId = props.projectId;

    // console.log(props, monitor, component);

    // Don't replace items with themselves
    // if (dragIndex === hoverIndex) {
    //   return;
    // }

    // Determine rectangle on screen
    // console.log(props, monitor.getItem(), component);
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveProject({
      fromProjectId, toProjectId, fromListId, toListId, dragIndex, hoverIndex
    });

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

class ProjectItem extends Component {
  render() {
    const {
      project, allowDrag, isDragging, didDrop, canDrag, connectDragSource, connectDropTarget
    } = this.props;
    const opacity = canDrag ? 1 : 0;
    console.log(isDragging, didDrop);
    if (allowDrag) {
      return (
        connectDragSource(connectDropTarget(
          <div style={{ opacity }} className="project-item">
            {project.name}
          </div>
        ))
      );
    } else {
      return (
        connectDropTarget(
          <div className="project-item project-item-placeholder">
            Drop Project Here
          </div>
        )
      );
    }
  }
}

ProjectItem = DragSource('project', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  didDrop: monitor.didDrop(),
  canDrag: monitor.canDrag()
}))(ProjectItem);

ProjectItem = DropTarget('project', cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget()
}))(ProjectItem);

const mapStateToProps = (state, ownProps) => {
  let project;
  state.lists.some(list => list.projects.some(p => {
    if (p.id === ownProps.projectId) {
      project = p;
      return true;
    }
    return false;
  }));
  return {
    project
  };
};

ProjectItem = connect(mapStateToProps)(ProjectItem);

export default ProjectItem;
