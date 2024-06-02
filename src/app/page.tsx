import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  return redirect('/employees');
  // return (
  //   <main className="flex min-h-screen flex-col items-center justify-between p-24">
  //     Home
  //   </main>
  // );
}
