import Image from 'next/image';

export default function NewEmployeePage() {
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
              src='/leonardo-profile-picture.jpeg'
              alt='Employee avatar'
              className={`z-0 w-full h-full object-cover rounded-[.5rem] ${false ? 'grayscale' : ''}`}
              fill
            />

            <p className={`absolute z-10 inset-x-4 bottom-2 w-[8rem] py-1 text-center bg-[#D24124] rounded-[1rem] shadow-md ${false ? 'inline-block' : 'hidden'}`}>Inactive</p>
          </div>

          <button className='mt-4 max-w-[14rem] py-[1rem] bg-[#EC9836] text-[#2D3039] w-full rounded-[1rem] text-[1.6rem]'>
            Upload photo
          </button>
        </div>

        {/* DAFDCC -> done */}
        {/* 98A1A8 -> pristine */}
        {/* FF7D7B -> error */}
        <div className='mt-8 p-8 flex flex-col gap-8 w-full lg:w-fit bg-[#2D3039] rounded-[1rem] border border-[#DAFDCC]'>
          <h1 className='text-[1.6rem] md:text-[2.4rem] text-[#DAFDCC] font-semibold'>Personal information</h1>

          <div className='flex flex-col md:flex-row gap-8'>
            <div className='flex flex-col w-full md:max-w-[21.5rem] lg:w-[23rem]'>
              <label
                className='text-[1.4rem] md:text-[1.6rem] text-[#fff] font-semibold'
              >
                First name
              </label>

              <div className='relative'>
                {/* <span className="material-symbols-outlined absolute top-[1rem] left-[1rem] text-[2.4rem] text-[rgba(0,0,0,.5)] fill-current">search</span> */}

                <input
                  type='text'
                  className='text-[1.6rem] bg-[#F0EDEB] text-[rgba(0,0,0,.5)] rounded-[.5rem] pt-[1.5rem] pb-[.5rem] pl-[1rem] pr-[.5rem] w-full'
                  placeholder='Leonardo'
                />
              </div>
            </div>

            <div className='flex flex-col w-full md:max-w-[21.5rem] lg:w-[23rem]'>
              <label
                className='text-[1.4rem] md:text-[1.6rem] text-[#fff] font-semibold'
              >
                Last name
              </label>

              <div className='relative'>
                {/* <span className="material-symbols-outlined absolute top-[1rem] left-[1rem] text-[2.4rem] text-[rgba(0,0,0,.5)] fill-current">search</span> */}

                <input
                  type='text'
                  className='text-[1.6rem] bg-[#F0EDEB] text-[rgba(0,0,0,.5)] rounded-[.5rem] pt-[1.5rem] pb-[.5rem] pl-[1rem] pr-[.5rem] w-full'
                  placeholder='Sarmento de Castro'
                />
              </div>
            </div>

            <div className='flex flex-col w-full md:max-w-[21.5rem] lg:w-[23rem]'>
              <label
                className='text-[1.4rem] md:text-[1.6rem] text-[#fff] font-semibold'
              >
                Phone number
              </label>

              <div className='relative'>
                {/* <span className="material-symbols-outlined absolute top-[1rem] left-[1rem] text-[2.4rem] text-[rgba(0,0,0,.5)] fill-current">search</span> */}

                <input
                  type='text'
                  className='text-[1.6rem] bg-[#F0EDEB] text-[rgba(0,0,0,.5)] rounded-[.5rem] pt-[1.5rem] pb-[.5rem] pl-[1rem] pr-[.5rem] w-full'
                  placeholder='(12) 98127-6618'
                />
              </div>
            </div>
          </div>
        </div>

        {/* DAFDCC -> done */}
        {/* 98A1A8 -> pristine */}
        {/* FF7D7B -> error */}
        <div className='mt-8 p-8 flex flex-col gap-8 w-full lg:w-fit bg-[#2D3039] rounded-[1rem] border border-[#FF7D7B]'>
          <h1 className='text-[1.6rem] md:text-[2.4rem] text-[#FF7D7B] font-semibold'>Address</h1>

          <div className='flex flex-col md:flex-row gap-8'>
            <div className='flex flex-col w-full md:max-w-[21.5rem] lg:w-[23rem]'>
              <label
                className='text-[1.4rem] md:text-[1.6rem] text-[#fff] font-semibold'
              >
                State
              </label>

              <div className='relative'>
                {/* <span className="material-symbols-outlined absolute top-[1rem] left-[1rem] text-[2.4rem] text-[rgba(0,0,0,.5)] fill-current">search</span> */}

                <input
                  type='text'
                  className='text-[1.6rem] bg-[#F0EDEB] text-[rgba(0,0,0,.5)] rounded-[.5rem] pt-[1.5rem] pb-[.5rem] pl-[1rem] pr-[.5rem] w-full'
                  placeholder='São Paulo'
                />
              </div>
            </div>

            <div className='flex flex-col w-full md:max-w-[21.5rem] lg:w-[23rem]'>
              <label
                className='text-[1.4rem] md:text-[1.6rem] text-[#fff] font-semibold'
              >
                Cidade
              </label>

              <div className='relative'>
                {/* <span className="material-symbols-outlined absolute top-[1rem] left-[1rem] text-[2.4rem] text-[rgba(0,0,0,.5)] fill-current">search</span> */}

                <input
                  type='text'
                  className='text-[1.6rem] bg-[#F0EDEB] text-[rgba(0,0,0,.5)] rounded-[.5rem] pt-[1.5rem] pb-[.5rem] pl-[1rem] pr-[.5rem] w-full'
                  placeholder='São José dos Campos'
                />
              </div>
            </div>
          </div>

          <div className='flex flex-col md:flex-row gap-8'>
            <div className='flex flex-col w-full md:max-w-[21.5rem] lg:w-[23rem]'>
              <label
                className='text-[1.4rem] md:text-[1.6rem] text-[#fff] font-semibold'
              >
                Street address
              </label>

              <div className='relative'>
                {/* <span className="material-symbols-outlined absolute top-[1rem] left-[1rem] text-[2.4rem] text-[rgba(0,0,0,.5)] fill-current">search</span> */}

                <input
                  type='text'
                  className='text-[1.6rem] bg-[#F0EDEB] text-[rgba(0,0,0,.5)] rounded-[.5rem] pt-[1.5rem] pb-[.5rem] pl-[1rem] pr-[.5rem] w-full'
                  placeholder='Avenida José de Moura Candelária'
                />
              </div>
            </div>

            <div className='flex flex-col w-full md:max-w-[21.5rem] lg:w-[23rem]'>
              <label
                className='text-[1.4rem] md:text-[1.6rem] text-[#fff] font-semibold'
              >
                Street number
              </label>

              <div className='relative'>
                {/* <span className="material-symbols-outlined absolute top-[1rem] left-[1rem] text-[2.4rem] text-[rgba(0,0,0,.5)] fill-current">search</span> */}

                <input
                  type='text'
                  className='text-[1.6rem] bg-[#F0EDEB] text-[rgba(0,0,0,.5)] rounded-[.5rem] pt-[1.5rem] pb-[.5rem] pl-[1rem] pr-[.5rem] w-full'
                  placeholder='312'
                />
              </div>
            </div>

            <div className='flex flex-col w-full md:max-w-[21.5rem] lg:w-[23rem]'>
              <label
                className='text-[1.4rem] md:text-[1.6rem] text-[#fff] font-semibold'
              >
                ZIP code
              </label>

              <div className='relative'>
                {/* <span className="material-symbols-outlined absolute top-[1rem] left-[1rem] text-[2.4rem] text-[rgba(0,0,0,.5)] fill-current">search</span> */}

                <input
                  type='text'
                  className='text-[1.6rem] bg-[#F0EDEB] text-[rgba(0,0,0,.5)] rounded-[.5rem] pt-[1.5rem] pb-[.5rem] pl-[1rem] pr-[.5rem] w-full'
                  placeholder='12220-390'
                />
              </div>
            </div>
          </div>
        </div>

        {/* DAFDCC -> done */}
        {/* 98A1A8 -> pristine */}
        {/* FF7D7B -> error */}
        <div className='mt-8 p-8 flex flex-col gap-8 w-full lg:w-fit bg-[#2D3039] rounded-[1rem] border border-[#98A1A8]'>
          <h1 className='text-[1.6rem] md:text-[2.4rem] text-[#98A1A8] font-semibold'>Hiring information</h1>

          <div className='flex flex-col md:flex-row gap-8'>
            <div className='flex flex-col w-full md:max-w-[21.5rem] lg:w-[23rem]'>
              <label
                className='text-[1.4rem] md:text-[1.6rem] text-[#fff] font-semibold'
              >
                Department
              </label>

              <div className='relative'>
                {/* <span className="material-symbols-outlined absolute top-[1rem] left-[1rem] text-[2.4rem] text-[rgba(0,0,0,.5)] fill-current">search</span> */}

                <input
                  type='text'
                  className='text-[1.6rem] bg-[#F0EDEB] text-[rgba(0,0,0,.5)] rounded-[.5rem] pt-[1.5rem] pb-[.5rem] pl-[1rem] pr-[.5rem] w-full'
                  placeholder=''
                />
              </div>
            </div>

            <div className='flex flex-col w-full md:max-w-[21.5rem] lg:w-[23rem]'>
              <label
                className='text-[1.4rem] md:text-[1.6rem] text-[#fff] font-semibold'
              >
                Hiring date
              </label>

              <div className='relative'>
                {/* <span className="material-symbols-outlined absolute top-[1rem] left-[1rem] text-[2.4rem] text-[rgba(0,0,0,.5)] fill-current">search</span> */}

                <input
                  type='text'
                  className='text-[1.6rem] bg-[#F0EDEB] text-[rgba(0,0,0,.5)] rounded-[.5rem] pt-[1.5rem] pb-[.5rem] pl-[1rem] pr-[.5rem] w-full'
                  placeholder=''
                />
              </div>
            </div>

            <div className='flex flex-col w-full md:max-w-[21.5rem] lg:w-[23rem]'>
              <label
                className='text-[1.4rem] md:text-[1.6rem] text-[#fff] font-semibold'
              >
                Status
              </label>

              <div className='relative'>
                {/* <span className="material-symbols-outlined absolute top-[1rem] left-[1rem] text-[2.4rem] text-[rgba(0,0,0,.5)] fill-current">search</span> */}

                <input
                  type='text'
                  className='text-[1.6rem] bg-[#F0EDEB] text-[rgba(0,0,0,.5)] rounded-[.5rem] pt-[1.5rem] pb-[.5rem] pl-[1rem] pr-[.5rem] w-full'
                  placeholder=''
                />
              </div>
            </div>
          </div>

          <div className='flex flex-col'>
            <h1 className='text-[1.6rem] md:text-[2.4rem] text-[#98A1A8] font-semibold'>Department History</h1>

            <table className='text-left text-[1.2rem] md:text-[1.4rem] font-semibold'>
              <tr className='border-b border-[#D9D9D9] md:text-[1.6rem]'>
                <th className='px-4 py-3'>Date</th>
                <th className='px-4 py-3'>Department</th>
              </tr>

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
