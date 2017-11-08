import fetch from 'node-fetch';

const getRequest = (url, params) => {
  return fetch(url,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  .then((result) => {
    return result.json();
  })
  .then((result) => ({ result, error: {} }))
  .catch((error) => ({ result: {}, error }));
};

const postRequest = (url, params) => {
  return fetch(url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }
  )
  .then((result) => {
    return result.json();
  })
  .then((result) => ({ result, error: {} }))
  .catch((error) => ({ result: {}, error }));
};


const updateRequest = (url, id, params) => {
  return fetch(url,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }
  )
  .then((result) => {
    return result.json();
  })
  .then((result) => ({ result, error: {} }))
  .catch((error) => ({ result: {}, error }));
};

const deleteRequest = (url, id, params) => {
  return fetch(url,
    {
      method: 'DELETE',
    }
  )
  .then((result) => {
    return result;
  })
  .then((result) => ({ result, error: {} }))
  .catch((error) => ({ result: {}, error }));
};

const request = { getRequest, postRequest, updateRequest, deleteRequest };
export default request;
