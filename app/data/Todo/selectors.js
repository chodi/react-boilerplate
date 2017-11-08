import stateName from './stateName';

export const getTodos = (state) => state.get(stateName);
export const getTodosByOwner = (state, owner) => state.get(stateName).filter((todo) => todo.get('owner') === owner);
