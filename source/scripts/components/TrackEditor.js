import React from 'react';
import classnames from 'classnames';
import {reduxForm as connectForm} from 'redux-form';
import Moment from 'moment';

import {defaultFormValues} from 'scripts/configs';

@connectForm({
  form: 'TrackEditor',
  fields: ['_trackName', '_startDate', '_endDate', '_locationName', 'capacity'],
  initialValues: defaultFormValues.TrackEditor
})
export default class TrackEditor extends React.Component {
  static propTypes = {
    input: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    fields: React.PropTypes.object.isRequired
  }

  render () {
    const {
      input: {
        data: {conferences, track, location},
        editor
      },
      actions: {saveTrack, saveLocation},
      fields: {_trackName, _startDate, _endDate, _locationName, capacity}
    } = this.props;

    const conference = conferences.find(conference => conference.id === editor.conferenceId);
    const isSaved = editor.tracks.find(_track => _track.id === track.id).isSaved && editor.locations.find(_location => _location.id === location.id).isSaved;

    return (
      <div className = 'callout secondary'>
        <form
          ref = {
            element => element && !_trackName.touched && Array.from(element.querySelectorAll('input, select, textarea')).reverse().forEach(field => field.focus())
          }
        >
          <div className = 'row'>
            <div className = 'columns'>
              <label>Track Name
                <input
                  {..._trackName}
                  type = 'text'
                  value = {_trackName.touched ? _trackName.value : track.get('name')}
                />
              </label>
            </div>
          </div>
          <div className = 'row'>
            <div className = 'columns small-3'>
              <label>Track Start Date
                <input
                  {..._startDate}
                  type = 'date'
                  value = {_startDate.touched ? _startDate.value : Moment(track.get('start_time')).format('YYYY-MM-DD')}
                />
              </label>
            </div>
            <div className = 'columns small-offset-2 small-3 end'>
              <label>Track End Date
                <input
                  {..._endDate}
                  type = 'date'
                  value = {_endDate.touched ? _endDate.value : Moment(track.get('end_time')).format('YYYY-MM-DD')}
                />
              </label>
            </div>
          </div>
          <div className = 'row'>
            <div className = 'columns'>
              <label>Location Name
                <input
                  {..._locationName}
                  type = 'text'
                  value = {_locationName.touched ? _locationName.value : location.get('name')}
                />
              </label>
            </div>
          </div>
          <div className = 'row'>
            <div className = 'columns'>
              <label>Location Capacity
                <input
                  {...capacity}
                  type = 'number'
                  value = {capacity.touched ? capacity.value : location.get('capacity')}
                />
              </label>
            </div>
          </div>
          <div className = 'row'>
            <div className = 'columns small-offset-9 small-3'>
              <button
                className = {classnames('expanded button', {
                  success: isSaved
                })}
                onClick = {event => {
                  event.preventDefault();

                  saveLocation({
                    location,

                    fields: {
                      name: _locationName.value,
                      capacity: +capacity.value,
                      event: conference
                    }
                  });

                  saveTrack({
                    track,

                    fields: {
                      name: _trackName.value,
                      start_time: Moment(`${_startDate.value}`, 'YYYY-MM-DD').toDate(),
                      end_time: Moment(`${_endDate.value}`, 'YYYY-MM-DD').toDate(),
                      location,
                      event: conference
                    }
                  });
                }}
              >
                {isSaved ? 'Saved' : 'Save Track Info'}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
