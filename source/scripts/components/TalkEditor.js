import React from 'react';
import classnames from 'classnames';
import {reduxForm as connectForm} from 'redux-form';
import Moment from 'moment';

import {defaultFormValues} from 'scripts/configs';

@connectForm({
  form: 'TalkEditor',
  fields: ['name'],
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
      fields: {name}
    } = this.props;

    const conference = conferences.find(conference => conference.id === editor.conferenceId);

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
            <div className = 'columns small-offset-9 small-3'>
              <button className = 'expanded button'>
                Save Talk Info
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
