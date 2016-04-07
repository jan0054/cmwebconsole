import Parse from 'parse';

import {createActions} from 'scripts/helpers';

export default createActions(
  {
    getConferences: async ({user}) => {
      try {
        return await (new Parse.Query('Event')).equalTo('admin', user)
                                               .find();
      } catch (error) {
        return error;
      }
    }
  }
);
