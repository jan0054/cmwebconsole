// < Login/> Component
// ===================
//
// This file defines the Redux Form component `< Login/>`.
//
// Import Modules
// --------------
//
// ### NPM Modules

import React from 'react';
import {reduxForm as connectForm} from 'redux-form';

// ### Local Modules

import {defaultFormValues} from 'scripts/configs';

// Define & Export Module
// ----------------------
//
// This module contains the ***Redux-Form-connected `< Login/>`***.

export default
@connectForm({
  form: 'login',
  fields: ['email', 'password'],
  initialValues: defaultFormValues.login
})
class Login extends React.Component {
  static propTypes = {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
  }

  // ### Render
  //
  // Note that `fields`, `onSubmit` and `handleSubmit` are special props offered by Redux Form.
  //
  // See also https://github.com/erikras/redux-form#-handlesubmit--function.

  render () {
    const {fields: {email, password}, handleSubmit} = this.props;

    return (
      <form onSubmit = {handleSubmit}>
        <input
          {...email}
          placeholder = 'Email'
        />
        <input
          {...password}
          type = 'password'
          placeholder = 'Password'
        />
        <button>Login</button>
      </form>
    );
  }
}
