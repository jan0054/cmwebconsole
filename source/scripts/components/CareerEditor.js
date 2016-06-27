import React from 'react';
import classnames from 'classnames';
import {reduxForm as connectForm} from 'redux-form';
import Moment from 'moment';

import {defaultFormValues} from 'scripts/configs';

@connectForm({
  form: 'CareerEditor',
  fields: ['position', 'institution', 'contact_name', 'contact_email', 'link', 'content'],
  initialValues: defaultFormValues.CareerEditor
})
export default class CareerEditor extends React.Component {
  static propTypes = {
    input: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    fields: React.PropTypes.object.isRequired
  }

  render () {
    const {
      input: {
        user,
        data: {careers},
        editor
      },
      actions: {clearIsSaved, getCareers, saveCareer, deleteCareer},
      fields: {position, institution, contact_name, contact_email, link, content}
    } = this.props;

    const career = careers.find(career => career.id === editor.conference.id);
    const {isSaved} = editor.conference;

    return (
      <form
        ref = {
          element => element && !position.touched && Array.from(element.querySelectorAll('input, select, textarea')).reverse().forEach(field => field.focus())
        }
      >
        <h3 className = 'subheader'>
          “{position.touched ? position.value : career.get('position')} @ {institution.touched ? institution.value : career.get('institution')}”
        </h3>
        <div
          style = {{
            margin: '0 0 0 15px'
          }}
        >
          <div className = 'row'>
            <div className = 'columns'>
              <label>Job Position
                <input
                  {...position}
                  type = 'text'
                  value = {position.touched ? position.value : career.get('position')}
                />
              </label>
            </div>
          </div>
          <div className = 'row'>
            <div className = 'columns'>
              <label>Hiring Institute
                <input
                  {...institution}
                  type = 'text'
                  value = {institution.touched ? institution.value : career.get('institution')}
                />
              </label>
            </div>
          </div>
          <div className = 'row'>
            <div className = 'columns'>
              <label>Contact Name
                <input
                  {...contact_name}
                  type = 'text'
                  value = {contact_name.touched ? contact_name.value : career.get('contact_name')}
                />
              </label>
            </div>
          </div>
          <div className = 'row'>
            <div className = 'columns'>
              <label>Contact Email
                <input
                  {...contact_email}
                  type = 'text'
                  value = {contact_email.touched ? contact_email.value : career.get('contact_email')}
                />
              </label>
            </div>
          </div>
          <div className = 'row'>
            <div className = 'columns'>
              <label>URL
                <input
                  {...link}
                  type = 'text'
                  value = {link.touched ? link.value : career.get('link')}
                />
              </label>
            </div>
          </div>
          <div className = 'row'>
            <div className = 'columns'>
              <label>Job Description
                <textarea
                  {...content}
                  rows = {8}
                  value = {content.touched ? content.value : career.get('content')}
                ></textarea>
              </label>
            </div>
          </div>
          <div className = 'row'>
            <div className = 'columns small-offset-3 small-9 expanded button-group'>
              <button
                className = 'alert button'
                onClick = {async event => {
                  event.preventDefault();

                  await deleteCareer({career});

                  getCareers({user});
                }}
              >
                Delete Career
              </button>
              <button
                className = {classnames('button', {
                  success: isSaved
                })}
                onClick = {event => {
                  event.preventDefault();

                  saveCareer({
                    career,

                    fields: {
                      position: position.value,
                      institution: institution.value,
                      contact_name: contact_name.value,
                      contact_email: contact_email.value,
                      link: link.value,
                      content: content.value,
                      hiring: 1,
                      author: user
                    }
                  });

                  setTimeout(() => clearIsSaved({editor}), 3000);
                }}
              >
                {isSaved ? 'Saved' : 'Save Career Info'}
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
