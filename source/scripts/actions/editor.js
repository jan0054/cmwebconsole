import Parse from 'parse';

import {createActions} from 'scripts/helpers';

export default createActions(
  {
    setupConferenceEditor: async ({conference}) => {
      try {
        return {
          conferenceId: conference.id,

          tracks: await (new Parse.Query('Session')).equalTo('event', conference)
                                                    .ascending('start_time')
                                                    .find(),

          talks: await (new Parse.Query('Talk')).equalTo('event', conference)
                                                .ascending('start_time')
                                                .find(),

          locations: await (new Parse.Query('Location')).equalTo('event', conference)
                                                        .find(),

          venues: await (new Parse.Query('Venue')).equalTo('event', conference)
                                                  .ascending('createdAt')
                                                  .find()
        };
      } catch (error) {
        return error;
      }
    },

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
    },

    saveTrack: async ({track, fields}) => {
      try {
        return await track.save(fields);
      } catch (error) {
        return error;
      }
    },

    saveLocation: async ({location, fields}) => {
      try {
        return await location.save(fields);
      } catch (error) {
        return error;
      }
    },

    saveTalk: async ({talk, fields}) => {
      try {
        return await talk.save(fields);
      } catch (error) {
        return error;
      }
    },

    saveVenue: async ({venue, fields}) => {
      try {
        return await venue.save(fields);
      } catch (error) {
        return error;
      }
    },

    savePeople: async ({people, fields}) => {
      try {
        return await Parse.Object.saveAll(
          fields.map(
            ({id, event, ...attendee}) => people.find(person => person.id === id)
                                                .set(attendee)
                                                .addUnique('events', event)
          )
        );
      } catch (error) {
        return error;
      }
    }
  }
);
