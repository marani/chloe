let nextProjectId = 4;

export const addProject = (args) => {
  return {
    type: 'ADD_PROJECT',
    projectId: nextProjectId++,
    projectName: args.projectName,
    listId: args.listId
  }
}

export const moveProject = (args) => {
  return {
    type: 'MOVE_PROJECT',
    ...args
  }
}
