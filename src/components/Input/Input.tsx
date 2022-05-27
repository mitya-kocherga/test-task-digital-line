import React, {useState} from 'react';
import cn from 'classnames';
import last from 'lodash/last';
import {getErrorByValidation} from '../../helpers/inputValidation';
import {errorType, rowKey} from '../../store/types';

export type inputTypes = 'text' | 'number';
export type inputValueType = string;
interface P {
  value: inputValueType;
  onChangeHandler: (value: inputValueType) => void;
  placeholder?: string;
  type?: inputTypes;
  errors: Array<errorType> | null;
  setError: (arg0: errorType) => void;
  slug: rowKey;
}

function InputComponent({
  value,
  onChangeHandler,
  placeholder,
  type = 'text',
  errors = null,
  setError,
  slug,
  ...rest
}: P): React.ReactElement<P> {
  const [isDirty, setIsDirty] = useState(false);

  const checkError = () => {
    const error = getErrorByValidation(type, value);
    setError({key: slug, text: error});
  };
  const onBlur = () => {
    checkError();
    setIsDirty(true);
  };

  const onChange = (e: React.BaseSyntheticEvent) => {
    const value = String(e.target ? e.target.value : e);
    onChangeHandler(value);
  };
  const dirtyCheck = value.length === 0 && isDirty;

  return (
    <div className="input__container">
      <input
        className={cn('input', {input_error: errors?.length || dirtyCheck})}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
      />
      <span className="input__error-container">
        {errors && errors?.length && last(errors)!.text}
      </span>
    </div>
  );
}

export default InputComponent;
