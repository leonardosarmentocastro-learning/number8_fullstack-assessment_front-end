'use client';

import Image from 'next/image';
import {
  isDate,
  isMobilePhone,
  isPostalCode,
  MobilePhoneLocale,
  PostalCodeLocale,
} from 'validator';
// import { useRouter, usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';

import {
  Callback,
  EventHandler,
  LoadingSpinner,
  useCombobox,
  useTextInput,
  Validate,
} from '@/ui';
import { API_BASE_URL, useFetchDepartments } from '@/data';
import { capitalize } from '@/utils';

// TODO: move to own file
const ERROR_CANT_BE_EMPTY = "Can't be empty";
const ERROR_INVALID_NAME = "Characters only.";
const ERROR_INVALID_FIRST_NAME = "Single word with characters only.";
const ERROR_INVALID_PHONE_NUMBER = "Invalid phone number.";
const ERROR_INVALID_HIRING_DATE = 'Invalid date.';
const ERROR_INVALID_INTEGER = 'Invalid numeric value';
const ERROR_NEGATIVE_NUMBER = 'Number must be above 0.';
const ERROR_INVALID_ZIPCODE = 'Invalid zip code.';

const PHONE_LOCALE_ARGENTINA = 'es-AR';
const PHONE_LOCALE_BRAZIL = 'pt-BR';
const PHONE_LOCALE_UNITED_STATES = 'en-US';
const PHONE_LOCALES: MobilePhoneLocale[] = [
  PHONE_LOCALE_ARGENTINA,
  PHONE_LOCALE_BRAZIL,
  PHONE_LOCALE_UNITED_STATES,
];

const POSTAL_CODE_AMERICA_LOCALE = 'US';
// const POSTAL_CODE_ARGENTINA_LOCALE = 'AR';
const POSTAL_CODE_BRAZIL_LOCALE = 'BR';
export const POSTAL_CODE_LOCALES: PostalCodeLocale[] = [
  POSTAL_CODE_AMERICA_LOCALE,
  // POSTAL_CODE_ARGENTINA_LOCALE, // unavailable
  POSTAL_CODE_BRAZIL_LOCALE,
];

const EMPLOYEE_DEFAULT_PROFILE_PICTURE_1 = 'https://i.pinimg.com/564x/24/cb/d0/24cbd09ac15f566a5b89eca6c52aca26.jpg';
const EMPLOYEE_DEFAULT_PROFILE_PICTURE_2 = 'https://i.pinimg.com/564x/24/cb/d0/24cbd09ac15f566a5b89eca6c52aca26.jpg';
const EMPLOYEE_DEFAULT_PROFILE_PICTURE_3 = 'https://i.pinimg.com/564x/9e/41/d7/9e41d75c7b842b3da6f1c182a4c9f04f.jpg';
const EMPLOYEE_DEFAULT_PROFILE_PICTURE_4 = 'https://i.pinimg.com/564x/1d/b7/f5/1db7f5423caa43a23f86585f8de50960.jpg';
const EMPLOYEE_DEFAULT_PROFILE_PICTURE_5 = 'https://i.pinimg.com/564x/a5/87/df/a587df534c24274bdcf8ff3f3cdb334c.jpg';
const EMPLOYEE_DEFAULT_PROFILE_PICTURE_6 = 'https://i.pinimg.com/564x/ed/e4/40/ede440670624cb6e6caf792e04e982fd.jpg';
const EMPLOYEE_DEFAULT_PROFILE_PICTURE_7 = 'https://i.pinimg.com/564x/63/e1/be/63e1be3f90c536e69d8d2b6cab921109.jpg';
const EMPLOYEE_DEFAULT_PROFILE_PICTURES = [
  EMPLOYEE_DEFAULT_PROFILE_PICTURE_1,
  EMPLOYEE_DEFAULT_PROFILE_PICTURE_2,
  EMPLOYEE_DEFAULT_PROFILE_PICTURE_3,
  EMPLOYEE_DEFAULT_PROFILE_PICTURE_4,
  EMPLOYEE_DEFAULT_PROFILE_PICTURE_5,
  EMPLOYEE_DEFAULT_PROFILE_PICTURE_6,
  EMPLOYEE_DEFAULT_PROFILE_PICTURE_7,
];

