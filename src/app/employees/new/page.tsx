'use client';

import Image from 'next/image';
import { isMobilePhone, MobilePhoneLocale } from 'validator';
// import { useRouter, usePathname } from 'next/navigation';

import { useCombobox, useTextInput, Validate } from '../../../ui';
import { useFetchDepartments } from '../../../data';

// TODO: move to own file
const ERROR_CANT_BE_EMPTY = "Can't be empty";
const ERROR_INVALID_PHONE_NUMBER = "Invalid phone number.";
const PHONE_LOCALES: MobilePhoneLocale[] = ['en-US', 'es-AR', 'pt-BR'];
const EMPLOYEE_DEFAULT_PROFILE_PICTURE = 'https://cdn.dribbble.com/users/781172/screenshots/5701280/media/619e446a12fef36a007ef7a8278d07e3.jpg';
const EMPLOYEE_STATUSES = [{
  id: '0',
  name: 'Active',
  value: true,
}, {
  id: '1',
  name: 'Inactive',
  value: false,
}]

// TODO: move to own file
const validateEmptyness: Validate = ({ setError, value }) => {
  if (!value) return setError(ERROR_CANT_BE_EMPTY);
  setError('');
};

const validateCellphoneNumber: Validate = ({ setError, value }) => {
  if (!value) return setError(ERROR_CANT_BE_EMPTY);
  if (!isMobilePhone(value, PHONE_LOCALES, { strictMode: false })) return setError(ERROR_INVALID_PHONE_NUMBER);

  setError('');
};

export default function NewEmployeePage() {
  // TODO:
  // -> useParams: https://nextjs.org/docs/app/api-reference/functions/use-params
  // const pathname = usePathname();
  // const isUpdating = pathname.includes('/employees/new/');

  // TODO: encapsulate into it's own component, so can be used in both '/employees/new' or '/employees/update/:id`
  const {
    data: departments,
    error,
    isLoading: isFetchingDepartments,
  } = useFetchDepartments({ criteria: {}, limit: 100, page: 1 });

  // personal information form
  /////
  const {
    Component: FirstNameInput,
    error: firstNameError,
    value: firstName,
  } = useTextInput({
    label: 'First name',
    validate: validateEmptyness
  });

  const {
    Component: LastNameInput,
    error: lastNameError,
    value: lastName,
  } = useTextInput({
    label: 'Last name',
    validate: validateEmptyness
  });

  const {
    Component: PhoneInput,
    error: phoneError,
    value: phone,
  } = useTextInput({
    label: 'Phone number',
    defaultError: '',
    defaultValue: '',
    // disabled: isFetching,
    validate: validateCellphoneNumber,
  });

  // address form
  /////
  const {
    Component: StateInput,
    error: stateError,
    value: state,
  } = useTextInput({
    label: 'State',
    validate: validateEmptyness
  });

  const {
    Component: CityInput,
    error: cityError,
    value: city,
  } = useTextInput({
    label: 'City',
    validate: validateEmptyness
  });

  const {
    Component: StreetAddressInput,
    error: streetAddressError,
    value: streetAddress,
  } = useTextInput({
    label: 'Street address',
    validate: validateEmptyness
  });

  const {
    Component: StreetNumberInput,
    error: streetNumberError,
    value: streetNumber,
  } = useTextInput({
    label: 'Street number',
    validate: validateEmptyness
  });

  const {
    Component: ZipCodeInput,
    error: zipCodeError,
    value: zipCode,
  } = useTextInput({
    label: 'ZIP code',
    validate: validateEmptyness
  });

  // hiring information form
  /////
  const {
    Component: DepartmentsCombobox,
    selectedValue: selectedDepartment,
  } = useCombobox({
    data: departments?.docs,
    label: 'Departments',
    searchKey: 'name',
  });

  const {
    Component: HiringDateInput,
    error: hiringDateError,
    value: hiringDate,
  } = useTextInput({
    label: 'Hiring date',
    placeholder: 'MM/DD/YYYY',
    // validate: validateEmptyness // TODO: own custom validation using `validator.isDate`
  });

  const {
    Component: StatusCombobox,
    selectedValue: selectedStatus,
  } = useCombobox({
    data: EMPLOYEE_STATUSES,
    label: 'Status',
    searchKey: 'name',
  });

  return (
    <div className='p-8'>
      <div className='mt-12 lg:mt-8'>
        <h1 className='text-[2.4rem] md:text-[4rem] text-[#fff] font-semibold'>New employee</h1>
        <p className='text-[1.4rem] md:text-[2rem] text-[#98A1A8] font-regular'>Provide information regarding the newcomer:</p>
      </div>

      <div className='flex flex-col items-center'>
        <div className="mt-12 flex flex-col justify-center items-center">
          <div className='relative w-[14rem] h-[14rem]'>
            <Image
              src={EMPLOYEE_DEFAULT_PROFILE_PICTURE}
              alt='Employee avatar'
              className={`z-0 w-full h-full object-cover rounded-[.5rem] ${false ? 'grayscale' : ''}`}
              fill
            />

            <p className={`absolute z-10 inset-x-4 bottom-2 w-[8rem] py-1 text-center bg-[#D24124] rounded-[1rem] shadow-md ${false ? 'inline-block' : 'hidden'}`}>Inactive</p>
          </div>

          <button
            className='mt-4 max-w-[14rem] py-[1rem] bg-[#98A1A8] text-[#2D3039] w-full rounded-[1rem] text-[1.6rem]'
            disabled
          >
            Upload photo
          </button>
        </div>

        <div className='mt-8 p-8 flex flex-col gap-8 w-full lg:w-fit bg-[#2D3039] rounded-[1rem] border border-[#DAFDCC]'>
          <h1 className='text-[1.6rem] md:text-[2.4rem] text-[#DAFDCC] font-semibold'>Personal information</h1>

          <div className='flex flex-col md:flex-row gap-8'>
            {FirstNameInput}
            {LastNameInput}
            {PhoneInput}
          </div>
        </div>

        <div className='mt-8 p-8 flex flex-col gap-8 w-full lg:w-fit bg-[#2D3039] rounded-[1rem] border border-[#FF7D7B]'>
          <h1 className='text-[1.6rem] md:text-[2.4rem] text-[#FF7D7B] font-semibold'>Address</h1>

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

        <div className='mt-8 p-8 flex flex-col gap-8 w-full lg:w-fit bg-[#2D3039] rounded-[1rem] border border-[#98A1A8]'>
          <h1 className='text-[1.6rem] md:text-[2.4rem] text-[#98A1A8] font-semibold'>Hiring information</h1>

          <div className='flex flex-col md:flex-row gap-8'>
            {DepartmentsCombobox}
            {HiringDateInput}
            {StatusCombobox}
          </div>

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
        </div>

        <button className='mt-12 md:max-w-[28rem] py-[1rem] bg-[#DAFDCC] text-[#2D3039] w-full rounded-[1rem] text-[1.6rem]'>
          Save
        </button>
      </div>
    </div>
  );
}
