import {
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from './fetch';

const host = window.location.origin;
const endpoints = `${host}/api/todo`;

export const addTodo = (data) => fetchPost(endpoints, data);

export const updateTodo = (todoId, data) => fetchPut(`${endpoints}/${todoId}`, data);

export const deleteTodo = (id) => fetchDelete(`${endpoints}/${id}`);

export const getTodo = (id) => fetchGet(endpoints, id);
