import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import DashboardNav from './DashboardNav';

export default function Layout() {
  const {user} = useAuth();
  return (
    <>
    {!user ? 
      <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
      <Outlet />
      </main>
      </div>
      :
      <div className="min-h-screen flex">
       <section className='w-[18%] h-screen bg-white shadow-smooth'>
          <Sidebar />
       </section>
       <section className='w-[82%] h-screen bg-light'>
       <DashboardNav />
        <div>
          <Outlet />
        </div>
       </section>
      </div>
    }
    </>
  );
}