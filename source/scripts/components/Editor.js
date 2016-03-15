import React from 'react';
import {reduxForm as connectForm} from 'redux-form';

import {defaultFormValues} from 'scripts/configs';

@connectForm({
  form: 'editor',
  fields: ['name', 'organizer', 'start_time', 'end_time', 'content'],
  initialValues: defaultFormValues.editor
})
export default class Editor extends React.Component {
  static propTypes = {
    input: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    fields: React.PropTypes.object.isRequired
  }

  render () {
    const {
      input: {event},
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
                value = {name.value || event.get('name')}
              />
            </label>
          </div>
          <div>
            <label>
              Organizer
              <input
                {...organizer}
                placeholder = 'Organizer'
                value = {organizer.value || event.get('organizer')}
              />
            </label>
          </div>
          <div>
            <label>
              Start Time
              <input
                {...start_time}
                placeholder = 'Start Time'
                value = {start_time.value || event.get('start_time')}
              />
            </label>
          </div>
          <div>
            <label>
              End Time
              <input
                {...end_time}
                placeholder = 'End Time'
                value = {end_time.value || event.get('end_time')}
              />
            </label>
          </div>
          <div>
            <label>
              Content
              <input
                {...content}
                placeholder = 'Content'
                value = {content.value || event.get('content')}
              />
            </label>
          </div>
        </div>
        <hr/>
          <button
            onClick = {userEvent => {
              userEvent.preventDefault();

              saveEditor({
                event,

                fields: {
                  name: name.value || event.get('name'),
                  organizer: organizer.value || event.get('organizer'),
                  start_time: start_time.value || event.get('start_time'),
                  end_time: end_time.value || event.get('end_time'),
                  content: content.value || event.get('content')
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
