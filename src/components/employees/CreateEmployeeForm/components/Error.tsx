export const Error = ({ error }: { error: JSON }) => (
  <div className='mt-[30%] flex flex-col text-center space-y-4 items-center justify-center'>
    <p className='text-[2.4rem] md:text-[3.2rem] text-[#fff] font-semibold'>Sorry, we had a problem saving an employee.</p>
    <p className='text-[2rem] md:text-[2.4rem] text-[#98A1A8] font-regular'>More information below:</p>

    <pre className='p-12'>
      <code className='text-[1.6rem] md:text-[2rem] text-[#98A1A8] font-regular'>
        {JSON.stringify(error)}
      </code>
    </pre>

    <button
      className='flex items-center justify-center md:max-w-[28rem] py-[1rem] bg-[#fff] text-[#2D3039] w-full rounded-[1rem] text-[1.6rem] disabled:grayscale disabled:opacity-50'
    >
      Go back and try again
    </button>
  </div>
);