const EMPLOYEE_STATUSES = [{
  id: '0',
  name: 'Active',
  value: true,
}, {
  id: '1',
  name: 'Inactive',
  value: false,
}];

const ELEMENTS_BUSY_CLASSNAMES = 'aria-busy:opacity-0';
const FORM_BUSY_CLASSNAMES = 'relative aria-busy:border-0 after:aria-busy:absolute after:aria-busy:content-[""] after:aria-busy:w-full after:aria-busy:h-full after:aria-busy:bg-gray-600 after:aria-busy:animate-pulse after:aria-busy:top-0 after:aria-busy:left-0 after:aria-busy:rounded-[1rem]';
const PICTURE_BUSY_CLASSNAMES = 'after:aria-busy:absolute after:aria-busy:content-[""] after:aria-busy:w-[14rem] after:aria-busy:h-[14rem] after:aria-busy:bg-gray-600 after:aria-busy:animate-pulse after:aria-busy:rounded-[.5rem]';

// TODO: move to own file
const validateEmptyness: Validate = ({ setError, value }) => {
  if (!value) return setError(ERROR_CANT_BE_EMPTY);
  setError('');
};

const validateFirstName: Validate = ({ setError, value }) => {
  if (!value) return setError(ERROR_CANT_BE_EMPTY);

  const hasCharactersOnly = /^[a-zA-Z]+$/;
  if (!hasCharactersOnly.test(value)) return setError(ERROR_INVALID_FIRST_NAME);

  setError('');
};

const validateLastName: Validate = ({ setError, value }) => {
  if (!value) return setError(ERROR_CANT_BE_EMPTY);

  const hasCharactersAndSpacesOnly = /^[a-zA-Z\s]*$/;
  if (!hasCharactersAndSpacesOnly.test(value)) return setError(ERROR_INVALID_NAME);

  setError('');
};

const validateCellphoneNumber: Validate = ({ setError, value }) => {
  if (!value) return setError(ERROR_CANT_BE_EMPTY);

  if (!isMobilePhone(value, PHONE_LOCALES, { strictMode: false })) return setError(ERROR_INVALID_PHONE_NUMBER);

  setError('');
};

const validateHiringDate: Validate = ({ setError, value }) => {
  if (!value) return setError(ERROR_CANT_BE_EMPTY);

  try {
    const isValid = isDate(value, {
      format: 'MM/DD/YYYY',
      delimiters: ['/'],
      strictMode: true,
    });

    // The validation algorithim can throw if user haven't finished typing the whole string
    if (!isValid) return setError(ERROR_INVALID_HIRING_DATE);
  } catch(err) {
    // If so, mark it as an error regardless
    return setError(ERROR_INVALID_HIRING_DATE);
  }

  setError('');
};

const validateNumber: Validate = ({ setError, value }) => {
  if (!value) return setError(ERROR_CANT_BE_EMPTY);

  if (isNaN(Number(value)) || !Number.isInteger(Number(value))) return setError(ERROR_INVALID_INTEGER);

  const number = parseInt(value);
  if (number <= 0) return setError(ERROR_NEGATIVE_NUMBER);

  setError('');
};

const validateOptionChange: Callback = ({ setError, value }) => {
  if (!value) return setError(ERROR_CANT_BE_EMPTY);

  setError('');
};

const validateZipcode: Callback = ({ setError, value }) => {
  if (!value) return setError(ERROR_CANT_BE_EMPTY);

  const isValid = POSTAL_CODE_LOCALES.some(locale => isPostalCode(value, locale));
  if (!isValid) return setError(ERROR_INVALID_ZIPCODE);

  setError('');
};

