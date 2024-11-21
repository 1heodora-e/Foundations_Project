import { useLocation } from 'react-router-dom';
import Logo from "../assets/logo.svg";
import { 
  MdDashboard, 
  MdEventNote, 
  MdPeople, 
  MdLocalHospital, 
  MdPersonAdd,
  MdHelp 
} from "react-icons/md";

const navigationItems = [
  { path: '/dashboard', label: 'Dashboard', icon: MdDashboard },
  { path: '/appointments', label: 'Appointments', icon: MdEventNote },
  { path: '/doctors', label: 'Doctors', icon: MdPeople },
  { path: '/departments', label: 'Departments', icon: MdLocalHospital },
  { path: '/patients', label: 'Patients', icon: MdPersonAdd },
  { path: '/help', label: 'Help', icon: MdHelp },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <main className="p-6 px-10">
      <section className="">
        <img src={Logo} alt="logo" className="" />
      </section>
      
      <section className="mt-12 flex flex-col space-y-2">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <a
              key={item.path}
              href={item.path}
              className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors
                ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600'}`}
            >
              <item.icon className={`text-xl ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
              <span className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-700'}`}>
                {item.label}
              </span>
            </a>
          );
        })}
      </section>
    </main>
  );
}