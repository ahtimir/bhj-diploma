'use strict';
/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebarButton = document.querySelector('.sidebar-toggle'),
          sidebar = document.querySelector('.sidebar-mini');
    
    sidebarButton.addEventListener('click', (event) => {
      event.preventDefault();
      sidebar.classList.toggle('sidebar-open');
      sidebar.classList.toggle('sidebar-collapse');
    });
  };

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const menuLogin = document.querySelector('.menu-item_login'),
          menuRegister = document.querySelector('.menu-item_register'),
          menuLogout = document.querySelector('.menu-item_logout');
    menuLogin.addEventListener('click', () => App.getModal('login').open());
    menuRegister.addEventListener('click', () => App.getModal('register').open());
    menuLogout.addEventListener('click', () => {
      if (User.logout()) {
        App.setState('init');
      };
    });
  };
};
