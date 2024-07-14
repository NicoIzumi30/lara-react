import React from 'react'
import { Toaster } from 'react-hot-toast';
import { Link, usePage } from '@inertiajs/react';  
import toast from 'react-hot-toast';          
const AdminLayout = ({children}) => {
   const {component} = usePage();
   const {auth} = usePage().props;

  return (
   <>
   <div><Toaster position="top-right"
  reverseOrder={false} /></div>        
   <header className="bg-black text-white py-8">
        <div className="container mx-auto">
            <div className="flex justify-between items-center">
            <h2 className='font-bold text-2xl'>Todo</h2>
            <nav className='flex justify-between items-center grow ml-36        '>
                <div className='flex gap-6 items-center justify-start'  >
                <Link href="/dashboard" className={`${component === "Dashboard" ? "font-semibold text-indigo-500" : ""}`}  >Dashboard</Link>
                <Link href="/todo" className={`${component === "Todo" ? "font-semibold text-indigo-500" : ""}`}>Todo</Link>
                </div>
                <div>{auth.user.name}</div>
                
            </nav>
            </div>
           
        </div>
   </header>
   <main>
    <div className="container mx-auto mt-10">
    {children}
    </div>
   </main>
   </>
  )
}

export default AdminLayout