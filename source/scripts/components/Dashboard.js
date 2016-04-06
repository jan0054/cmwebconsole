import React from 'react';
import classnames from 'classnames';

import {is} from 'scripts/helpers';
import Navbar from 'scripts/components/Navbar';
import Editor from 'scripts/components/Editor';

export default class Dashboard extends React.Component {
  static propTypes = {
    input: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
  }

  componentDidMount () {
    const {
      input: {user},
      actions: {getEvents}
    } = this.props;

    getEvents({user});
  }

  render () {
    const {
      input: {user, conferences, editor},
      actions: {logout, setupEditor, saveEditor}
    } = this.props;

    return (
      <div>
        <Navbar
          input = {{
            user
          }}
          actions = {{logout}}
        />
        <main
          className = 'row'
          style = {{
            padding: '16px 0 0 0'
          }}
        >
          <div className = 'columns small-3'>
            <ul className = 'menu vertical'>
            {conferences.map(conference =>
              <li
                key = {conference.id}
                className = {classnames({
                  active: conference.id === editor.conference.id
                })}
              >
                <a
                  style = {{
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  }}
                  onClick = {() => setupEditor(conference)}
                >
                  {conference.get('name')}
                </a>
              </li>
            )}
            </ul>
          </div>
          <div
            className = 'columns small-9'
            style = {{
              background: '#fff'
            }}
          >
          {!editor.conference::is.empty() &&
            <Editor
              input = {{
                editor
              }}
              actions = {{saveEditor}}
            />
          }
          </div>
        </main>
      </div>
    );
  }
}
