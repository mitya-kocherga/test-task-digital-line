import uniqueId from 'lodash/uniqueId';
import {AppState} from './types';

export const initialState: AppState = {
  form: {
    name: '',
    surname: '',
    age: '',
    city: '',
    errors: [],
  },
  tables: [
    {
      id: uniqueId(),
      rows: [
      ],
      isMainTable: true,
    },
  ],
};
