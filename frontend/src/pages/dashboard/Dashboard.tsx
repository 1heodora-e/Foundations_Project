// import { useAuth } from '../../context/AuthContext';
import Layout from '@/components/Layout';
import StatsCards from './StatsCards';
import SurveyChart from './SurveyChart';

export default function Dashboard() {
  // const { user, logout } = useAuth();

  return (
    <Layout isAuthorized={true}>
      <main className='px-8'>
          <section>
            <StatsCards />
          </section>
          <section className='mt-4 h-[20vh]'>
            <SurveyChart />
          </section>
      </main>
    </Layout>
  );
}