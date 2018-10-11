const fetch = require('axios');

function request(method, url, params = {}, body = null) {
  const reqParams = {
    method,
    responseType: 'json',
    headers: {
      Accept: 'application/json',
    },
  };

  reqParams.url = url;
  const parsedParams = Object.entries(params)
    .map(mapQuery)
    .join('&');

  if (isBody(method, body)) {
    reqParams.headers['Content-Type'] = 'application/json';
    reqParams.data = body;
  }

  if (parsedParams) {
    reqParams.url = `${url}?${parsedParams}`;
  }

  return fetch(reqParams);
}

exports.get = function(url, query) {
  return request('get', url, query);
};

exports.post = function(url, query, body = {}) {
  return request('post', url, query, body);
};

exports.patch = function(url, query, body = {}) {
  return request('patch', url, query, body);
};

function mapQuery(element) {
  const key = element[0];
  const value = element[1];
  return `${key}=${value}`;
}

function isBody(method, body) {
  return method !== 'get' && method !== 'head' && body !== null;
}