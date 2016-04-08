import React from 'react';
import classnames from 'classnames';

import Navbar from 'scripts/components/Navbar';
import ConferenceEditor from 'scripts/components/ConferenceEditor';
import TrackEditor from 'scripts/components/TrackEditor';

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
      input: {
        user,
        data: {conferences, tracks, talks, locations, venues},
        editor
      },
      actions: {logout, setupConferenceEditor, clearConferenceEditor, saveConference, saveTrack, saveLocation}
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
                    setupConferenceEditor({conference});

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
            <div>
              <h2>Edit Conference</h2>
              <ConferenceEditor
                input = {{
                  user,
                  data: {conferences},
                  editor
                }}
                actions = {{saveConference}}
              />
              <hr />
              <h2>Edit Conference Tracks</h2>
            {tracks.map(track =>
              <TrackEditor
                key = {track.id}
                formKey = {track.id}
                input = {{
                  data: {
                    conferences,
                    track,
                    location: locations.find(location => location.id === track.get('location').id)
                  },
                  editor
                }}
                actions = {{saveTrack, saveLocation}}
              />
            )}
            </div>
          }
          </div>
        </main>
      </div>
    );
  }
}
