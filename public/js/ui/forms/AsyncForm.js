'use strict';

class AsyncForm {

  constructor( element ) {
    if (!element) {
      throw new Error('Элемент не существует');
    };

    this.element = element;
    this.registerEvents();
  };

  registerEvents() {
    this.element.addEventListener('submit', (event) => {
      event.preventDefault();
      this.submit();
    });
  };

  getData() {
    let form = new FormData(this.element);
    let object = {};
    
    for (let item of form) {                                         
      let name = item[0],
          value = item[1];

      object[name] = value;
    };

    return object;
  };

  onSubmit( options ) {

  };

  submit() {
    let data = this.getData();

    this.onSubmit({
      data,
      url: this.element.action,
      method: this.element.method
    });
  };
};