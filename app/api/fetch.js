import origFetch from 'isomorphic-fetch';

let defaultHeaders = {};

export const addBearerToken = (token) => {
  defaultHeaders = {
    ...defaultHeaders,
    Authorization: `bearer ${token}`,
  };
};

const defaultDataHeaders = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const defaultParams = {
  credentials: 'same-origin',
};

function getWriteRequestParams(method = 'POST', params, data) {
  return {
    ...defaultParams,
    headers: {
      ...defaultHeaders,
      ...defaultDataHeaders.headers,
    },
    ...params,
    body: JSON.stringify(data),
    method,
  };
}

function getFetchParams(method = 'GET', params, data) {
  switch (method) {
    case 'GET':
    case 'DELETE':
      return {
        ...defaultParams,
        headers: {
          ...defaultHeaders,
        },
        ...params,
        method,
      };
    default:
      return getWriteRequestParams(method, params, data);
  }
}

function genericFetch(url, params) {
  const request = new Promise((resolve, reject) => {
    // console.log('gen f', url, params)
    origFetch(url, params)
        .then((res) => {
          if (res.ok) {
            if (res.status === 204) {
              resolve({ result: 'ok' });
            } else {
              res.json().then((data) => {
                resolve(data);
              });
            }
          } else if (res.json) {
            const { status, statusText } = res;
            // console.warn('error in request', url, params, res);

            if (status === 500) {
              // status 500 will return html and cant be json parsed
              reject({ error: { status, statusText } });
            } else if (status === 401) {
              // console.error('UNATHORIZED REQUEST');
              // rebuildToken();
              reject({ error: { status, statusText } });
            } else {
              res.json().then((error) => {
                let errorObject = { error };
                if (typeof error !== 'object') {
                  // console.warn('Error object not in json', error);
                  errorObject = { error: { unparsedError: error } };
                }
                reject(errorObject);
                // throw(err);
              });
            }
          } else {
            reject(res);
            // throw(res);
          }
        })
        .catch((error) => {
          // console.warn('error in request - catch', url, params, error);
          reject(error);
        });
  });

  return request;
}


export const fetchGet = (url, params) => {
  const urlParams = params ? Object.keys(params).map((key) => `${key}=${encodeURIComponent(params[key])}`).join('&') : '';
  return genericFetch(urlParams ? `${url}?${urlParams}` : url, getFetchParams('GET', params));
};

export const fetchPost = (url, data, params) =>
    genericFetch(url, getFetchParams('POST', params, data));
export const fetchPut = (url, data, params) =>
    genericFetch(url, getFetchParams('PUT', params, data));
export const fetchDelete = (url, params) => {
  const urlParams = params ? Object.keys(params).map((key) => `${key}=${encodeURIComponent(params[key])}`).join('&') : '';
  return genericFetch(urlParams ? `${url}?${urlParams}` : url, getFetchParams('DELETE', params));
};
