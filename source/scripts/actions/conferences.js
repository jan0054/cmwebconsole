import Parse from 'parse';

import {createActions} from 'scripts/helpers';

export default createActions(
  {
    getEvents: async ({user}) => {
      try {
        return await (new Parse.Query('Event')).equalTo('admin', user)
                                               .find();
      } catch (error) {
        return error;
      }
    }
  }
);
