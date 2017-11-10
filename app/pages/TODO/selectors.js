import { createSelector } from 'reselect';
import { getTodosByOwner } from 'data/Todo/selectors';
import stateName from './stateName';
const getUiState = (state) => state.get(stateName);
const getTodosByOwnerName = (state) => {
  const ownerName = state.getIn(['bootstrapData', 'name']);
  return getTodosByOwner(state, ownerName);
};

export default () => createSelector(
  getUiState, getTodosByOwnerName,
  (uiState, todoByOwner) => {
    const isLoading = uiState.get('isLoading');
    return {
      isLoading,
      todoByOwner,
    };
  }
);
