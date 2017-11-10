import {
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from './fetch';

const host = window.location.origin;
const endpoints = `${host}/api/v1/Todo`;

export const addTodo = (data) => fetchPost(`${host}/api/todo`, data);

export const updateTodo = (todoId, data) => fetchPut(`${host}/api/todo/${todoId}`, data);

export const deleteTodo = (id) => fetchDelete(`${endpoints}/${id}`);

export const getTodo = (id) => fetchGet(`${host}/api/todo`, id);
