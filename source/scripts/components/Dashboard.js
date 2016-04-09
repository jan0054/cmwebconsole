import React from 'react';
import classnames from 'classnames';

import Navbar from 'scripts/components/Navbar';
import ConferenceEditor from 'scripts/components/ConferenceEditor';
import TrackEditor from 'scripts/components/TrackEditor';
import TalkEditor from 'scripts/components/TalkEditor';

export default class Dashboard extends React.Component {
  static propTypes = {
    input: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
  }

  componentDidMount () {
    const {
      input: {user},
      actions: {getPeople, getConferences}
    } = this.props;

    getPeople();
    getConferences({user});
  }

  render () {
    const {
      input: {
        user,
        data: {people, conferences, tracks, talks, locations, venues},
        editor
      },
      actions: {logout, setupConferenceEditor, clearConferenceEditor, saveConference, saveTrack, saveLocation, saveTalk}
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
              <h3>Edit Conference Tracks</h3>
            {tracks.map(track => {
              const location = locations.find(location => location.id === track.get('location').id);

              return (
              <TrackEditor
                key = {track.id}
                formKey = {track.id}
                input = {{
                  data: {
                    conferences,
                    track,
                    location
                  },
                  editor
                }}
                actions = {{saveTrack, saveLocation}}
              >
              {talks.filter(talk => talk.get('session').id === track.id)
                    .map(talk =>
                <TalkEditor
                  key = {talk.id}
                  formKey = {talk.id}
                  input = {{
                    user,
                    data: {
                      people,
                      conferences,
                      track,
                      location,
                      talk
                    },
                    editor
                  }}
                  actions = {{saveTalk}}
                />
              )}
              </TrackEditor>
              );
            })}
            </div>
          }
          </div>
        </main>
      </div>
    );
  }
}
