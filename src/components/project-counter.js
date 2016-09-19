import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import './project-counter.css';

// get data from where
let ProjectCounter = ({ lists, source }) => {
  let count = lists.filter(list => source.indexOf(list.id) > -1)
    .reduce((total, list) => total += list.projects.length, 0);
  return (
    <div className="project-counter">
      <div className="number">{count}</div>
      <div className="label">Projects</div>
    </div>
  );
};

ProjectCounter.propTypes = {
  source: PropTypes.arrayOf(PropTypes.number)
};

const mapStateToProp = (state) => ({
  lists: state.lists
});

ProjectCounter = connect(
  mapStateToProp
)(ProjectCounter);

export default ProjectCounter;
