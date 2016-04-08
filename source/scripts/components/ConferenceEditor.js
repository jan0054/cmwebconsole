import React from 'react';
import {reduxForm as connectForm} from 'redux-form';
import Moment from 'moment';

import {defaultFormValues} from 'scripts/configs';

@connectForm({
  form: 'ConferenceEditor',
  fields: ['name', 'organizer', '_startDate', '_startTime', '_endDate', '_endTime', '_parentEventId', 'content'],
  initialValues: defaultFormValues.ConferenceEditor
})
export default class ConferenceEditor extends React.Component {
  static propTypes = {
    input: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    fields: React.PropTypes.object.isRequired
  }

  render () {
    const {
      input: {
        user,
        data: {conferences},
        editor
      },
      actions: {saveConference},
      fields: {name, organizer, _startDate, _startTime, _endDate, _endTime, _parentEventId, content}
    } = this.props;

    const conference = conferences.find(conference => conference.id === editor.conferenceId);

    return (
      <form
        ref = {
          element => element && !name.touched && Array.from(element.querySelectorAll('input, select, textarea')).reverse().forEach(field => field.focus())
        }
      >
        <div className = 'row'>
          <div className = 'columns'>
            <label>Conference Name
              <input
                {...name}
                type = 'text'
                value = {name.touched ? name.value : conference.get('name')}
              />
            </label>
          </div>
        </div>
        <div className = 'row'>
          <div className = 'columns'>
            <label>Conference Organizer
              <input
                {...organizer}
                type = 'text'
                value = {organizer.touched ? organizer.value : conference.get('organizer')}
              />
            </label>
          </div>
        </div>
        <div className = 'row'>
          <div className = 'columns small-3'>
            <label>Start Date
              <input
                {..._startDate}
                type = 'date'
                value = {_startDate.touched ? _startDate.value : Moment(conference.get('start_time')).format('YYYY-MM-DD')}
              />
            </label>
          </div>
          <div className = 'columns small-2'>
            <label>Start Time
              <input
                {..._startTime}
                type = 'time'
                value = {_startTime.touched ? _startTime.value : Moment(conference.get('start_time')).format('HH:mm')}
              />
            </label>
          </div>
          <div className = 'columns small-offset-2 small-3'>
            <label>End Date
              <input
                {..._endDate}
                type = 'date'
                value = {_endDate.touched ? _endDate.value : Moment(conference.get('end_time')).format('YYYY-MM-DD')}
              />
            </label>
          </div>
          <div className = 'columns small-2'>
            <label>End Time
              <input
                {..._endTime}
                type = 'time'
                value = {_endTime.touched ? _endTime.value : Moment(conference.get('end_time')).format('HH:mm')}
              />
            </label>
          </div>
        </div>
        <div className = 'row'>
          <div className = 'columns'>
            <label>Parent Event
              <select
                {..._parentEventId}
                value = {
                    _parentEventId.touched
                  ? _parentEventId.value

                  : conference.get('parentEvent')
                  ? conference.get('parentEvent').id

                  : ''
                }
              >
                <option></option>
              {conferences.filter(conference => conference.id !== editor.conferenceId)
                          .map(conference =>
                <option
                  key = {conference.id}
                  value = {conference.id}
                >
                  {conference.get('name')}
                </option>
              )}
              </select>
            </label>
          </div>
        </div>
      {conference.get('childrenEvent') &&
        <div className = 'row'>
          <div className = 'columns'>
            <label>Subevents
              <ul>
              {conference.get('childrenEvent').map(conference =>
                <li
                  key = {conference.id}
                >
                  {conference.get('name')}
                </li>
              )}
              </ul>
            </label>
          </div>
        </div>
      }
        <div className = 'row'>
          <div className = 'columns'>
            <label>Conference Content
              <textarea
                {...content}
                rows = {8}
                value = {content.touched ? content.value : conference.get('content')}
              ></textarea>
            </label>
          </div>
        </div>
        <div className = 'row'>
          <div className = 'columns small-offset-6 small-6 expanded button-group'>
          {conference.get('published') ||
            <button
              className = 'expanded warning button'
              onClick = {event => {
                event.preventDefault();

                const parentEvent = conferences.find(conference => conference.id === _parentEventId.value);

                saveConference({
                  conference,

                  fields: {
                    name: name.value,
                    organizer: organizer.value,
                    start_time: Moment(`${_startDate.value} ${_startTime.value}`, 'YYYY-MM-DD HH:mm').toDate(),
                    end_time: Moment(`${_endDate.value} ${_endTime.value}`, 'YYYY-MM-DD HH:mm').toDate(),
                    parentEvent,
                    content: content.value,
                    published: 1,
                    admin: user
                  }
                });
              }}
            >
              Publish Conference
            </button>
          }
            <button
              className = 'button'
              onClick = {event => {
                event.preventDefault();

                const parentEvent = conferences.find(conference => conference.id === _parentEventId.value) || null;

                saveConference({
                  conference,

                  fields: {
                    name: name.value,
                    organizer: organizer.value,
                    start_time: Moment(`${_startDate.value} ${_startTime.value}`, 'YYYY-MM-DD HH:mm').toDate(),
                    end_time: Moment(`${_endDate.value} ${_endTime.value}`, 'YYYY-MM-DD HH:mm').toDate(),
                    parentEvent,
                    content: content.value,
                    admin: user
                  }
                });
              }}
            >
              Save Conference Info
            </button>
          </div>
        </div>
      </form>
    );
  }
}
