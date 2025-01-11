/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
import { Entity } from './Entity.js';
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */
  static get(id = '', callback){
    if (!id) {
      callback(new Error('Account ID is required'), null);
      return;
    }

    createRequest({
      url: `${this.URL}/${id}`,
      method: 'GET',
      callback,
    });
  }
}
