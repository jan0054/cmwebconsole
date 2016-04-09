import React from 'react';
import classnames from 'classnames';
import {reduxForm as connectForm} from 'redux-form';

import {defaultFormValues} from 'scripts/configs';

@connectForm({
  form: 'VenueEditor',
  fields: ['name', 'address', 'phone', 'url', 'content'],
  initialValues: defaultFormValues.VenueEditor
})
export default class VenueEditor extends React.Component {
  static propTypes = {
    input: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    fields: React.PropTypes.object.isRequired
  }

  render () {
    const {
      input: {
        data: {conferences, venue},
        editor
      },
      actions: {saveVenue},
      fields: {name, address, phone, url, content}
    } = this.props;

    const conference = conferences.find(conference => conference.id === editor.conferenceId);
    const {isSaved} = editor.venues.find(_venue => _venue.id === venue.id);

    return (
      <div className = 'callout secondary'>
        <form
          ref = {
            element => element && !name.touched && Array.from(element.querySelectorAll('input, select, textarea')).reverse().forEach(field => field.focus())
          }
        >
          <h4 className = 'subheader'>
            “{name.touched ? name.value : venue.get('name')}”
          </h4>
          <div
            style = {{
              margin: '0 0 0 15px'
            }}
          >
            <div className = 'row'>
              <div className = 'columns'>
                <label>Venue Name
                  <input
                    {...name}
                    type = 'text'
                    value = {name.touched ? name.value : venue.get('name')}
                  />
                </label>
              </div>
            </div>
            <div className = 'row'>
              <div className = 'columns'>
                <label>Venue Address
                  <input
                    {...address}
                    type = 'text'
                    value = {address.touched ? address.value : venue.get('address')}
                  />
                </label>
              </div>
            </div>
            <div className = 'row'>
              <div className = 'columns'>
                <label>Venue Phone Number
                  <input
                    {...phone}
                    type = 'text'
                    value = {phone.touched ? phone.value : venue.get('phone')}
                  />
                </label>
              </div>
            </div>
            <div className = 'row'>
              <div className = 'columns'>
                <label>Venue URL
                  <input
                    {...url}
                    type = 'text'
                    value = {url.touched ? url.value : venue.get('url')}
                  />
                </label>
              </div>
            </div>
            <div className = 'row'>
              <div className = 'columns'>
                <label>Venue Summary
                  <textarea
                    {...content}
                    rows = {8}
                    value = {content.touched ? content.value : venue.get('content')}
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

                    saveVenue({
                      venue,

                      fields: {
                        name: name.value,
                        address: address.value,
                        phone: phone.value,
                        url: url.value,
                        content: content.value,
                        event: conference
                      }
                    });
                  }}
                >
                  {isSaved ? 'Saved' : 'Save Venue Info'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
