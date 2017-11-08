/*
 * Bootstrap Actions
 *
 */

import {
  GET_CREDENTIAL,
  GET_CREDENTIAL_SUCCESS,

  LOGOUT,
  LOGOUT_SUCCESS,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of GET_CREDENTIAL
 */
export function getCredentials(payload) {
  return {
    type: GET_CREDENTIAL,
    payload,
  };
}

export function getCredentialsSuccess() {
  return {
    type: GET_CREDENTIAL_SUCCESS,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}
