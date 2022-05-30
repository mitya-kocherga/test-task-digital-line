import React, {useState} from 'react';
import cn from 'classnames';
import omit from 'lodash/omit';

import {Button} from '../Buttons';
import InputComponent from '../Input';
import DropDownComponent from '../DropDown';
import {FormI, rowKey, changeHandlerType, errorType} from '../../store/types';
import {generateKeys} from '../../helpers/generateKeysForForm';

type variant = 'two-c' | 'one-c';
interface P {
  variant?: variant;
  handleSubmit: () => void;
  changeformHandler(arg0: changeHandlerType): void;
  formState: FormI;
  setError: (arg0: errorType) => void;
}
const menuList = [
  {value: 'riga', label: 'Riga'},
  {value: 'city2', label: 'City2'},
  {value: 'riga3', label: 'Riga3'},
];

function FormComponent({
  variant = 'one-c',
  handleSubmit,
  changeformHandler,
  formState,
  setError,
}: P): React.ReactElement<P> {
  //to not save each input dirty value in state
  const [inputKeys, setInputKeys] = useState(generateKeys());

  /* prettier-ignore */ const changeFormValue = (key: rowKey) => (value: string) => {
    changeformHandler({key, value})
  }

  const ownSubmit = () => {
    setInputKeys(generateKeys());
    handleSubmit();
  };

  const errorCollector = (slug: rowKey) => {
    const errorsArray = formState.errors.filter((error) => error.key === slug);
    return errorsArray.length > 0 ? errorsArray : null;
  };
  const formStateValues = Object.values(omit(formState, 'errors'));

  const shouldDisableSubmit =
    formStateValues.every((item) => item.length !== 0) && formState.errors.length === 0;

  return (
    <div className={cn('form', {'form_two-c': variant === 'two-c'})}>
      <div
        className={cn('form__container', {'form__container_two-c': variant === 'two-c'})}
      >
        <InputComponent
          slug="name"
          setError={setError}
          value={formState.name}
          errors={errorCollector('name')}
          onChangeHandler={changeFormValue('name')}
          placeholder="Name"
          key={inputKeys.name}
        />
        <InputComponent
          value={formState.surname}
          slug="surname"
          key={inputKeys.surname}
          setError={setError}
          errors={errorCollector('surname')}
          onChangeHandler={changeFormValue('surname')}
          placeholder="Surname"
        />
        <InputComponent
          key={inputKeys.age}
          type="number"
          slug="age"
          setError={setError}
          value={formState.age}
          errors={errorCollector('age')}
          onChangeHandler={changeFormValue('age')}
          placeholder="Age"
        />
        <DropDownComponent
          menuList={menuList}
          value={formState.city}
          onChangeHandler={changeFormValue('city')}
          placeholder="City"
        />
        <span></span> {/*shit*/}
      </div>
      <Button
        disabled={!shouldDisableSubmit}
        onClickHandler={ownSubmit}
        className="form__button"
        text="Add"
      />
    </div>
  );
}

export default FormComponent;
