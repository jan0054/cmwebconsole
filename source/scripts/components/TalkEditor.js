import React from 'react';
import classnames from 'classnames';
import {reduxForm as connectForm} from 'redux-form';
import Moment from 'moment';

import {defaultFormValues} from 'scripts/configs';

@connectForm({
  form: 'TalkEditor',
  fields: ['name', '_date', '_startTime', '_endTime', 'content'],
  initialValues: defaultFormValues.TalkEditor
})
export default class TalkEditor extends React.Component {
  static propTypes = {
    input: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    fields: React.PropTypes.object.isRequired
  }

  render () {
    const {
      input: {
        data: {conferences, track, location, talk},
        editor
      },
      actions: {saveTalk},
      fields: {name, _date, _startTime, _endTime, content}
    } = this.props;

    const conference = conferences.find(conference => conference.id === editor.conferenceId);
    const {isSaved} = editor.talks.find(_talk => _talk.id === talk.id);

    return (
      <div className = 'callout primary'>
        <form
          ref = {
            element => element && !name.touched && Array.from(element.querySelectorAll('input, select, textarea')).reverse().forEach(field => field.focus())
          }
        >
          <div className = 'row'>
            <div className = 'columns'>
              <label>Talk Name
                <input
                  {...name}
                  type = 'text'
                  value = {name.touched ? name.value : talk.get('name')}
                />
              </label>
            </div>
          </div>
          <div className = 'row'>
            <div className = 'columns small-3'>
              <label>Talk Date
                <input
                  {..._date}
                  type = 'date'
                  value = {_date.touched ? _date.value : Moment(talk.get('start_time')).format('YYYY-MM-DD')}
                />
              </label>
            </div>
            <div className = 'columns small-offset-2 small-2'>
              <label>Talk Start Time
                <input
                  {..._startTime}
                  type = 'time'
                  value = {_startTime.touched ? _startTime.value : Moment(talk.get('start_time')).format('HH:mm')}
                />
              </label>
            </div>
            <div className = 'columns small-2 end'>
              <label>Talk End Time
                <input
                  {..._endTime}
                  type = 'time'
                  value = {_endTime.touched ? _endTime.value : Moment(talk.get('end_time')).format('HH:mm')}
                />
              </label>
            </div>
          </div>
          <div className = 'row'>
            <div className = 'columns'>
              <label>Talk Summary
                <textarea
                  {...content}
                  rows = {8}
                  value = {content.touched ? content.value : talk.get('content')}
                ></textarea>
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

                  saveTalk({
                    talk,

                    fields: {
                      name: name.value,
                      start_time: Moment(`${_date.value} ${_startTime.value}`, 'YYYY-MM-DD HH:mm').toDate(),
                      end_time: Moment(`${_date.value} ${_endTime.value}`, 'YYYY-MM-DD HH:mm').toDate(),
                      content: content.value,
                      type: 0,
                      event: conference,
                      session: track,
                      location
                    }
                  });
                }}
              >
                {isSaved ? 'Saved' : 'Save Talk Info'}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
