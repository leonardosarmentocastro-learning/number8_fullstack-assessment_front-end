'use client';

import Image from 'next/image';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  LoadingSpinner,
  useCombobox,
  useTextInput,
} from '@/ui';
import { API_BASE_URL, useFetchDepartments, Employee } from '@/data';
import { isEmpty } from '@/utils';
import {
  evaluateForm,
  validateCellphoneNumber,
  validateEmptyness,
  validateFirstName,
  validateHiringDate,
  validateLastName,
  validateNumber,
  validateOptionChange,
  validateZipcode,
} from './validators';
import {
  ELEMENTS_BUSY_CLASSNAMES,
  EMPLOYEE_DEFAULT_PROFILE_PICTURES,
  EMPLOYEE_STATUSES,
  EMPLOYEE_STATUS_OPTION_INACTIVE,
  FORM_BUSY_CLASSNAMES,
  PICTURE_BUSY_CLASSNAMES,
  VALIDATION_DATE_FORMAT,
} from './constants';
import { capitalizeWords, sleep } from './helpers';
import { Done } from './components/Done';
import { Error } from './components/Error';

type Props = {
  employee?: Employee,
  showSkeleton?: boolean,
};
export function CreateEmployeeForm({
  employee,
  showSkeleton = false,
}: Props) {
  // states
  /////
  const [ defaultProfilePicture, setDefaultProfilePicture ] = useState<string>('');
  const [ isSaving, setIsSaving ] = useState<boolean>(false);
  const [ error, setError ] = useState<unknown | JSON>({});
  const [ saved, setIsSaved ] = useState(false);

  // fetching
  /////
  const {
    data: departments,
    error: departmentsError,
    isLoading: isFetchingDepartments,
  } = useFetchDepartments({ criteria: {}, limit: 100, page: 1 });

  // memos
  /////
  const isFormBusy = useMemo(() => {
    return isSaving || showSkeleton;
  }, [ isSaving, showSkeleton ]);

  // personal information form
  /////
  const {
    Component: FirstNameInput,
    error: firstNameError,
    value: firstName,
    setValue: setFirstName,
  } = useTextInput({
    classNames: ELEMENTS_BUSY_CLASSNAMES,
    defaultValue: employee?.firstName,
    isBusy: isFormBusy,
    label: 'First name',
    onBlur: capitalizeWords,
    validate: validateFirstName,
  });

  const {
    Component: LastNameInput,
    error: lastNameError,
    value: lastName,
    setValue: setLastName,
  } = useTextInput({
    classNames: ELEMENTS_BUSY_CLASSNAMES,
    defaultValue: employee?.lastName,
    isBusy: isFormBusy,
    label: 'Last name',
    onBlur: capitalizeWords,
    validate: validateLastName
  });

  const {
    Component: PhoneInput,
    error: phoneError,
    value: phone,
    setValue: setPhone,
  } = useTextInput({
    classNames: ELEMENTS_BUSY_CLASSNAMES,
    defaultValue: employee?.phone,
    isBusy: isFormBusy,
    label: 'Phone number',
    defaultError: '',
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
    setValue: setState,
  } = useTextInput({
    classNames: ELEMENTS_BUSY_CLASSNAMES,
    defaultValue: employee?.address.state,
    isBusy: isFormBusy,
    label: 'State',
    onBlur: capitalizeWords,
    validate: validateEmptyness
  });

  const {
    Component: CityInput,
    error: cityError,
    value: city,
    setValue: setCity,
  } = useTextInput({
    classNames: ELEMENTS_BUSY_CLASSNAMES,
    defaultValue: employee?.address.city,
    isBusy: isFormBusy,
    label: 'City',
    onBlur: capitalizeWords,
    validate: validateEmptyness
  });

  const {
    Component: StreetAddressInput,
    error: streetAddressError,
    value: streetAddress,
    setValue: setStreetAddress,
  } = useTextInput({
    classNames: ELEMENTS_BUSY_CLASSNAMES,
    defaultValue: employee?.address.streetAddress,
    isBusy: isFormBusy,
    label: 'Street address',
    onBlur: capitalizeWords,
    validate: validateEmptyness
  });

  const {
    Component: StreetNumberInput,
    error: streetNumberError,
    value: streetNumber,
    setValue: setStreetNumber,
  } = useTextInput({
    classNames: ELEMENTS_BUSY_CLASSNAMES,
    defaultValue: employee?.address.streetNumber.toString(),
    isBusy: isFormBusy,
    label: 'Street number',
    validate: validateNumber
  });

  const {
    Component: ZipCodeInput,
    error: zipCodeError,
    value: zipCode,
    setValue: setZipCode,
  } = useTextInput({
    classNames: ELEMENTS_BUSY_CLASSNAMES,
    defaultValue: employee?.address.zipCode,
    isBusy: isFormBusy,
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
  const defaultHireDate = useMemo(
    () => !isEmpty(employee?.hireDate) ? dayjs(employee?.hireDate).format(VALIDATION_DATE_FORMAT) : '',
    [ employee ]
  );

  const defaultDepartment = useMemo(
    () => !isEmpty(employee?.department) ? employee?.department : null,
    [ employee ]
  );

  const defaultStatus = useMemo(
    () => !isEmpty(employee) ? EMPLOYEE_STATUSES.find(s => s.value === employee?.active) : null,
    [ employee ]
  );

  const {
    Component: DepartmentsCombobox,
    error: selectedDepartmentError,
    selectedValue: selectedDepartment,
    setSelectedValue: setSelectedDepartment,
  } = useCombobox({
    classNames: ELEMENTS_BUSY_CLASSNAMES,
    data: departments?.docs,
    defaultValue: defaultDepartment,
    disabled: isFetchingDepartments,
    isBusy: isFormBusy,
    label: 'Departments',
    onOptionChange: validateOptionChange,
    searchKey: 'name',
  });

  const {
    Component: HiringDateInput,
    error: hiringDateError,
    value: hiringDate,
    setValue: setHiringDate,
  } = useTextInput({
    classNames: ELEMENTS_BUSY_CLASSNAMES,
    defaultValue: defaultHireDate,
    isBusy: isFormBusy,
    label: 'Hiring date',
    placeholder: 'MM/DD/YYYY',
    validate: validateHiringDate
  });

  const {
    Component: StatusCombobox,
    error: selectedStatusError,
    selectedValue: selectedStatus,
    setSelectedValue: setSelectedStatus,
  } = useCombobox({
    classNames: ELEMENTS_BUSY_CLASSNAMES,
    data: EMPLOYEE_STATUSES,
    defaultValue: defaultStatus,
    isBusy: isFormBusy,
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
    return !isEmpty(employee);
  }, [ employee ]);

  const isDone = useMemo(
    () => personalInformationForm.isValid && addressForm.isValid && hiringInformationForm.isValid,
    [ addressForm, hiringInformationForm, personalInformationForm ]
  );

  const isButtonDisabled = useMemo(
    () => isSaving || !isDone,
    [ isDone, isSaving ]
  );

  const isInactive = useMemo(
    () => (selectedStatus?.name === EMPLOYEE_STATUS_OPTION_INACTIVE.name),
    [ selectedStatus ]
  );

  // callbacks
  /////
  const reset = useCallback(() => {
    setFirstName('');
    setLastName('');
    setPhone('');
    setState('');
    setCity('');
    setStreetAddress('');
    setStreetNumber('');
    setZipCode('');
    setSelectedDepartment(null);
    setHiringDate('');
    setSelectedStatus(null);

    setIsSaved(false);
    setIsSaving(false);
    setError({});
  }, [
    setFirstName,
    setLastName,
    setPhone,
    setState,
    setCity,
    setStreetAddress,
    setStreetNumber,
    setZipCode,
    setSelectedDepartment,
    setHiringDate,
    setSelectedStatus,
    setIsSaved,
    setIsSaving,
    setError,
  ]);

  const save = useCallback(async () => {
    try {
      setIsSaved(false);
      setIsSaving(true);
      setError(null);

      await sleep(2000);

      const request = isUpdating ? {
        url: `${API_BASE_URL}/employees/${employee?.id}`,
        method: 'PUT',
      } : {
        url: `${API_BASE_URL}/employees`,
        method: 'POST',
      };
      const response = await fetch(request.url, {
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          active: selectedStatus?.value,
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
        method: request.method,
        mode: 'cors',
      });
      if (!response.ok) {
        const err = await response.json();
        throw { ...err, status: response.status };
      };

      setIsSaving(false);
      setIsSaved(true);
    } catch(err: any) {
      setError(err);
    }
  }, [
    city,
    defaultProfilePicture,
    employee,
    firstName,
    hiringDate,
    isUpdating,
    lastName,
    phone,
    selectedDepartment,
    selectedStatus,
    setError,
    setIsSaved,
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
    if (isUpdating) return setDefaultProfilePicture(employee?.pictureURL as string);

    const randomPicture = EMPLOYEE_DEFAULT_PROFILE_PICTURES[Math.floor(Math.random() * EMPLOYEE_DEFAULT_PROFILE_PICTURES.length)];
    setDefaultProfilePicture(randomPicture);
  }, []);

  return (
    <div>
      {!isEmpty(error) ? (
        <Error error={(error as JSON)} />
      ) : saved ? (
        <Done reset={reset} />
      ) : (
        <div
          aria-busy={isFormBusy}
          className='flex flex-col items-center aria-busy:cursor-progress aria-busy:pointer-events-none'
        >
          <div className="mt-12 flex flex-col justify-center items-center">
            <div
              aria-busy={isFormBusy}
              className={`relative w-[14rem] h-[14rem] ${PICTURE_BUSY_CLASSNAMES}`}
            >
              {defaultProfilePicture && (
                <Image
                  aria-busy={isFormBusy}
                  src={defaultProfilePicture}
                  alt='Employee avatar'
                  className={`z-0 w-full h-full object-cover rounded-[.5rem] aria-busy:opacity-0 ${isInactive ? 'grayscale' : ''}`}
                  fill
                />
              )}

              <p className={`absolute z-10 inset-x-12 bottom-2 w-[8rem] py-1 text-center bg-[#D24124] rounded-[1rem] shadow-md ${isInactive && !isFormBusy ? 'inline-block' : 'hidden'}`}>
                Inactive
              </p>
            </div>

            <button
              className='mt-4 max-w-[14rem] py-[1rem] bg-[#98A1A8] text-[#2D3039] w-full rounded-[1rem] text-[1.6rem]'
              disabled
            >
              Upload photo
            </button>

            <p className='mt-4 text-[1rem] text-[#98A1A8] font-regular'>This is a premium feature.</p>
            <p className='text-[1rem] text-[#98A1A8] font-regular'>
              You must hire <Link href="https://bit.ly/leonardosarmentocastro-linkedin" passHref={true} target='_blank' className='text-[rgb(14,165,233)]'>"Leonardo Sarmento de Castro"</Link> for having it done.
            </p>
          </div>

          <div
            aria-busy={isFormBusy}
            className={`mt-8 p-8 flex flex-col gap-8 w-full lg:w-fit bg-[#2D3039] rounded-[1rem] border ${personalInformationForm.borderClassnames} ${FORM_BUSY_CLASSNAMES}`}
          >
            <h1 aria-busy={isFormBusy} className={`text-[1.6rem] md:text-[2.4rem] font-semibold ${personalInformationForm.textClassnames} ${ELEMENTS_BUSY_CLASSNAMES}`}>Personal information</h1>

            <div className='flex flex-col md:flex-row gap-8'>
              {FirstNameInput}
              {LastNameInput}
              {PhoneInput}
            </div>
          </div>

          <div
            aria-busy={isFormBusy}
            className={`mt-8 p-8 flex flex-col gap-8 w-full lg:w-fit bg-[#2D3039] rounded-[1rem] border ${addressForm.borderClassnames} ${FORM_BUSY_CLASSNAMES}`}
          >
            <h1
              aria-busy={isFormBusy}
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
            aria-busy={isFormBusy}
            className={`mt-8 p-8 flex flex-col gap-8 w-full lg:w-fit bg-[#2D3039] rounded-[1rem] border ${hiringInformationForm.borderClassnames} ${FORM_BUSY_CLASSNAMES}`}
          >
            <h1
              aria-busy={isFormBusy}
              className={`text-[1.6rem] md:text-[2.4rem] font-semibold ${hiringInformationForm.textClassnames} ${ELEMENTS_BUSY_CLASSNAMES}`}
            >
              Hiring information
            </h1>

            <div className='flex flex-col md:flex-row gap-8'>
              {DepartmentsCombobox}
              {HiringDateInput}
              {StatusCombobox}
            </div>

            {/* TODO: aria-busy */}
            {isUpdating && (
              <div
                // aria-busy={isFormBusy}
                className='flex flex-col'
              >
                {/* TODO: aria-busy */}
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

          {!isFormBusy && (
            <button
              className='mt-12 flex items-center justify-center md:max-w-[28rem] py-[1rem] bg-[#DAFDCC] text-[#2D3039] w-full rounded-[1rem] text-[1.6rem] disabled:grayscale disabled:opacity-50'
              disabled={isButtonDisabled}
              onClick={save}
            >
              {isSaving ? <LoadingSpinner /> : 'Save'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
