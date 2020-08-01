'use strict';

class LoginForm extends AsyncForm{
  onSubmit( options ) {
    User.login(options, (err, response) => {
      if(err){   
        console.log(err);
        return;      
      };
      
      App.setState('user-logged');
      App.getModal('login').close();
    });
  };
};