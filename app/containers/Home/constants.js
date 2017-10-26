/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOGOUT = 'boilerplate/Home/LOGOUT';
export const LOGOUT_SUCCESS = 'boilerplate/Home/LOGOUT_SUCCESS';
export const GET_CREDENTIAL = 'boilerplate/Home/GET_CREDENTIAL';
export const GET_CREDENTIAL_FAIL = 'boilerplate/Home/GET_CREDENTIAL_FAIL';
export const GET_CREDENTIAL_SUCCESS = 'boilerplate/Home/GET_CREDENTIAL_SUCCESS';
