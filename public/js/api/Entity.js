/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * Имеет свойство HOST, равно 'https://bhj-diplom.letsdocode.ru'.
 * */
class Entity {

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = f => f ) {
    return createRequest({
      data: data,
      method: 'GET',
      url: Entity.HOST + this.URL,
      responseType: 'json',
      callback
    })
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    createRequest({
      data: Object.assign( data, { _method: 'PUT' }),
      method: 'POST',
      url: Entity.HOST + this.URL,
      responseType: 'json',
      callback
    })
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {
    createRequest({
      method: 'GET',
      url: Entity.HOST + this.URL + '/' + id,
      responseType: 'json',
      callback
    })

  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {
    createRequest({
      data: Object.assign(data, {id, _method: 'DELETE'}),
      method: 'POST',
      url: Entity.HOST + this.URL,
      responseType: 'json',
      callback
    })
  }
}

Entity.URL = '';
Entity.HOST = 'http://localhost:8000';