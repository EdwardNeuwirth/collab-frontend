const URL = 'http://localhost:3030';

let token = localStorage.getItem('token');

const apiFetch = (path, originalOptions = {}, ...rest) => {
  const url = `${URL}${path}`;
  const options = {
    ...originalOptions,
    headers:{
      Authorization: token && `Bearer ${token}`,
      ...originalOptions.headers
    }
  };
  return fetch(url, options, ...rest)
    .then(res => {
      token = res.headers.get('x-token');
      // token = res.response
      localStorage.setItem('token', token);
      return res;
    })
    .then(res => res.json());
};

const createUser = (data) => {
  return apiFetch('/register/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

const getUnvotedOperations = () => {
  return apiFetch('/vote/');
};

const getOperation = (operation) => {
  return apiFetch('/operations/' + operation);
};

const voteOperation = (data) => {
  return apiFetch('/vote/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};




export default {
  createUser,
  getUnvotedOperations,
  voteOperation,
  getOperation,
};
