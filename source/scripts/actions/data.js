import Parse from 'parse';

import {createActions} from 'scripts/helpers';

export default createActions(
  {
    getApps: async () => {
      try {
        return await (new Parse.Query('Cm_apps')).find();
      } catch (error) {
        return error;
      }
    }
  }
);
