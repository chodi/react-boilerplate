import home from 'containers/Home/saga';
import todo from 'containers/TODO/sagas';

export default [
  ...home,
  ...todo,
];
