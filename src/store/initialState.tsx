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
        {name: 'qw', surname: 'eee', age: '23', city: 'riga', id: uniqueId()},
        {name: 'qw', surname: 'eee', age: '23', city: 'riga', id: uniqueId()},
        {name: 'qw', surname: 'eee', age: '23', city: 'riga', id: uniqueId()},
        {name: 'qw', surname: 'eee', age: '23', city: 'riga', id: uniqueId()},
      ],
      isMainTable: true,
    },
  ],
};
