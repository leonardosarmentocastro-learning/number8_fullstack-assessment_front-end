import Image from 'next/image';

export default function EmployeesPage() {
  return (
    <div>
      <div className='mt-12'>
        <h1 className='text-[2.4rem] md:text-[4rem] text-[#fff] font-semibold'>Employees</h1>
        <p className='text-[1.4rem] md:text-[2rem] text-[#98A1A8] font-regular'>Click on “view details” for further inspection and possibly change an employee's information.</p>
      </div>

      <div className='mt-8 flex flex-col md:flex-row justify-between items-center md:items-end'>
        <div className='flex flex-col lg:flex-row lg:gap-4 w-full md:max-w-[28rem] lg:max-w-[60rem]'>
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
        </div>

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

      <div className='mt-8 flex flex-col gap-4 md:grid md:grid-cols-[1fr,1fr] lg:grid-cols-[repeat(auto-fill,minmax(42rem,1fr))]'>
        {Array.from(Array(24).keys()).map(i => (
          <div
            className={`flex flex-col lg:flex-row lg:justify-between gap-4 px-4 py-4 bg-[#2D3039] rounded-[1rem] shadow-md border-2 ${i % 2 !== 0 ? 'border-[#FF7D7B]' : 'border-[#2D3039]'}`}
            key={i}
          >
            <div className='grid grid-cols-[10rem,1fr] lg:grid-cols-[10rem,fit-content] gap-4'>
              <div className='relative w-[10rem] h-[10rem]'>
                <Image
                  src='/leonardo-profile-picture.jpeg'
                  alt='Employee avatar'
                  className={`z-0 w-full h-full object-cover rounded-[.5rem] ${i % 2 !== 0 ? 'grayscale' : ''}`}
                  fill
                />

                <p className={`absolute z-10 inset-x-4 bottom-2 w-[8rem] py-1 text-center bg-[#D24124] rounded-[1rem] shadow-md ${i % 2 !== 0 ? 'inline-block' : 'hidden'}`}>Inactive</p>
              </div>

              <div className='truncate'>
                <p className={`truncate text-[1.4rem] font-semibold ${i % 2 !== 0 ? 'text-[#FF7D7B]' : 'text-[#fff]'}`}>Leonardo <span className='text-[#98A1A8]'>Sarmento de Castro</span></p>

                <p className='mt-2 text-[1rem] text-[#98A1A8] font-regular'>Department</p>
                <p className='text-[1.2rem] text-[#fff] font-semibold'>Technology</p>

                <p className='mt-2 text-[1rem] text-[#98A1A8] font-regular'>Hired at</p>
                <p className='truncate text-[1.2rem] text-[#fff] font-semibold'>May 02, 2024 (2y - 1m - 4d)</p>
              </div>
            </div>

            <div className='flex flex-row lg:flex-col gap-4'>
              <button className='mt-4 lg:mt-0 py-[1rem] px-[1rem] bg-[#fff] text-[#2D3039] w-full rounded-[1rem] text-[1.6rem] lg:text-nowrap'>
                View details
              </button>

              <button className='mt-4 lg:mt-0 py-[1rem] px-[1rem] bg-[#D24124] text-[#fff] w-full rounded-[1rem] text-[1.6rem] lg:text-nowrap'>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
