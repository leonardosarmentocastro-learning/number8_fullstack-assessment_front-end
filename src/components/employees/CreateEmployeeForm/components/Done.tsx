import { useRouter } from 'next/navigation';

type Props = { reset: () => void };
export const Done = ({ reset }: Props) => {
  const router = useRouter();

  const goToViewEmployees = async () => {
    router.push('/employees');
  };

  return (
    <div className='mt-[30%] flex flex-col text-center space-y-4 items-center justify-center'>
      <div className='mb-8'>
        <p className='text-[2.4rem] md:text-[3.2rem] text-[#fff] font-semibold'>Employee saved successfully!</p>
        <p className='text-[2rem] md:text-[2.4rem] text-[#98A1A8] font-regular'>What now?</p>
      </div>

      <button
        className='flex items-center justify-center md:max-w-[28rem] py-[1rem] bg-[#DAFDCC] text-[#2D3039] w-full rounded-[1rem] text-[1.6rem] disabled:grayscale disabled:opacity-50'
        onClick={goToViewEmployees}
      >
        View all employees
      </button>

      <button
        className='flex items-center justify-center md:max-w-[28rem] py-[1rem] bg-[#fff] text-[#2D3039] w-full rounded-[1rem] text-[1.6rem] disabled:grayscale disabled:opacity-50'
        onClick={reset}
      >
        Create new employee
      </button>
    </div>
  )
};
