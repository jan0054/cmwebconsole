import {createActions} from 'scripts/helpers';

export default createActions(
  'setupConferenceEditor',
  {
    saveConference: async ({conference, fields}) => {
      try {
        return await conference.save(fields);
      } catch (error) {
        return error;
      }
    }
  }
);
