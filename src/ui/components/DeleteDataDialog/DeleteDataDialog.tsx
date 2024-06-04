import { DialogModal, Props as DialogModalProps } from '../Dialog/Dialog';
import { capitalize } from '../../../utils';

type Props = {
  confirm: () => void,
  data: string,
  model: string,
} & DialogModalProps;

export function DeleteDataDialog({
  close,
  confirm,
  model,
  data,
  isOpen,
}: Props) {
  return (
    <DialogModal
      close={close}
      isOpen={isOpen}
    >
      <div className='p-8 flex flex-col space-y-4'>
        <p className='text-[2.4rem] md:text-[2.8rem] text-[#fff] font-regular'>Delete {model}</p>
        <p className='text-[1.4rem] md:text-[2rem] text-[#98A1A8] font-regular'>{capitalize(model)} "{data}" will be permanently deleted.</p>
        <p className='text-[1.4rem] md:text-[2rem] text-[#98A1A8] font-regular'>Are you sure?</p>

        <div className='flex flex-row gap-4'>
          <button
            className='mt-4 lg:mt-0 py-[1rem] px-[1rem] bg-[#fff] text-[#2D3039] w-full rounded-[1rem] text-[1.6rem] lg:text-nowrap'
            onClick={close}
          >
            No, don't do it
          </button>

          <button
            className='mt-4 lg:mt-0 py-[1rem] px-[1rem] bg-[#D24124] text-[#fff] w-full rounded-[1rem] text-[1.6rem] lg:text-nowrap'
            onClick={confirm}
          >
            Yes, delete it
          </button>
        </div>
      </div>
    </DialogModal>
  )
};
