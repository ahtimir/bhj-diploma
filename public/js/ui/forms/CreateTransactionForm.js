'use strict';

class CreateTransactionForm extends AsyncForm {
  constructor( element ) {
    super(element);
    this.renderAccountsList();
  };

  renderAccountsList() {
    const selectAccount = this.element.querySelector('.accounts-select');

    Account.list(User.current(), (err, response) => {
      if(err){
        console.log(err);          
      return;
      };

      let accountsData = response.data;
      selectAccount.innerHTML = '';
      accountsData.forEach((item) => {
        selectAccount.insertAdjacentHTML('beforeEnd', `<option value="${item.id}">${item.name}</option>`)
      })
    });
  };

  onSubmit( options ) {
    Transaction.create(options.data, (err, response) => {
      if (err) {
        console.log(err);
        return
      };

      this.element.reset();

      if(App.getModal('newExpense')) {
        App.getModal('newExpense').close();
      };

      if(App.getModal('newIncome')) {
        App.getModal('newIncome').close();
      };

      

      App.update();
    });
  };
};
