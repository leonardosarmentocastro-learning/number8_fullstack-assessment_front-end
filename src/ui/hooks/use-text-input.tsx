import React, { useCallback, useId, useMemo, useState } from 'react';

import { SetTextInputError, SetTextInputValue } from '../types';

type InputChange = React.ChangeEvent<HTMLInputElement>;
type KeyChange = React.KeyboardEvent<HTMLInputElement>;
export type Validate = (args: {
  setError: SetTextInputError,
  value: string,
}) => void;
export type EventHandler = (args: {
  error?: string,
  event?: React.SyntheticEvent | KeyChange,
  setError?: SetTextInputError,
  setValue?: SetTextInputValue,
  value?: string,
}) => void;
type Props = {
  adornment?: string,
  classNames?: string,
  defaultError?: string,
  defaultValue?: string,
  disabled?: boolean,
  id?: string,
  isBusy?: boolean,
  onBlur?: EventHandler,
  onChange?: (ev: React.SyntheticEvent) => void,
  onFocus?: (ev: React.FocusEvent<HTMLInputElement>) => void,
  onKeyPress?: EventHandler,
  label?: string,
  minRows?: Number,
  multiline?: boolean,
  name?: string,
  options?: {
    strictSize: boolean,
  },
  placeholder?: string,
  ref?: React.Ref<any>,
  title?: string,
  type?: string,
  validate?: Validate,
};

export const useTextInput = ({
  adornment = '',
  classNames = '',
  defaultValue = '',
  defaultError = '',
  disabled = false,
  id = useId(),
  isBusy = false,
  label = '',
  minRows = 0,
  multiline = false,
  name = '',
  onBlur,
  onChange,
  onFocus,
  onKeyPress,
  options = { strictSize: true },
  placeholder = '',
  ref = null,
  // title,
  type = 'text',
  validate,
}: Props) => {
  const [ value, setValue ] = useState(defaultValue);
  const [ error, setError ] = useState(defaultError);
  const [ inputType, setInputType ] = useState(type);
  const [ inputLabel, setInputLabel ] = useState(label);

  const __onChange__ = useCallback((e: InputChange) => {
    const newValue = e.target.value;
    setValue(newValue);
    !!validate && validate({ setError, value: newValue });

    !!onChange && onChange(e);
  }, [
    onChange,
    setValue,
    validate,
  ]);

  const __onBlur__ = useCallback((e: InputChange) => {
    __onChange__(e);
    !!onBlur && onBlur({ error, event: e, setError, value, setValue });
  }, [
    error,
    __onChange__,
    setError,
    setValue,
    value,
  ]);

  const __onKeyPress__ = useCallback(
    (event: KeyChange) => !!onKeyPress && onKeyPress({ error, event, value, setError, setValue }),
    [ error, onKeyPress, value, setError, setValue ]
  );

  const Component = useMemo(() => (
    <div
      aria-busy={isBusy}
      className={`flex flex-col w-full ${options.strictSize ? 'md:max-w-[21.5rem] lg:w-[23rem]' : ''} ${classNames}`.trim()}
    >
      <label
        className={`text-[1.4rem] md:text-[1.6rem] font-semibold ${error ? 'text-[#FF7D7B]' : !!value ? 'text-[#DAFDCC]' : 'text-[#fff]'}`}
        htmlFor={id}
      >
        {inputLabel}
      </label>

      <div className='relative'>
        {!!adornment && (
          <span className="material-symbols-outlined absolute top-[1rem] left-[1rem] text-[2.4rem] text-[rgba(0,0,0,.5)] fill-current">{adornment}</span>
        )}

        <input
          className={`text-[1.6rem] bg-[#F0EDEB] text-black rounded-[.5rem] pt-[1.5rem] pb-[.5rem] pr-[.5rem] w-full border ${adornment ? 'pl-[4rem]' : 'pl-[1rem]'} ${error ? 'border-[#FF7D7B]' : 'border-[#fff]'}`}
          disabled={disabled}
          onChange={__onChange__}
          onBlur={__onBlur__}
          onFocus={onFocus}
          onKeyDown={__onKeyPress__}
          id={id}
          name={name}
          placeholder={placeholder}
          ref={ref}
          type={inputType}
          value={value}
        />
      </div>

      <p className={`mt-4 text-[1.4rem] md:text-[1.6rem] text-[#FF7D7B] font-semibold ${!!error ? 'block' : 'hidden'}`}>
        {error}
      </p>
    </div>
  ), [
    adornment,
    classNames,
    disabled,
    error,
    id,
    inputLabel,
    inputType,
    isBusy,
    minRows,
    multiline,
    __onBlur__,
    __onChange__,
    __onKeyPress__,
    onFocus,
    placeholder,
    value,
  ]);

  return {
    Component,
    error,
    setError,
    setInputLabel,
    setInputType,
    setValue,
    value,
  };
};
