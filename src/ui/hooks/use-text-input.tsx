import React, { useCallback, useMemo, useState } from 'react';

import { SetTextInputError, SetTextInputValue } from '../types';

type InputChange = React.ChangeEvent<HTMLInputElement>;
type KeyChange = React.KeyboardEvent<HTMLInputElement>;
export type Validate = (args: {
  setError: SetTextInputError,
  value: string,
}) => void;
type EventHandler = (args: {
  error?: string,
  event?: React.SyntheticEvent | KeyChange,
  setError?: SetTextInputError,
  setValue?: SetTextInputValue,
  value?: string,
}) => void;
type Props = {
  defaultError?: string,
  defaultValue?: string,
  disabled?: boolean,
  onBlur?: EventHandler,
  onChange?: (ev: React.SyntheticEvent) => void,
  onFocus?: (ev: React.FocusEvent<HTMLInputElement>) => void,
  onKeyPress?: EventHandler,
  label?: string,
  minRows?: Number,
  multiline?: boolean,
  placeholder?: string,
  ref?: React.Ref<any>,
  title?: string,
  type?: string,
  validate: Validate,
};

export const useTextInput = ({
  defaultValue = '',
  defaultError = '',
  disabled = false,
  label = '',
  minRows = 0,
  multiline = false,
  onBlur,
  onChange,
  onFocus,
  onKeyPress,
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
    validate({ setError, value: newValue });

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
    <div className='flex flex-col w-full md:max-w-[21.5rem] lg:w-[23rem]'>
      <label
        className={`text-[1.4rem] md:text-[1.6rem] font-semibold ${error ? 'text-[#FF7D7B]' : !!value ? 'text-[#DAFDCC]' : 'text-[#fff]'}`}
      >
        {inputLabel}
      </label>

      <div className='relative'>
        {/* TODO: addornement */}
        {/* <span className="material-symbols-outlined absolute top-[1rem] left-[1rem] text-[2.4rem] text-[rgba(0,0,0,.5)] fill-current">search</span> */}

        <input
          className={`text-[1.6rem] bg-[#F0EDEB] text-black rounded-[.5rem] pt-[1.5rem] pb-[.5rem] pl-[1rem] pr-[.5rem] w-full border ${error ? 'border-[#FF7D7B]' : 'border-[#fff]'}`}
          disabled={disabled}
          type={inputType}
          placeholder={placeholder}
          onChange={__onChange__}
          onBlur={__onBlur__}
          onFocus={onFocus}
          onKeyDown={__onKeyPress__}
          ref={ref}
          value={value}
        />
      </div>

      <p className={`mt-4 text-[1.4rem] md:text-[1.6rem] text-[#FF7D7B] font-semibold ${!!error ? 'block' : 'hidden'}`}>
        {error}
      </p>
    </div>
  ), [
    disabled,
    error,
    inputLabel,
    inputType,
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
