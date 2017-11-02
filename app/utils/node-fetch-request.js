import fetch from 'node-fetch';

export default (url, params) => {
  return fetch(url,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1OWYyYThlNzAyMWFhZTAwMTgwYTEwZWYiLCJpYXQiOjE1MDk2MDY5MDd9._FTAJRryXJHTzLhsV-6gVmSuKGFMuTrcUwMCdVrHMkE',
      },
    }
  )
  .then((result) => {
    return result.json();
  })
  .then((result) => ({ result, error: {} }))
  .catch((error) => ({ result: {}, error }));
}
