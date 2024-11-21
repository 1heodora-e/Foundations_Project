import { createBrowserRouter } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/dashboard/Dashboard';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Appointments from './pages/appointment/Appointments';

export const router = createBrowserRouter([
  {
    // path: '/',
    // element: (
    //   <AuthProvider>
    //     <Layout isAuthorized={false} />
    //   </AuthProvider>
    // ),
    children: [
      {
        path: '/',
        index: true,
        element: <HomePage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'dashboard',
        element: (
          // <ProtectedRoute>
            <Dashboard />
          // </ProtectedRoute>
        ),
      },
      {
        path: "appointments",
        element: (
          // <ProtectedRoute>
            <Appointments />
          // </ProtectedRoute>
        )
      }
    ],
  },
]);