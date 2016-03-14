import {createActions} from 'scripts/helpers';

export default createActions(
  'setupEditor',
  {
    saveEditor: async ({fields, event}) => {
      try {
        return await event.save(fields);
      } catch (error) {
        return error;
      }
    }
  }
);
