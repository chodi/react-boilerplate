import { createSelector } from 'reselect';
import { getTodos } from 'data/Todo/selectors';
import stateName from './stateName';

const getUiState = (state) => state.get(stateName);

export default () => createSelector(
  getUiState,
  (uiState) => {
    const isLoading = uiState.get('isLoading');
    return {
      isLoading,
    };
  }
);
