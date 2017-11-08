import bootstrap from 'containers/Bootstrap/sagas';
import todo from 'pages/TODO/sagas';

export default [
  ...bootstrap,
  ...todo,
];
