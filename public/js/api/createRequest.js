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
      if (xhr.status >= 200 && xhr.status < 300) {
        callback(null, xhr.response);
      } else {
        callback(new Error(`HTTP Error: ${xhr.status}`), null);
      }
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
class Entity {
    static URL = '';
  
    static list(data, callback) {
      createRequest({
        url: this.URL,
        method: 'GET',
        data,
        callback,
      });
    }
  
    static create(data, callback) {
      createRequest({
        url: this.URL,
        method: 'PUT',
        data,
        callback,
      });
    }
  
    static remove(data, callback) {
      createRequest({
        url: this.URL,
        method: 'DELETE',
        data,
        callback,
      });
    }
  }
  
  class Account extends Entity {
    static URL = '/account';
  
    static get(id, callback) {
      createRequest({
        url: `${this.URL}/${id}`,
        method: 'GET',
        callback,
      });
    }
  }

  class Transaction extends Entity {
    static URL = '/transaction';
  }

  class User {
    static URL = '/user';
  
    static setCurrent(user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  
    static current() {
      return JSON.parse(localStorage.getItem('user'));
    }
  
    static unsetCurrent() {
      localStorage.removeItem('user');
    }
  
    static fetch(callback) {
      createRequest({
        url: `${this.URL}/current`,
        method: 'GET',
        callback: (err, response) => {
          if (response && response.user) {
            this.setCurrent(response.user);
          } else {
            this.unsetCurrent();
          }
          callback(err, response);
        },
      });
    }
  
    static register(data, callback) {
      createRequest({
        url: `${this.URL}/register`,
        method: 'POST',
        data,
        callback: (err, response) => {
          if (response && response.success) {
            this.setCurrent(response.user);
          }
          callback(err, response);
        },
      });
    }
  
    static login(data, callback) {
      createRequest({
        url: `${this.URL}/login`,
        method: 'POST',
        data,
        callback: (err, response) => {
          if (response && response.success) {
            this.setCurrent(response.user);
          }
          callback(err, response);
        },
      });
    }
  
    static logout(callback) {
      createRequest({
        url: `${this.URL}/logout`,
        method: 'POST',
        callback: (err, response) => {
          if (response && response.success) {
            this.unsetCurrent();
          }
          callback(err, response);
        },
      });
    }
  }
//Если нужен тест, а может и не нужен.
  User.register(
    { name: 'John', email: 'john@example.com', password: '12345' },
    (err, response) => {
      if (err) {
        console.error('Registration error:', err);
      } else {
        console.log('Registration successful:', response);
      }
    }
  );
  

  