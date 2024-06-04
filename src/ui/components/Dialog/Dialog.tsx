import React from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'

export type Props = {
  children?: React.ReactNode,
  isOpen: boolean,
  close: () => void,
};
export function DialogModal({
  children,
  isOpen,
  close,
}: Props) {
  return (
    <Transition show={isOpen}>
      <Dialog
        className="relative z-10"
        open={isOpen}
        onClose={close}
      >
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          as='div'
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed top-[30%] z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              as='div'
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-[#1D2025] text-left shadow-xl transition-all my-8 w-full max-w-lg md:max-w-2xl md:max-w-4xl">
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
};
