import {inputValueType, inputTypes} from '../components/Input';

export const getErrorByValidation = (
  type: inputTypes,
  value: inputValueType,
): string | null => {
  switch (type) {
    case 'text': {
      if (/[0-9]/.test(value)) {
        return 'Field should not contain the numbers!';
      }
      if (value.trim().length === 0) {
        return 'Field should not be empty!';
      }
      if (!/^[a-zA-Z ]+$/.test(value)) {
        return 'Field should contain only english letters!';
      }

      return null;
    }
    case 'number': {
      if (value.trim().length === 0) {
        return 'Field should not be empty!';
      }
      if (/^[a-zA-Z ]+$/.test(value)) {
        return 'Field should contain only numbers!';
      }
      if (Number(value) < 14 || Number(value) > 99) {
        return 'Field should be between 14 and 99!';
      }
      return null;
    }
    default: {
      return null;
    }
  }
};
