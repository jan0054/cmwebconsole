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
      input: {editor},
      actions: {saveEditor},
      fields: {name, organizer, _startDate, _startTime, _endDate, _endTime, parentEvent, content}
    } = this.props;

    return (
      <form>
        <h2>Edit Conference</h2>
        <div className = 'row'>
          <div className = 'columns'>
            <label>Name
              <input
                {...name}
                type = 'text'
                value = {name.value || editor.conference.get('name')}
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
                value = {organizer.value || editor.conference.get('organizer')}
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
                value = {_startDate.value || Moment(editor.conference.get('start_time')).format('YYYY-MM-DD')}
              />
            </label>
          </div>
          <div className = 'columns small-2'>
            <label>Start Time
              <input
                {..._startTime}
                type = 'time'
                value = {_startTime.value || Moment(editor.conference.get('start_time')).format('HH:mm')}
              />
            </label>
          </div>
          <div className = 'columns small-offset-2 small-3'>
            <label>End Date
              <input
                {..._endDate}
                type = 'date'
                value = {_endDate.value || Moment(editor.conference.get('end_time')).format('YYYY-MM-DD')}
              />
            </label>
          </div>
          <div className = 'columns small-2'>
            <label>End Time
              <input
                {..._endTime}
                type = 'time'
                value = {_endTime.value || Moment(editor.conference.get('end_time')).format('HH:mm')}
              />
            </label>
          </div>
        </div>
        <div className = 'row'>
          <div className = 'columns'>
            <label>Parent Event
              <select
                {...parentEvent}
                value = {parentEvent.value}
              >
                <option value = 'husker'>Husker</option>
              </select>
            </label>
          </div>
        </div>
        <div className = 'row'>
          <div className = 'columns'>
            <label>Content
              <textarea
                {...content}
                value = {content.value || editor.conference.get('content')}
              ></textarea>
            </label>
          </div>
        </div>
        <div className = 'row'>
          <div className = 'columns'>
            <button
              className = 'button'
              onClick = {event => {
                event.preventDefault();

                saveEditor({
                  conference: editor.conference,

                  fields: {
                    name: name.value || editor.conference.get('name'),
                    organizer: organizer.value || editor.conference.get('organizer'),
                    content: content.value || editor.conference.get('content')
                  }
                });
              }}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    );
  }
}