type Evaluate = ({ fields, errorFields }: {
  fields: Array<string | null>,
  errorFields: Array<string>,
}) => {
  borderClassnames: string,
  isInvalid: boolean,
  isValid: boolean,
  isPristine: boolean,
  textClassnames: string,
};
const evaluateForm: Evaluate = ({ fields, errorFields }) => {
  const isInvalid = errorFields.some(field => !!field);
  const isValid = !isInvalid && fields.every(field => !!field);
  const isPristine = errorFields.every(ef => !ef) && fields.every(f => !f);
  const isIdle = (!isInvalid && !isValid && !isPristine);

  const borderClassnames = isPristine || isIdle ? 'border-[#98A1A8]' : isValid ? 'border-[#DAFDCC]' : 'border-[#FF7D7B]';
  const textClassnames = isPristine || isIdle ? 'text-[#98A1A8]' : isValid ? 'text-[#DAFDCC]' : 'text-[#FF7D7B]';

  return {
    borderClassnames,
    isInvalid,
    isValid,
    isPristine,
    textClassnames,
  };
};

const capitalizeWords: EventHandler = ({ error, value, setValue }) => {
  if (!!error || !value) return;

  const capitalized: string = value.split(' ')
    .map(word => capitalize(word))
    .join(' ');

  !!setValue && setValue(capitalized);
};

