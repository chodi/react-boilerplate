import { createSelector } from 'reselect';
import stateName from './stateName';

const getUiState = (state) => state.get(stateName);

export default () => createSelector(
  getUiState,
  (uiState) => {
    const allTodos = uiState.get('allTodos');
    const isLoading = uiState.get('isLoading');
    return {
      allTodos,
      isLoading,
    };
  }
);
