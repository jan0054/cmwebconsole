import {createActions} from 'scripts/helpers';

export default createActions(
  'changeLoginFormMode',
  'unmountConferenceEditor',
  'mountConferenceEditor',
  'unmountPeopleEditor',
  'mountPeopleEditor',
  'clearIsSaved'
);
