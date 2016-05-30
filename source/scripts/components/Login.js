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
import classnames from 'classnames';
import {reduxForm as connectForm} from 'redux-form';
import {keys} from 'bound-native-methods/object';

// ### Local Modules

import {defaultFormValues} from 'scripts/configs';

// Define & Export Module
// ----------------------
//
// This module contains the ***Redux-Form-connected `< Login/>`***.

export default
@connectForm({
  form: 'Login',
  fields: ['email', 'password', 'first_name', 'last_name', 'institution'],
  initialValues: defaultFormValues.Login
})
class Login extends React.Component {
  static propTypes = {
    input: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
  }

  // ### Render
  //
  // Note that `fields`, `onSubmit` and `handleSubmit` are special props offered by Redux Form.
  //
  // See also https://github.com/erikras/redux-form#-handlesubmit--function.

  render () {
    const {
      input: {UI},
      actions: {changeLoginFormMode},
      fields: {email, password, first_name, last_name, institution},
      handleSubmit
    } = this.props;

    const modes = {
      login: 'Log In',
      signup: 'Sign Up',
      reset: 'Reset Password'
    };

    return (
      <form
        onSubmit = {handleSubmit}
      >
        <div className = 'row'>
          <div className = 'columns'>
            <h1
              className = 'text-center'
              style = {{
                margin: '60px 0 60px 0'
              }}
            >Colloquium.me Admin Dashboard</h1>
          </div>
        </div>
        <div className = 'row'>
          <div className = 'columns small-8 small-centered'>
            <ul
              className = 'tabs'
            >
            {modes::keys().map(mode =>
              <li
                key = {mode}
                className = 'tabs-title'
              >
                <a
                  aria-selected = {mode === UI.mode}
                  onClick = {() => changeLoginFormMode(mode)}
                >
                  {modes[mode]}
                </a>
              </li>
            )}
            </ul>
            <div className = 'tabs-content'>
              <div className = 'tabs-panel is-active'>
                <div className = 'row'>
                  <div className = 'columns'>
                    <input
                      {...email}
                      type = 'text'
                      placeholder = 'Your Email'
                    />
                  </div>
                </div>
              { UI.mode === 'reset' ||
                <div className = 'row'>
                  <div className = 'columns'>
                    <input
                      {...password}
                      type = 'password'
                      placeholder = 'Your Password'
                    />
                  </div>
                </div>
              }
              { UI.mode === 'signup' &&
                <div className = 'row'>
                  <div className = 'columns small-6'>
                    <input
                      {...first_name}
                      type = 'text'
                      placeholder = 'Your First Name'
                    />
                  </div>
                  <div className = 'columns small-6'>
                    <input
                      {...last_name}
                      type = 'text'
                      placeholder = 'Your Last Name'
                    />
                  </div>
                </div>
              }
              { UI.mode === 'signup' &&
                <div className = 'row'>
                  <div className = 'columns'>
                    <input
                      {...institution}
                      type = 'text'
                      placeholder = 'Your Institute'
                    />
                  </div>
                </div>
              }
                <div className = 'row'>
                  <div className = 'columns'>
                    <button
                      className = {classnames('expanded button', {
                        alert: !!UI.hasError
                      })}
                    >
                      { UI.hasError === true ? 'Incorrect Information'
                      : UI.hasError === 'reset' ? 'Reset Instruction Sent'
                      : modes[UI.mode]}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
