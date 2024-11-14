import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <Button variant="outline" onClick={logout}>
          Sign out
        </Button>
      </div>
      <p className="text-lg text-gray-600 mb-4">
        Welcome back, {user?.name}!
      </p>
      <p className="text-gray-600">
        Your health data will appear here.
      </p>
    </div>
  );
}