import {createActions} from 'scripts/helpers';

export default createActions(
  'setupEditor',
  {
    saveEditor: async ({conference, fields}) => {
      try {
        return await conference.save(fields);
      } catch (error) {
        return error;
      }
    }
  }
);
