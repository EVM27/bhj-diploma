/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  const { url, data, method = 'GET', callback } = options;

  let queryString = '';
  let requestData = null;

  if (method === 'GET' && data) {
    queryString = '?' + new URLSearchParams(data).toString();
  } else if (data) {
    requestData = new FormData();
    for (const key in data) {
      requestData.append(key, data[key]);
    }
  }

  xhr.open(method, url + queryString);
  xhr.responseType = 'json';

  xhr.onload = () => {
    callback(null, xhr.response);
  };

  xhr.onerror = () => {
    callback(new Error('Network error'), null);
  };

  try {
    xhr.send(requestData);
  } catch (e) {
    callback(e, null);
  }
};
