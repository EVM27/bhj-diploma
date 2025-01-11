/**
 * Класс Transaction наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/transaction'
 * */
import { Entity } from './Entity.js';
class Transaction extends Entity {
    static URL = '/transaction';
}

