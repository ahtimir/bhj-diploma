'use strict';

class AccountsWidget {

  constructor( element ) {
    if(!element){
      throw new Error('Элемент не существует');
    };

    this.element = element;
    this.registerEvents();
    this.update();    
  };

  registerEvents() {
    const newAccountForm = new Modal( document.querySelector( '#modal-new-account' ));
    
    this.element.addEventListener( 'click', (event) => {
      event.preventDefault();
      if(this.element.querySelector('.create-account') === event.target){
        newAccountForm.open(); 
      };

      if (event.target.closest(".account")) {
        this.onSelectAccount(event.target.closest(".account"));
      };
    });    
  };

  update() {
    const user = User.current();
    this.clear();

    if(user){
      Account.list(user, (err, response) => {
        if(err){
          console.warn(err);          
        return
        };
        
        this.renderItem(response.data);
      });
    };
  };

  clear() {
    let accounts = this.element.querySelectorAll('.account');
    accounts.forEach((item) => this.element.removeChild(item));
  };

  onSelectAccount( element ) {
    let activeAccount = this.element.querySelector('.active');
    if(activeAccount){
      activeAccount.classList.toggle('active');
    };
    element.classList.toggle('active');

    App.showPage( 'transactions', { account_id: element.dataset.id });
  };

   getAccountHTML( item ) {
    return `<li class="account" data-id="${item.id}">
              <a href="#">
                <span>${item.name}</span> /
                <span>${item.sum} ₽</span>
              </a>
            </li>`;
  };

  renderItem( item ) {
    item.forEach((e) => {
      this.element.insertAdjacentHTML('beforeEnd', this.getAccountHTML(e));
    });
  };
};