import home from 'containers/Home/saga';
import todo from 'pages/TODO/sagas';

export default [
  ...home,
  ...todo,
];
