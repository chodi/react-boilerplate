/*
 */

import {
  GET_CREDENTIAL,
} from './constants';

export function getCredentials(payload) {
  return {
    type: GET_CREDENTIAL,
    payload,
  };
}

