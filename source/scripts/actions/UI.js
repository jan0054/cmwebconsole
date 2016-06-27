import {createActions} from 'scripts/helpers';

export default createActions(
  'changeLoginFormMode',
  'changeDashboardMode',
  'unmountConferenceEditor',
  'mountConferenceEditor',
  'unmountPeopleEditor',
  'mountPeopleEditor',
  'clearIsSaved'
);
