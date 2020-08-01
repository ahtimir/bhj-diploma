'use strict';

class UserWidget {

  constructor( element ) {
    if (!element) {
      throw new Error(`Такого элемента не существует или передан пустой элемент`);
    };
    this.element = element;
  };

  update() {
    const currentUser = User.current();
    if (!currentUser) {
      return;
    } else {
      this.element.querySelector('.user-name').textContent = User.current().name;
    };
  };
};