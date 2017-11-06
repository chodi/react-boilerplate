import fetch from 'node-fetch';

export default (url, params) => {
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
