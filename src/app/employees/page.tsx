'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import {
  API_BASE_URL,
  Employee,
  Employees,
  FETCH_EMPLOYEES_PAGINATION_LIMIT,
  Paginated,
  usePagination,
  useFetchEmployees,
} from '@/data';
import { EmployeeCard } from '@/components';
import {
  DeleteDataDialog,
} from '@/ui/components';

const EmployeesList = ({ pagination }: {
  pagination: Paginated<Employees>,
}) => {
  const router = useRouter();

  // dialog
  /////
  const [ deleteDataDialog, setDeleteDataDialog ] = useState({
    isOpen: false,
    deletingDataId: '',
    data: '',
  });
  const openDeleteDataDialog = (employee: Employee) =>
    () => setDeleteDataDialog({
      data: `${employee.firstName} ${employee.lastName}`,
      deletingDataId: employee.id,
      isOpen: true,
    });
  const closeDeleteDataDialog = () => setDeleteDataDialog({
    isOpen: false,
    deletingDataId: '',
    data: '',
  });

  // deleting employee
  /////
  const [ isDeleting, setIsDeleting ] = useState(false);
  const [ error, setError ] = useState<unknown>(null);

  const deleteEmployee = useCallback(async () => {
    try {
      setIsDeleting(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/employees/${deleteDataDialog.deletingDataId}`, {
        headers: {
          "Accept-Language": 'pt-br',
          "Content-Type": "application/json",
        },
        method: 'DELETE',
        mode: 'cors',
      });
      if (!response.ok) {
        const err = await response.json();
        throw { ...err, status: response.status };
      };

      setIsDeleting(false);
      pagination.mutate(); // resets cache and force re-fetch
    } catch(err: unknown) {
      setError(err);
    }
  }, [
    closeDeleteDataDialog,
    deleteDataDialog,
    pagination,
    setError,
    setIsDeleting,
  ]);

  const confirmDeletion = useCallback(async () => {
    await deleteEmployee();
    closeDeleteDataDialog();
  }, [
    closeDeleteDataDialog,
    deleteEmployee,
  ]);

  // navigation
  /////
  const goToViewEmployee = (employee: Employee) => () => {
    router.push(`/employees/${employee.id}`);
  };

  return (
    <section>
      <DeleteDataDialog
        confirm={confirmDeletion}
        close={closeDeleteDataDialog}
        isOpen={deleteDataDialog.isOpen}
        data={deleteDataDialog.data}
        model='employee'
      />

      <div className='mt-8 flex flex-col gap-4 md:grid md:grid-cols-[1fr,1fr] lg:grid-cols-[repeat(auto-fill,minmax(42rem,1fr))]'>
        {pagination.data?.docs.map((employee: Employee) => (
          <EmployeeCard.Component
            employee={employee}
            key={employee.id}
            onRemoveButtonClick={openDeleteDataDialog(employee)}
            onViewDetailsButtonClick={goToViewEmployee(employee)}
          />
        ))}
      </div>
    </section>
  );
};

const Loading = () => (
  <div className='mt-8 flex flex-col gap-4 md:grid md:grid-cols-[1fr,1fr] lg:grid-cols-[repeat(auto-fill,minmax(42rem,1fr))]'>
    {[...Array.from(Array(24).keys())].map((v, i) => (
      <EmployeeCard.Skeleton key={i} />
    ))}
  </div>
);

const NoData = () => (
  <div className='mx-auto mt-12 text-center'>
    <p className='text-[1.4rem] md:text-[2rem] text-[#fff] font-semibold'>No registries</p>
    <p className='text-[1.4rem] md:text-[2rem] text-[#98A1A8] font-regular'>There is no data to show.</p>
  </div>
);

const NotFound = () => (
  <div className='mx-auto mt-12 text-center'>
    <p className='text-[1.4rem] md:text-[2rem] text-[#fff] font-semibold'>Not found</p>
    <p className='text-[1.4rem] md:text-[2rem] text-[#98A1A8] font-regular'>There is no data that satifies the given search terms.</p>
  </div>
);

const Error = () => (
  <div className='mx-auto mt-12 text-center'>
    <p className='text-[1.4rem] md:text-[2rem] text-[#fff] font-semibold'>There was an error fetching employees.</p>
    <p className='text-[1.4rem] md:text-[2rem] text-[#98A1A8] font-regular'>We will automatically try again in a few moments.</p>
  </div>
);

const Display = ({ pagination }: {
  pagination: Paginated<Employees>,
}) => {
  if (pagination.isLoading) return <Loading />;
  if (!!pagination.error) return <Error />;
  if (pagination.hasData) return <EmployeesList pagination={pagination} />
  if (!pagination.hasData && !pagination.searchTerm) return <NoData />;
  if (!pagination.hasData && !!pagination.searchTerm) return <NotFound />;

  return <Loading />;
};

export default function EmployeesPage() {
  const pagination = usePagination(useFetchEmployees, {
    isSearchForButtonDisabled: false,
    searchKeys: [ 'firstName', 'lastName' ],
    placeholder: "Employee's first or last name",
    paginationLimit: FETCH_EMPLOYEES_PAGINATION_LIMIT,
  });

  return (
    <div className='p-8'>
      <div className='mt-12 lg:mt-8'>
        <h1 className='text-[2.4rem] md:text-[4rem] text-[#fff] font-semibold'>Employees</h1>
        <p className='text-[1.4rem] md:text-[2rem] text-[#98A1A8] font-regular'>Click on “view details” for further inspection and possibly change an employee's information.</p>
      </div>

      {pagination.Component}

      <Display
        pagination={pagination}
      />
    </div>
  );
}
