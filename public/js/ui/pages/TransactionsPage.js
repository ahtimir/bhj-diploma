'use strict';

class TransactionsPage {

  constructor( element ) {
    if(!element) {
      throw new Error("Ошибка");
    };

    this.element = element;
    this.registerEvents();
  };  

  update() {
    this.render(this.lastOptions);
  };

  registerEvents() {
    const removeAccButton = this.element.querySelector('.remove-account');

    removeAccButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.removeAccount();
    });

    this.element.addEventListener('click', (event) => {
      let transactionRemove = event.target.closest('.transaction__remove');
      if (transactionRemove) {
        this.removeTransaction(transactionRemove.dataset.id);
      };
    });
  };

  removeAccount() {
    if (this.lastOptions) {    
      if (confirm('Подтвердите удаление счета')) {
        this.clear();
      
      let accountId = document.querySelector('.active').dataset.id;
      Account.remove( accountId, {}, () => App.update());
      };
    };
  };

  removeTransaction( id ) {
    if (confirm('Вы действительно хотите удалить эту транзакцию?')) {
      Transaction.remove(id, {}, (err, response) => {
        if (response.success) {
          App.update();
        };
      });
    };
  };

  render( options ) {
    if (options) {
      this.lastOptions = options;
      Account.get(options.account_id, {}, (error, response) => {
        if (error) {
          console.warn(error);
        };

        this.renderTitle(response.data.name);
      });
    
    Transaction.list(options, (error, response) => {
      if (error) {
        console.error(error);
        return
      };
      this.renderTransactions(response.data);
      });
    };
  };

  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = '';
  };

  renderTitle( name ) {
    document.querySelector('.content-title').textContent = name;
  };

  formatDate( date ) {
    let year = date.slice(0, 4);
    let currentMonth = parseInt(date.slice(5, 7)) -1;
    let day = date.slice(8, 10);
    let time = date.slice(11, 16);
 
    let months = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря'
      ];
    
    return `${day} ${months[currentMonth]} ${year} г. в ${time}`
  };
 
  getTransactionHTML( item ) {
    return `<div class="transaction transaction_${item.type.toLowerCase()} row">
              <div class="col-md-7 transaction__details">
                <div class="transaction__icon">
                    <span class="fa fa-money fa-2x"></span>
                </div>
                <div class="transaction__info">
                    <h4 class="transaction__title">${item.name}</h4>
                    <div class="transaction__date">${this.formatDate(item.created_at)}</div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="transaction__summ">
                ${item.sum} <span class="currency">₽</span>
                </div>
              </div>
              <div class="col-md-2 transaction__controls">
                  <button class="btn btn-danger transaction__remove" data-id="${item.id}">  
                      <i class="fa fa-trash"></i>  
                  </button>
              </div>
          </div>`
  };

  renderTransactions( data ) {
    let content = this.element.querySelector('.content');

    if (data) {
     content.innerHTML = '';
      for (let i = 0; i < data.length; i++) {
        content.innerHTML += this.getTransactionHTML(data[i]);
      };
    };
  };
};