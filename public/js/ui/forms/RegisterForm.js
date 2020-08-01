'use strict';

class RegisterForm extends AsyncForm {
  onSubmit( options ) {
    User.register(options, (err, response) => {
      if(err){
        console.log(err);        
      };

      App.setState('user-logged');
      App.getModal('register').close();
    });  
  };
};