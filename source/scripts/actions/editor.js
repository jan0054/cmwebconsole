import {createActions} from 'scripts/helpers';

export default createActions(
  'setupEditor',
  {
    saveEditor: async ({event, fields}) => {
      try {
        return await event.save(fields);
      } catch (error) {
        return error;
      }
    }
  }
);
