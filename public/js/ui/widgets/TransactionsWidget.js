'use strict';

class TransactionsWidget {

  constructor( element ) {
    this.element = element;
    this.registerEvents();
  };

  registerEvents() {
    const incomeButton = document.querySelector('.create-income-button');
    const expenseButton = document.querySelector('.create-expense-button');
    
    incomeButton.addEventListener('click', (event) => {
      event.preventDefault();
      App.getModal('newIncome').open();
    });

    expenseButton.addEventListener('click', (event) => {
      App.getModal('newExpense').open();
      event.preventDefault();
    });

  };
};
