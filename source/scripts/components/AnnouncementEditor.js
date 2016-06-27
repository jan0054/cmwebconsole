import React from 'react';
import classnames from 'classnames';
import {reduxForm as connectForm} from 'redux-form';
import Moment from 'moment';

import {defaultFormValues} from 'scripts/configs';

@connectForm({
  form: 'AnnouncementEditor',
  fields: ['content'],
  initialValues: defaultFormValues.AnnouncementEditor
})
export default class AnnouncementEditor extends React.Component {
  static propTypes = {
    input: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    fields: React.PropTypes.object.isRequired
  }

  render () {
    const {
      input: {
        user,
        data: {conferences, announcement},
        editor
      },
      actions: {clearIsSaved, saveAnnouncement, deleteAnnouncement, setupConferenceEditor},
      fields: {content}
    } = this.props;

    const conference = conferences.find(conference => conference.id === editor.conference.id);
    const {isSaved} = editor.announcements.find(_announcement => _announcement.id === announcement.id);

    return (
      <div className = 'callout secondary'>
        <form
          ref = {
            element => element && !content.touched && Array.from(element.querySelectorAll('input, select, textarea')).reverse().forEach(field => field.focus())
          }
        >
          <div
            style = {{
              margin: '0 0 0 15px'
            }}
          >
            <div className = 'row'>
              <div className = 'columns'>
                <label>{Moment(announcement.get('createdAt')).format('YYYY-MM-DD')}
                  <textarea
                    {...content}
                    rows = {8}
                    value = {content.touched ? content.value : announcement.get('content')}
                  ></textarea>
                </label>
              </div>
            </div>
            <div className = 'row'>
              <div className = 'columns small-offset-6 small-6 expanded button-group'>
                <button
                  className = 'alert button'
                  onClick = {async event => {
                    event.preventDefault();

                    const conference = conferences.find(conference => conference.id === editor.conference.id);

                    await deleteAnnouncement({announcement});

                    setupConferenceEditor({conference});
                  }}
                >
                  Delete Announcement
                </button>
                <button
                  className = {classnames('button', {
                    success: isSaved
                  })}
                  onClick = {event => {
                    event.preventDefault();

                    saveAnnouncement({
                      announcement,

                      fields: {
                        content: content.value,
                        author: user,
                        event: conference
                      }
                    });

                    setTimeout(() => clearIsSaved({editor}), 3000);
                  }}
                >
                  {isSaved ? 'Saved' : 'Save Announcement'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
