import { createSelector } from 'reselect';
import { getTodosByOwner } from 'data/Todo/selectors';
import stateName from './stateName';

const getUiState = (state) => state.get(stateName);
const getTodoByowner = (state) => getTodosByOwner(state, 'chanerandio');

export default () => createSelector(
  getUiState, getTodoByowner,
  (uiState, todoByOwner) => {
    const isLoading = uiState.get('isLoading');
    return {
      isLoading,
      todoByOwner,
    };
  }
);
