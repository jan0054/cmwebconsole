import React from 'react';
import classnames from 'classnames';

import Navbar from 'scripts/components/Navbar';
import ConferenceEditor from 'scripts/components/ConferenceEditor';

export default class Dashboard extends React.Component {
  static propTypes = {
    input: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
  }

  componentDidMount () {
    const {
      input: {user},
      actions: {getConferences}
    } = this.props;

    getConferences({user});
  }

  render () {
    const {
      input: {user, conferences, editor},
      actions: {logout, setupConferenceEditor, clearConferenceEditor, saveConference}
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
              <li>
                <a
                  style = {{
                    color: 'inherit',
                    cursor: 'default'
                  }}
                >
                  <strong>
                    Your Conferences
                  </strong>
                </a>
              </li>
            {conferences.map(conference =>
              <li
                key = {conference.id}
                className = {classnames({
                  active: conference.id === editor.conferenceId
                })}
              >
                <a
                  style = {{
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  }}
                  onClick = {() => {
                    setupConferenceEditor({
                      conferenceId: conference.id
                    });

                    clearConferenceEditor();
                  }}
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
          {editor.conferenceId &&
            <ConferenceEditor
              input = {{
                user,
                conferences,
                editor
              }}
              actions = {{saveConference}}
            />
          }
          </div>
        </main>
      </div>
    );
  }
}
