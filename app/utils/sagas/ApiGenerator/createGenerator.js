import { call } from 'redux-saga/effects';
import injectIdentifier from './injectIdentifier';

/**
 * @callback generatorCallback
 * @param {Object} args - arguments passed in api call
 * @param {string} identifier - identifier of the module that invoked the api call
 */

/**
 * createApiGenerator
 * actions will be called with the identifier as the second argument
 * @param  {Object} actions - object of actions
 * @param  {Function} generator - the generator function to call
 * @param  {string} identifier - name of the module to use the api generator
 * @return {generatorCallback} a generator function to call the passed generator with actions as second argument
 */
const createApiGenerator = (actions) => (generator) => (identifier) => {
  if (!identifier) {
    // console.warn('identifier not provided. Will fail to track who is calling this generator');
  }

  // wrap actions so second argument will be the identifier
  const injectedIdentifierActions = injectIdentifier(actions, identifier);

  return function* apiGenerator(...args) {
    return yield call(generator, ...args, injectedIdentifierActions);
  };
};

export default createApiGenerator;
