import React from 'react';
import {reduxForm as connectForm} from 'redux-form';

import {defaultFormValues} from 'scripts/configs';

@connectForm({
  form: 'PeopleEditor',
  fields: [
    'attendees[].id',
    'attendees[].first_name',
    'attendees[].last_name',
    'attendees[].title',
    'attendees[].email',
    'attendees[].institute'
  ]
})
export default class PeopleEditor extends React.Component {
  static propTypes = {
    input: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    fields: React.PropTypes.object.isRequired
  }

  componentDidMount () {
    const {
      input: {
        data: {people},
        editor
      },
      fields: {attendees}
    } = this.props;

    people.filter(person => person.get('events') && person.get('events')
                                                          .map(event => event.id)
                                                          .includes(editor.conferenceId))
          .forEach(attendee => attendees.addField({
            id: attendee.id || defaultFormValues.PeopleEditor.id,
            first_name: attendee.get('first_name') || defaultFormValues.PeopleEditor.first_name,
            last_name: attendee.get('last_name') || defaultFormValues.PeopleEditor.last_name,
            title: attendee.get('title') || defaultFormValues.PeopleEditor.title,
            email: attendee.get('email') || defaultFormValues.PeopleEditor.email,
            institute: attendee.get('institution') || defaultFormValues.PeopleEditor.institute
          }));
  }

  render () {
    const {
      input: {
        data: {people, conferences},
        editor
      },
      actions: {savePeople},
      fields: {attendees}
    } = this.props;

    const conference = conferences.find(conference => conference.id === editor.conferenceId);

    return (
      <form>
        <div
          style = {{
            margin: '0 0 0 15px'
          }}
        >
          <table>
            <thead>
              <tr>
                <th width = {200}>First Name</th>
                <th width = {200}>Last Name</th>
                <th width = {150}>Title</th>
                <th width = {300}>Email</th>
                <th width = {200}>Institute</th>
              </tr>
            </thead>
            <tbody>
            {attendees.map(attendee =>
              <tr key = {attendee.id}>
                <td>
                  <input
                    {...attendee.first_name}
                    type = 'text'
                  />
                </td>
                <td>
                  <input
                    {...attendee.last_name}
                    type = 'text'
                  />
                </td>
                <td>
                  <select
                    {...attendee.title}
                  >
                    <option></option>
                    <option value = 'professor'>Professor</option>
                    <option value = 'postdoc'>PhD</option>
                    <option value = 'doctor'>Doctor</option>
                    <option value = 'master'>Master</option>
                    <option value = 'bachelor'>Bachelor</option>
                    <option value = 'other'>Other</option>
                  </select>
                </td>
                <td>
                  <input
                    {...attendee.email}
                    type = 'text'
                  />
                </td>
                <td>
                  <input
                    {...attendee.institute}
                    type = 'text'
                  />
                </td>
              </tr>
            )}
            </tbody>
          </table>
          <div className = 'row'>
            <div className = 'columns small-offset-9 small-3'>
              <button
                className = 'expanded button'
                onClick = {event => {
                  event.preventDefault();

                  savePeople({
                    people,

                    fields: attendees.map(attendee => ({
                      id: attendee.id.value,
                      first_name: attendee.first_name.value,
                      last_name: attendee.last_name.value,
                      title: attendee.title.value,
                      email: attendee.email.value,
                      institution: attendee.institute.value,
                      event: conference
                    }))
                  });
                }}
              >
                Save Attendees Info
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
