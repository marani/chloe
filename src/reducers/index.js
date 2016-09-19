import { combineReducers } from 'redux';

// let initialState = {
//   listIds: [1, 2, 3],
//   lists: {
//     1: {
//       id: 1,
//       name: 'To Do',
//       priority: 1,
//       projectIds: []
//     },
//     2: {
//       id: 2,
//       name: 'In Progress',
//       priority: 2,
//       projectIds: []
//     },
//     3: {
//       id: 3,
//       name: 'Done',
//       priority: 3,
//       projectIds: []
//     }
//   },
//   projects: { }
// };

let initialState = [{
    id: 1,
    name: 'To Do',
    priority: 1,
    projects: []
    // projects: [{ id: 3, name: 'Project 3'}]
  },
  {
    id: 2,
    name: 'In Progress',
    priority: 2,
    projects: []
    // projects: [{ id: 2, name: 'Project 2'}]
  },
  {
    id: 3,
    name: 'Done',
    priority: 3,
    projects: []
    // projects: [{ id: 1, name: 'Project 1'}]
  }
];

const lists = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return state.map((list) => {
        if (list.id === action.listId) {
          return {
            ...list,
            projects: [{
                id: action.projectId,
                name: action.projectName
              },
              ...list.projects
            ]
          };
        } else {
          return list;
        }
      });
    case 'MOVE_PROJECT':
      let movingProject;
      let fromListId;
      state.some(list => list.projects.some(project => {
        if (project.id === action.fromProjectId) {
          movingProject = project;
          fromListId = list.id;
          return true;
        }
        return false;
      }));
      movingProject = Object.assign({}, movingProject);

      return state.map((list) => {
          if (list.id === fromListId) {
            return {
              ...list,
              projects: list.projects.filter(project => project.id !== action.fromProjectId)
            };
          } else {
            return list;
          }
        }).map(list => {
          if (list.id === action.toListId) {
            return {
              ...list,
              projects: [
                ...list.projects.slice(0, action.hoverIndex),
                movingProject,
                ...list.projects.slice(action.hoverIndex)
              ]
            };
          } else {
            return list;
          }
        });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  lists
});

export default rootReducer;
