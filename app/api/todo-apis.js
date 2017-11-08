import {
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from './fetch';

const host = window.location.origin;
const endpoints = `${host}/api/v1/Todo`;

// export const addTodo = (data) => fetchPost(endpoints, data);

// export const updateTodo = (topicId) => fetchPut(`${endpoints}/${topicId}/activities`);

// export const deleteTodo = (id) => fetchDelete(`${endpoints}/${id}`);

export const getTodo = (id, params) => fetchGet(`${endpoints}`, null, params);
