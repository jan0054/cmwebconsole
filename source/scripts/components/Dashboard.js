import React from 'react';

export default class Dashboard extends React.Component {
  static propTypes = {
    input: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
  }

  componentDidMount () {
    const {
      input: {user},
      actions: {getEvents}
    } = this.props;

    getEvents({user});
  }

  render () {
    const {
      input: {events},
      actions: {setupEditor}
    } = this.props;

    return (
      <main>
        <ul>
        {events.map(event =>
          <li
            key = {event.id}
          >
            <a
              style = {{
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
              onClick = {() => setupEditor(event)}
            >
              {event.get('name')}
            </a>
          </li>
        )}
        </ul>
      </main>
    );
  }
}
