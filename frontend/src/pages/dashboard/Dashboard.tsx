// import { useAuth } from '../../context/AuthContext';
import StatsCards from './StatsCards';
import SurveyChart from './SurveyChart';

export default function Dashboard() {
  // const { user, logout } = useAuth();

  return (
   <main className='px-8'>
      <section>
        <StatsCards />
      </section>
      <section className='mt-4 h-[20vh]'>
        <SurveyChart />
      </section>
   </main>
  );
}