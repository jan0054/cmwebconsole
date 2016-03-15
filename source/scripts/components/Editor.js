import React from 'react';
import {reduxForm as connectForm} from 'redux-form';

import {defaultFormValues} from 'scripts/configs';

@connectForm({
  form: 'eventEditor',
  fields: ['name', 'organizer', 'start_time', 'end_time', 'content'],
  initialValues: defaultFormValues.editor.event
})
export default class Editor extends React.Component {
  static propTypes = {
    input: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    fields: React.PropTypes.object.isRequired
  }

  render () {
    const {
      input: {editor},
      actions: {saveEditor},
      fields: {name, organizer, start_time, end_time, content}
    } = this.props;

    return (
      <form>
        <div>
          <div>
            <label>
              Name
              <input
                {...name}
                placeholder = 'Name'
                value = {name.value || editor.event.get('name')}
              />
            </label>
          </div>
          <div>
            <label>
              Organizer
              <input
                {...organizer}
                placeholder = 'Organizer'
                value = {organizer.value || editor.event.get('organizer')}
              />
            </label>
          </div>
          <div>
            <label>
              Start Time
              <input
                {...start_time}
                placeholder = 'Start Time'
                value = {start_time.value || editor.event.get('start_time')}
              />
            </label>
          </div>
          <div>
            <label>
              End Time
              <input
                {...end_time}
                placeholder = 'End Time'
                value = {end_time.value || editor.event.get('end_time')}
              />
            </label>
          </div>
          <div>
            <label>
              Content
              <input
                {...content}
                placeholder = 'Content'
                value = {content.value || editor.event.get('content')}
              />
            </label>
          </div>
        </div>
        <hr/>
          <button
            onClick = {event => {
              event.preventDefault();

              saveEditor({
                event: editor.event,

                fields: {
                  name: name.value || editor.event.get('name'),
                  organizer: organizer.value || editor.event.get('organizer'),
                  start_time: start_time.value || editor.event.get('start_time'),
                  end_time: end_time.value || editor.event.get('end_time'),
                  content: content.value || editor.event.get('content')
                }
              });
            }}
          >
            Save
          </button>
      </form>
    );
  }
}
