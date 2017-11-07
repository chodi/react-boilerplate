import home from 'containers/Home/saga';
import todo from 'pages/TODO/sagas';
import navigationList from 'containers/NavigationList/sagas';

export default [
  ...home,
  ...todo,
  ...navigationList,
];
