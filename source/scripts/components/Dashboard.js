import React from 'react';

import {is} from 'scripts/helpers';
import Editor from 'scripts/components/Editor';

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
      input: {events, editor},
      actions: {setupEditor, saveEditor}
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
      {!editor.event::is.empty() &&
        <Editor
          input = {{
            event: editor.event
          }}
          actions = {{saveEditor}}
        />
      }
      </main>
    );
  }
}
