import { createBrowserRouter } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/dashboard/Dashboard';
import HomePage from './pages/HomePage';
import Appointments from './pages/appointment/Appointments';
import Doctors from './pages/doctors/Doctors';
import Patients from './pages/patients/Patients';

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
      },
      {
        path: "doctors",
        element: (
          // <ProtectedRoute>
            <Doctors />
          // </ProtectedRoute>
        )
      },
      {
        path: "patients",
        element: (
          // <ProtectedRoute>
            <Patients />
          // </ProtectedRoute>
        )
      }
    ],
  },
]);