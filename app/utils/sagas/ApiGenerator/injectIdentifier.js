/**
 * injectIdentifier - wraps the actions passed to inject identifier as the second argument when dispatching the actions
 * @param  {Object} actions - object of actions
 * @param  {String} identifier - the identifier to inject when dispatching passed actions
 * @return {Object} same set of actions passed but wrapped to inject identifier name
 */
export default (actions, identifier) => {
  const injectedActionObjects = {};
  const actionKeys = Reflect.ownKeys(actions);
  actionKeys.forEach((a) => {
    const action = actions[a];
    injectedActionObjects[a] = (...args) => (action(...args, identifier));
  });

  return injectedActionObjects;
};
