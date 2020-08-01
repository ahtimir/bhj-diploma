'use strict';

class CreateAccountForm extends AsyncForm {
  onSubmit( options ) {
    Account.create(options.data, (err, response) => {
     
      if(err) {
        console.warn(err);
        return;        
      };

      this.element.reset();
      App.getModal('createAccount').close();
      App.update();
    });
  };
};
