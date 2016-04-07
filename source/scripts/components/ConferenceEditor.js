import React from 'react';
import {reduxForm as connectForm} from 'redux-form';
import Moment from 'moment';

import {defaultFormValues} from 'scripts/configs';

@connectForm({
  form: 'ConferenceEditor',
  fields: ['name', 'organizer', '_startDate', '_startTime', '_endDate', '_endTime', 'parentEvent', 'content'],
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
      input: {user, conferences, editor},
      actions: {saveConference},
      fields: {name, organizer, _startDate, _startTime, _endDate, _endTime, parentEvent, content}
    } = this.props;

    const conference = conferences.find(conference => conference.id === editor.conferenceId);

    return (
      <form
        ref = {
          element => element && !name.touched && Array.from(element.querySelectorAll('input, select, textarea')).reverse().forEach(field => field.focus())
        }
      >
        <h2>Edit Conference</h2>
        <div className = 'row'>
          <div className = 'columns'>
            <label>Name
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
            <label>Organizer
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
                {...parentEvent}
                value = {
                  parentEvent.touched
                  ? parentEvent.value

                  : conference.get('parentEvent')
                  ? conference.get('parentEvent').id

                  : ''
                }
              >
                <option></option>
              {conferences.map(conference =>
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
        <div className = 'row'>
          <div className = 'columns'>
            <label>Content
              <textarea
                {...content}
                rows = {8}
                value = {content.touched ? content.value : conference.get('content')}
              ></textarea>
            </label>
          </div>
        </div>
        <div className = 'row'>
          <div className = 'columns small-4 expanded button-group'>
            <button
              className = 'button'
              onClick = {event => {
                event.preventDefault();

                saveConference({
                  conference,

                  fields: {
                    name: name.value,
                    organizer: organizer.value,
                    start_time: Moment(`${_startDate.value} ${_startTime.value}`, 'YYYY-MM-DD HH:mm').toDate(),
                    end_time: Moment(`${_endDate.value} ${_endTime.value}`, 'YYYY-MM-DD HH:mm').toDate(),
                    parentEvent: conferences.find(conference => conference.id === parentEvent.value),
                    content: content.value,
                    admin: user
                  }
                });
              }}
            >
              Save
            </button>
          {conference.get('published') ||
            <button
              className = 'expanded warning button'
              onClick = {event => {
                event.preventDefault();

                saveConference({
                  conference,

                  fields: {
                    name: name.value,
                    organizer: organizer.value,
                    start_time: Moment(`${_startDate.value} ${_startTime.value}`, 'YYYY-MM-DD HH:mm').toDate(),
                    end_time: Moment(`${_endDate.value} ${_endTime.value}`, 'YYYY-MM-DD HH:mm').toDate(),
                    parentEvent: conferences.find(conference => conference.id === parentEvent.value),
                    content: content.value,
                    published: 1,
                    admin: user
                  }
                });
              }}
            >
              Publish
            </button>
          }
          </div>
        </div>
      </form>
    );
  }
}
