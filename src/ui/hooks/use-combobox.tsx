import React, { useCallback, useMemo, useState } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react';

import { SetTextInputError } from '../types';

export type Callback = (args: {
  setError: SetTextInputError,
  value: string,
}) => void;
export type ComboboxOption = {
  [key: string]: string | any,
  id?: string,
  name?: string,
  value?: any,
};
type GenericArray = Array<ComboboxOption>;
type Props = {
  classNames?: string,
  data: GenericArray | undefined,
  disabled?: boolean,
  isBusy?: boolean,
  label: string,
  onOptionChange?: Callback,
  searchKey: string,
};

export function useCombobox({
  classNames = '',
  data = [],
  disabled = false,
  isBusy = false,
  label = '',
  onOptionChange = () => null,
  searchKey = '',
}: Props) {
  // states
  /////
  const [ error, setError ] = useState('');
  const [ query, setQuery ] = useState('');
  const [ selectedValue, setSelectedValue ] = useState<ComboboxOption | null>(null);

  // callbacks
  /////
  const changeQuery = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value),
    [ setQuery ]
  );

  const changeSelection = useCallback(
    (value: any) => {
      setSelectedValue(value);
      onOptionChange({ value, setError });
    },
    [ setError, setSelectedValue ]
  );

  const cleanQuery = useCallback(
    () => setQuery(''),
    [ setQuery ]
  );

  const filteredList = useMemo(
    () => query === ''
      ? data
      : data.filter((d) => {
          const option = d[searchKey];
          return option?.toLowerCase().includes(query.toLowerCase());
        }),
    [
      data,
      query,
    ]
  );

  const displayValue = useCallback(
    (d: ComboboxOption) => {
      return !!d ? d[searchKey] : '';
    },
    [ searchKey ]
  );

  // memos
  /////
  const Component = useMemo(
    () => {
      return (
        <div
          aria-busy={isBusy}
          className={`flex flex-col w-full md:max-w-[21.5rem] lg:w-[23rem] ${classNames}`}
        >
          <label
            aria-disabled={disabled}
            className={`text-[1.4rem] md:text-[1.6rem] font-semibold aria-disabled:grayscale aria-disabled:opacity-50 ${error ? 'text-[#FF7D7B]' : !!selectedValue ? 'text-[#DAFDCC]' : 'text-[#fff]'}`}
          >
            {label}
          </label>

          <div className='relative'>
            <Combobox
              value={selectedValue}
              onChange={changeSelection}
              disabled={disabled}
            >
              <div className="relative">
                <ComboboxInput
                  className={`
                    text-[1.6rem] bg-[#F0EDEB] text-[#000] rounded-[.5rem] pt-[1.5rem] pb-[.5rem] pl-[1rem] pr-[.5rem] w-full
                    disabled:grayscale disabled:opacity-50
                  `}
                  displayValue={displayValue}
                  onChange={changeQuery}
                />

                <ComboboxButton className="group absolute top-[30%] right-0 px-2.5">
                  <span className="material-symbols-outlined text-[2.4rem] text-[rgba(0,0,0,.5)] fill-current">keyboard_arrow_down</span>
                </ComboboxButton>
              </div>

              <Transition
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={cleanQuery}
              >
                <ComboboxOptions
                  anchor="bottom"
                  className="w-[var(--input-width)] rounded-xl border border-white/5 bg-[#F0EDEB] p-1 [--anchor-gap:var(--spacing-1)] empty:hidden"
                >
                  {filteredList?.map((data: ComboboxOption) => (
                    <ComboboxOption
                      key={data.id}
                      value={data}
                      className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-[rgba(217,217,217,.8)]"
                    >
                      <span className="material-symbols-outlined text-[2.4rem] text-[rgba(0,0,0,.5)] fill-current invisible group-data-[selected]:visible">check</span>
                      <div className="text-[1.6rem]">{data[searchKey]}</div>
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
              </Transition>

              <p className={`mt-4 text-[1.4rem] md:text-[1.6rem] text-[#FF7D7B] font-semibold ${!!error ? 'block' : 'hidden'}`}>
                {error}
              </p>
            </Combobox>
          </div>
        </div>
      );
    },
    [
      changeSelection,
      changeQuery,
      classNames,
      cleanQuery,
      data,
      disabled,
      displayValue,
      error,
      filteredList,
      isBusy,
      label,
      selectedValue,
      searchKey,
    ]
  );

  return {
    Component,
    error,
    selectedValue,
    setSelectedValue,
  };
}