// const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export default function NewEmployeePage() {
  // TODO: encapsulate into it's own component, so can be used in both '/employees/new' or '/employees/update/:id`
  // TODO:
  // -> useParams: https://nextjs.org/docs/app/api-reference/functions/use-params
  // const pathname = usePathname();
  // const isUpdating = pathname.includes('/employees/new/');

  // states
  /////
  const [ defaultProfilePicture, setDefaultProfilePicture ] = useState('');
  const [ isSaving, setIsSaving ] = useState(false);
  const [ error, setError ] = useState<unknown>(null);

  // fetching
  /////
  const {
    data: departments,
    error: departmentsError,
    isLoading: isFetchingDepartments,
  } = useFetchDepartments({ criteria: {}, limit: 100, page: 1 });

  // personal information form
  /////
  const {
    Component: FirstNameInput,
    error: firstNameError,
    value: firstName,
  } = useTextInput({
    classNames: ELEMENTS_BUSY_CLASSNAMES,
    isBusy: isSaving,
    label: 'First name',
    onBlur: capitalizeWords,
    validate: validateFirstName,
  });

  const {
    Component: LastNameInput,
    error: lastNameError,
    value: lastName,
  } = useTextInput({
    classNames: ELEMENTS_BUSY_CLASSNAMES,
    isBusy: isSaving,
    label: 'Last name',
    onBlur: capitalizeWords,
    validate: validateLastName
  });

  const {
    Component: PhoneInput,
    error: phoneError,
    value: phone,
  } = useTextInput({
    classNames: ELEMENTS_BUSY_CLASSNAMES,
    isBusy: isSaving,
    label: 'Phone number',
    defaultError: '',
    defaultValue: '',
    placeholder: 'Special characters accepted',
    validate: validateCellphoneNumber,
  });

  const personalInformationForm = useMemo(
    () => evaluateForm({
      fields: [ firstName, lastName, phone ],
      errorFields: [ firstNameError, lastNameError, phoneError ],
    }),
    [
      firstName,
      firstNameError,
      lastName,
      lastNameError,
      phone,
      phoneError,
    ]
  );

  // address form
  /////
  const {
    Component: StateInput,
    error: stateError,
    value: state,
  } = useTextInput({
    classNames: ELEMENTS_BUSY_CLASSNAMES,
    isBusy: isSaving,
    label: 'State',
    onBlur: capitalizeWords,
    validate: validateEmptyness
  });

  const {
    Component: CityInput,
    error: cityError,
    value: city,
  } = useTextInput({
    classNames: ELEMENTS_BUSY_CLASSNAMES,
    isBusy: isSaving,
    label: 'City',
    onBlur: capitalizeWords,
    validate: validateEmptyness
  });

  const {
    Component: StreetAddressInput,
    error: streetAddressError,
    value: streetAddress,
  } = useTextInput({
    classNames: ELEMENTS_BUSY_CLASSNAMES,
    isBusy: isSaving,
    label: 'Street address',
    onBlur: capitalizeWords,
    validate: validateEmptyness
  });

  const {
    Component: StreetNumberInput,
    error: streetNumberError,
    value: streetNumber,
  } = useTextInput({
    classNames: ELEMENTS_BUSY_CLASSNAMES,
    isBusy: isSaving,
    label: 'Street number',
    validate: validateNumber
  });

  const {
    Component: ZipCodeInput,
    error: zipCodeError,
    value: zipCode,
  } = useTextInput({
    classNames: ELEMENTS_BUSY_CLASSNAMES,
    isBusy: isSaving,
    label: 'ZIP code',
    placeholder: 'Special characters accepted',
    validate: validateZipcode
  });

  const addressForm = useMemo(
    () => evaluateForm({
      fields: [
        state,
        city,
        streetAddress,
        streetNumber,
        zipCode,
      ],
      errorFields: [
        stateError,
        cityError,
        streetAddressError,
        streetNumberError,
        zipCodeError,
      ],
    }),
    [
      stateError,
      state,
      cityError,
      city,
      streetAddressError,
      streetAddress,
      streetNumberError,
      streetNumber,
      zipCodeError,
      zipCode,
    ]
  );

  // hiring information form
  /////
  const {
    Component: DepartmentsCombobox,
    error: selectedDepartmentError,
    selectedValue: selectedDepartment,
  } = useCombobox({
    classNames: ELEMENTS_BUSY_CLASSNAMES,
    data: departments?.docs,
    disabled: isFetchingDepartments,
    isBusy: isSaving,
    label: 'Departments',
    onOptionChange: validateOptionChange,
    searchKey: 'name',
  });

  const {
    Component: HiringDateInput,
    error: hiringDateError,
    value: hiringDate,
  } = useTextInput({
    classNames: ELEMENTS_BUSY_CLASSNAMES,
    isBusy: isSaving,
    label: 'Hiring date',
    placeholder: 'MM/DD/YYYY',
    validate: validateHiringDate
  });

  const {
    Component: StatusCombobox,
    error: selectedStatusError,
    selectedValue: selectedStatus,
  } = useCombobox({
    classNames: ELEMENTS_BUSY_CLASSNAMES,
    data: EMPLOYEE_STATUSES,
    isBusy: isSaving,
    label: 'Status',
    onOptionChange: validateOptionChange,
    searchKey: 'name',
  });

  const hiringInformationForm = useMemo(
    () => evaluateForm({
      fields: [
        selectedDepartment,
        hiringDate,
        selectedStatus,
      ],
      errorFields: [
        hiringDateError,
        selectedDepartmentError,
        selectedStatusError,
      ],
    }),
    [
      selectedDepartment,
      selectedDepartmentError,
      selectedStatus,
      selectedStatusError,
      hiringDate,
      hiringDateError,
    ]
  );

  // memos
  //////
  const isUpdating = useMemo(() => {
    return false;
  }, []);

  const isDone = useMemo(
    () => personalInformationForm.isValid && addressForm.isValid && hiringInformationForm.isValid,
    [ addressForm, hiringInformationForm, personalInformationForm ]
  );

  const isButtonDisabled = useMemo(
    () => isSaving || !isDone,
    [ isDone, isSaving ]
  );

  // callbacks
  /////
  const save = useCallback(async () => {
    try {
      setIsSaving(true);
      setError(null);

      // await sleep(2000);
      const response = await fetch(`${API_BASE_URL}/employees`, {
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          active: true,
          address: {
            city,
            state,
            streetAddress,
            streetNumber,
            zipCode,
            locale: 'en-US',
          },
          department: selectedDepartment,
          hireDate: dayjs(hiringDate).startOf('day').valueOf(),
          pictureURL: defaultProfilePicture,
        }),
        headers: {
          "Accept-Language": 'pt-br',
          "Content-Type": "application/json",
        },
        method: 'POST',
        mode: 'cors',
      });
      if (!response.ok) {
        const err = await response.json();
        throw { ...err, status: response.status };
      };

      setIsSaving(false);
    } catch(err: unknown) {
      setError(err);
    }
  }, [
    city,
    defaultProfilePicture,
    firstName,
    hiringDate,
    lastName,
    phone,
    selectedDepartment,
    setError,
    setIsSaving,
    state,
    streetAddress,
    streetNumber,
    zipCode,
  ]);

  // effects
  /////
  // Randomly selects a default profile picture.
  useEffect(() => {
    if (isUpdating) return; // TODO: set default profile picture as `employee.pictureURL`;

    const randomPicture = EMPLOYEE_DEFAULT_PROFILE_PICTURES[Math.floor(Math.random() * EMPLOYEE_DEFAULT_PROFILE_PICTURES.length)];
    setDefaultProfilePicture(randomPicture);
  }, []);

  // bg-gray-400 bg-gray-600 animate-pulse
  // after:content-["*"] after:w-full after:h-full after:bg-gray-600 after:animate-pulse


  return (
    <div aria-busy={isSaving} className='p-8 aria-busy:cursor-progress aria-busy:pointer-events-none'>
      <div className='mt-12 lg:mt-8'>
        <h1 className='text-[2.4rem] md:text-[4rem] text-[#fff] font-semibold'>New employee</h1>
        <p className='text-[1.4rem] md:text-[2rem] text-[#98A1A8] font-regular'>Provide information regarding the newcomer:</p>
      </div>

      {/* TODO: save and show  */}
      {/* <div className='mt-[30%] flex flex-col text-center space-y-4 items-center justify-center'>
        <div className='mb-8'>
          <p className='text-[2.4rem] md:text-[3.2rem] text-[#fff] font-semibold'>Employee saved successfully!</p>
          <p className='text-[2rem] md:text-[2.4rem] text-[#98A1A8] font-regular'>What now?</p>
        </div>

        <button
          className='flex items-center justify-center md:max-w-[28rem] py-[1rem] bg-[#DAFDCC] text-[#2D3039] w-full rounded-[1rem] text-[1.6rem] disabled:grayscale disabled:opacity-50'
        >
          View all employees
        </button>

        <button
          className='flex items-center justify-center md:max-w-[28rem] py-[1rem] bg-[#fff] text-[#2D3039] w-full rounded-[1rem] text-[1.6rem] disabled:grayscale disabled:opacity-50'
        >
          Create new employee
        </button>
      </div> */}

      {/* TODO: hide on save */}
      <div className='flex flex-col items-center'>
        <div className="mt-12 flex flex-col justify-center items-center">
          <div
            aria-busy={isSaving}
            className={`relative w-[14rem] h-[14rem] ${PICTURE_BUSY_CLASSNAMES}`}
          >
            {defaultProfilePicture && (
              <Image
                aria-busy={isSaving}
                src={defaultProfilePicture}
                alt='Employee avatar'
                className={`z-0 w-full h-full object-cover rounded-[.5rem] ${false ? 'grayscale' : ''} aria-busy:opacity-0`} // TODO
                fill
              />
            )}

            <p className={`absolute z-10 inset-x-4 bottom-2 w-[8rem] py-1 text-center bg-[#D24124] rounded-[1rem] shadow-md ${false ? 'inline-block' : 'hidden'}`}>Inactive</p>
          </div>

          <button
            className='mt-4 max-w-[14rem] py-[1rem] bg-[#98A1A8] text-[#2D3039] w-full rounded-[1rem] text-[1.6rem]'
            disabled
          >
            Upload photo
          </button>

          <p className='mt-4 text-[1rem] text-[#98A1A8] font-regular'>This is a premium feature.</p>
          <p className='text-[1rem] text-[#98A1A8] font-regular'>You must hire "Leonardo Sarmento de Castro" for having it done.</p>
        </div>

        <div
          aria-busy={isSaving}
          className={`mt-8 p-8 flex flex-col gap-8 w-full lg:w-fit bg-[#2D3039] rounded-[1rem] border ${personalInformationForm.borderClassnames} ${FORM_BUSY_CLASSNAMES}`}
        >
          <h1 aria-busy={isSaving} className={`text-[1.6rem] md:text-[2.4rem] font-semibold ${personalInformationForm.textClassnames} ${ELEMENTS_BUSY_CLASSNAMES}`}>Personal information</h1>

          <div className='flex flex-col md:flex-row gap-8'>
            {FirstNameInput}
            {LastNameInput}
            {PhoneInput}
          </div>
        </div>

        <div
          aria-busy={isSaving}
          className={`mt-8 p-8 flex flex-col gap-8 w-full lg:w-fit bg-[#2D3039] rounded-[1rem] border ${addressForm.borderClassnames} ${FORM_BUSY_CLASSNAMES}`}
        >
          <h1
            aria-busy={isSaving}
            className={`text-[1.6rem] md:text-[2.4rem] font-semibold ${addressForm.textClassnames} ${ELEMENTS_BUSY_CLASSNAMES}`}
          >
            Address
          </h1>

          <div className='flex flex-col md:flex-row gap-8'>
            {StateInput}
            {CityInput}
          </div>

          <div className='flex flex-col md:flex-row gap-8'>
            {StreetAddressInput}
            {StreetNumberInput}
            {ZipCodeInput}
          </div>
        </div>

        <div
          aria-busy={isSaving}
          className={`mt-8 p-8 flex flex-col gap-8 w-full lg:w-fit bg-[#2D3039] rounded-[1rem] border ${hiringInformationForm.borderClassnames} ${FORM_BUSY_CLASSNAMES}`}
        >
          <h1
            aria-busy={isSaving}
            className={`text-[1.6rem] md:text-[2.4rem] font-semibold ${hiringInformationForm.textClassnames} ${ELEMENTS_BUSY_CLASSNAMES}`}
          >
            Hiring information
          </h1>

          <div className='flex flex-col md:flex-row gap-8'>
            {DepartmentsCombobox}
            {HiringDateInput}
            {StatusCombobox}
          </div>

          {/* TODO */}
          {isUpdating && (
            <div className='flex flex-col'>
              <h1 className='text-[1.6rem] md:text-[2.4rem] text-[#98A1A8] font-semibold'>Department History</h1>

              <table className='text-[#fff] text-left text-[1.2rem] md:text-[1.4rem] font-semibold'>
                <thead>
                  <tr className='border-b border-[#D9D9D9] md:text-[1.6rem]'>
                    <th className='px-4 py-3'>Date</th>
                    <th className='px-4 py-3'>Department</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className='border-t border-[rgba(217,217,217,.35)] bg-[rgba(217,217,217,.2)]'>
                    <td className='px-4 py-3'>30/05/2024 23:00:00</td>
                    <td className='px-4 py-3'>Technology</td>
                  </tr>

                  <tr className='border-t border-[rgba(217,217,217,.35)]'>
                    <td className='px-4 py-3'>30/05/2024 22:00:00</td>
                    <td className='px-4 py-3'>Human resources</td>
                  </tr>

                  <tr className='border-t border-[rgba(217,217,217,.35)]'>
                    <td className='px-4 py-3'>30/05/2024 21:00:00</td>
                    <td className='px-4 py-3'>Finances</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        <button
          className='mt-12 flex items-center justify-center md:max-w-[28rem] py-[1rem] bg-[#DAFDCC] text-[#2D3039] w-full rounded-[1rem] text-[1.6rem] disabled:grayscale disabled:opacity-50'
          disabled={isButtonDisabled}
          onClick={save}
        >
          {isSaving ? <LoadingSpinner /> : 'Save'}
        </button>
      </div>
    </div>
  );
}
