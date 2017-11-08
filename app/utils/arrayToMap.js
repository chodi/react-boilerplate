/**
 * converts array to object mapped by the defined key
 * @param  {Array} array [description]
 * @param  {String} key   [description]
 * @return {object}       [description]
 */
export default (array, key = 'id') => array.reduce((mappedList, item) => ({
  ...mappedList,
  [item[key]]: item,
}), {});
