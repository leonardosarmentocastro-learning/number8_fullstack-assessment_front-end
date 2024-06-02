import Image from 'next/image';

export default function EmployeesPage() {
  return (
    <main className="p-8 h-screen bg-[#1D2025] overflow-y-scroll">
      <div className='flex flex-row justify-between'>
        <span className="material-symbols-outlined w-[2.4rem] h-[2.4rem]">menu</span>

        <Image
          src='/number8-logo.svg'
          alt='Number8 logo'
          className='w-[10rem] h-[3.3rem]'
          width='0'
          height='0'
        />
      </div>

      <div className='mt-12'>
        <h1 className='text-[2.4rem] text-[#fff] font-semibold'>Employees</h1>
        <p className='text-[1.4rem] text-[#98A1A8] font-regular'>Click on “view details” for further inspection and possibly change an employee's information.</p>
      </div>

      <div className='mt-8'>
        <div className='flex flex-col w-full'>
          <label
            className='text-[1.4rem] text-[#fff] font-semibold'
          >
            Search for
          </label>

          <div className='relative'>
            <span className="material-symbols-outlined absolute top-[1rem] left-[1rem] text-[2.4rem] text-[rgba(0,0,0,.5)] fill-current">search</span>

            <input
              type='text'
              className='text-[1.6rem] bg-[#F0EDEB] text-[rgba(0,0,0,.5)] rounded-[.5rem] py-[1rem] pl-[4rem] pr-[.5rem] w-full'
              placeholder='Department or employee name'
            />
          </div>
        </div>

        <button className='mt-4 py-[1rem] bg-[#EC9836] text-[#2D3039] w-full rounded-[1rem] text-[1.6rem]'>
          Search
        </button>

        <div className='mt-8 text-center'>
          <p className='text-[1.6rem] text-[#fff] font-semibold'>Seeing 1 - 10 of 30</p>

          <div className='mt-4 flex flex-row gap-4 justify-center'>
            <span className="material-symbols-outlined text-[2.4rem] text-[#fff]">first_page</span>
            <span className="material-symbols-outlined text-[2.4rem] text-[#fff]">chevron_left</span>
            <span className="material-symbols-outlined text-[2.4rem] text-[#fff]">chevron_right</span>
            <span className="material-symbols-outlined text-[2.4rem] text-[#fff]">last_page</span>
          </div>
        </div>
      </div>

      <div className='mt-8 flex flex-col gap-4'>
        {[0,1,3].map(i => (
          <div className='flex flex-col gap-4 px-4 py-4 bg-[#2D3039] rounded-[1rem] shadow-md' key={i}>
            <div className='grid grid-cols-[10rem,1fr] gap-4'>
              <div className='relative w-[10rem] h-[10rem]'>
                <Image
                  src='/leonardo-profile-picture.jpeg'
                  alt='Employee avatar'
                  className='w-full h-full object-cover rounded-[.5rem]'
                  fill
                />
              </div>

              <div className='truncate'>
                <p className='truncate text-[1.4rem] text-[#fff] font-semibold'>Leonardo <span className='text-[#98A1A8]'>Sarmento de Castro</span></p>

                <p className='mt-2 text-[1rem] text-[#98A1A8] font-regular'>Department</p>
                <p className='text-[1.2rem] text-[#fff] font-semibold'>Technology</p>

                <p className='mt-2 text-[1rem] text-[#98A1A8] font-regular'>Hired at</p>
                <p className='text-[1.2rem] text-[#fff] font-semibold'>May 02, 2024 (2y - 1m - 4d)</p>
              </div>
            </div>

            <div className='flex flex-row gap-4'>
              <button className='mt-4 py-[1rem] bg-[#fff] text-[#2D3039] w-full rounded-[1rem] text-[1.6rem]'>
                View details
              </button>

              <button className='mt-4 py-[1rem] bg-[#D24124] text-[#fff] w-full rounded-[1rem] text-[1.6rem]'>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}