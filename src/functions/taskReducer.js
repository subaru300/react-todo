const taskReducer = (state, action) => {
  switch (action.type) {
    case 'add': {
      return [
        ...state,
        {
          task: action.task,
          id: action.id,
        },
      ];
    }
    case 'remove': {
      return state.filter((task) => task.id !== action.id);
    }
    case 'done': {
      return state.map((task) =>
        task.id === action.id ? { ...task, isDone: !task.isDone } : task
      );
    }
    default:
      return state;
  }
};

export default taskReducer;
