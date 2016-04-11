import React from 'react';
import classnames from 'classnames';

import Navbar from 'scripts/components/Navbar';
import ConferenceEditor from 'scripts/components/ConferenceEditor';
import TrackEditor from 'scripts/components/TrackEditor';
import TalkEditor from 'scripts/components/TalkEditor';
import VenueEditor from 'scripts/components/VenueEditor';
import PeopleEditor from 'scripts/components/PeopleEditor';

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
      actions: {logout, getConferences, setupConferenceEditor, clearConferenceEditor, addConference, saveConference, deleteConference, addTrack, saveTrack, deleteTrack, addLocation, saveLocation, deleteLocation, addTalk, saveTalk, deleteTalk, addVenue, saveVenue, deleteVenue, savePeople}
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
                    My Conferences
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
              <li
                style = {{
                  margin: '40px 16px 0 16px'
                }}
              >
                <button
                  className = 'expanded secondary button'
                  onClick = {async event => {
                    event.preventDefault();

                    await addConference({
                      fields: {
                        name: '(New Conference)',
                        admin: user
                      }
                    });

                    getConferences({user});
                  }}
                >
                  Add Conference
                </button>
              </li>
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
                  data: {conferences, tracks, talks, locations, venues},
                  editor
                }}
                actions = {{getConferences, saveConference, deleteConference, deleteTrack, deleteLocation, deleteTalk, deleteVenue}}
              />
              <hr />
              <h3>Edit Conference Tracks</h3>
              <div className = 'row'>
                <div className = 'columns small-3 end'>
                  <button
                    className = 'expanded secondary button'
                    onClick = {async event => {
                      event.preventDefault();

                      const conference = conferences.find(conference => conference.id === editor.conferenceId);

                      await addTrack({
                        fields: {
                          event: conference,
                          location: (await addLocation({
                            fields: {
                              event: conference
                            }
                          })).payload
                        }
                      });

                      setupConferenceEditor({conference});
                    }}
                  >
                    Add Track
                  </button>
                </div>
              </div>
            {tracks.map(track => {
              const location = locations.find(location => location.id === track.get('location').id);
              const talksInTrack = talks.filter(talk => talk.get('session').id === track.id);

              return (
              <TrackEditor
                key = {track.id}
                formKey = {track.id}
                input = {{
                  user,
                  data: {
                    conferences,
                    track,
                    location,
                    talks: talksInTrack
                  },
                  editor
                }}
                actions = {{saveTrack, deleteTrack, saveLocation, deleteLocation, addTalk, deleteTalk, setupConferenceEditor}}
              >
              {talksInTrack.map(talk =>
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
                  actions = {{saveTalk, deleteTalk, setupConferenceEditor}}
                />
              )}
              </TrackEditor>
              );
            })}
              <hr />
              <h3>Edit Conference Venues</h3>
              <div className = 'row'>
                <div className = 'columns small-3 end'>
                  <button
                    className = 'expanded secondary button'
                    onClick = {async event => {
                      event.preventDefault();

                      const conference = conferences.find(conference => conference.id === editor.conferenceId);

                      await addVenue({
                        fields: {
                          event: conference
                        }
                      });

                      setupConferenceEditor({conference});
                    }}
                  >
                    Add Venue
                  </button>
                </div>
              </div>
            {venues.map(venue =>
              <VenueEditor
                key = {venue.id}
                formKey = {venue.id}
                input = {{
                  data: {
                    conferences,
                    venue
                  },
                  editor
                }}
                actions = {{saveVenue, deleteVenue, setupConferenceEditor}}
              />
            )}
              <hr />
              <h3>Edit Conference Attendees</h3>
              <PeopleEditor
                input = {{
                  data: {
                    people,
                    conferences
                  },
                  editor
                }}
                actions = {{savePeople}}
              />
            </div>
          }
          </div>
        </main>
      </div>
    );
  }
}
