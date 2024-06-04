import React, { useCallback, useMemo, useState } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react';

type GenericObject = {
  [key: string]: string | any,
  id?: string,
  name?: string,
  value?: any,
};
type GenericArray = Array<GenericObject>;
type Props = {
  data: GenericArray | undefined,
  label: string,
  searchKey: string,
};

export function useCombobox({
  data = [],
  label = '',
  searchKey = '',
}: Props) {
  // states
  /////
  const [ query, setQuery ] = useState('');
  const [ selectedValue, setSelectedValue ] = useState(null);

  // callbacks
  /////
  const changeQuery = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value),
    [ setQuery ]
  );

  const changeSelection = useCallback(
    (value: any) => setSelectedValue(value),
    [ setSelectedValue ]
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
    (d: GenericObject) => {
      return !!d ? d[searchKey] : '';
    },
    [ searchKey ]
  );

  // memos
  /////
  const Component = useMemo(
    () => {
      return (
        <div className='flex flex-col w-full md:max-w-[21.5rem] lg:w-[23rem]'>
          <label
            className='text-[1.4rem] md:text-[1.6rem] text-[#fff] font-semibold'
          >
            {label}
          </label>

          <div className='relative'>
            <Combobox
              value={selectedValue}
              onChange={changeSelection}
            >
              <div className="relative">
                <ComboboxInput
                  className={`
                    text-[1.6rem] bg-[#F0EDEB] text-[#000] rounded-[.5rem] pt-[1.5rem] pb-[.5rem] pl-[1rem] pr-[.5rem] w-full
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
                  {filteredList?.map((data: GenericObject) => (
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
            </Combobox>
          </div>
        </div>
      );
    },
    [
      changeSelection,
      changeQuery,
      cleanQuery,
      data,
      displayValue,
      filteredList,
      label,
      selectedValue,
      searchKey,
    ]
  );

  return {
    Component,
    selectedValue,
  };
}
