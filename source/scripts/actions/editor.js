import {createActions} from 'scripts/helpers';

export default createActions(
  'setupConferenceEditor',
  {
    saveConference: async ({conference, fields}) => {
      try {
        if (conference.get('parentEvent')) {
          await conference.get('parentEvent').save({
            childrenEvent: conference.get('parentEvent').get('childrenEvent').filter(childEvent => childEvent.id !== conference.id)
          });
        }

        if (fields.parentEvent) {
          await fields.parentEvent.save({
            childrenEvent: (fields.parentEvent.get('childrenEvent') || []).concat(conference)
          });
        }

        return await conference.save(fields);
      } catch (error) {
        return error;
      }
    }
  }
);
