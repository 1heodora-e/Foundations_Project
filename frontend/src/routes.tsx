import { createBrowserRouter } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/dashboard/Dashboard';
import HomePage from './pages/HomePage';
import Appointments from './pages/appointment/Appointments';
// import Doctors from './pages/doctors/Doctors';
import Patients from './pages/patients/Patients';
import Departments from './pages/departments/Departments';
import { AuthProvider } from './context/AuthContext';
import Help from './pages/help';
import Specialists from './pages/specialists/Specialist';

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
        element: 
          <AuthProvider>
            <SignupPage />
          </AuthProvider>
      },
      {
        path: 'login',

        element: (
          <AuthProvider>
            <LoginPage />,
          </AuthProvider>
        )
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
        path: "specialists",
        element: (
            <Specialists />
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
      },
      {
        path: "departments",
        element: (
          // <ProtectedRoute>
            <Departments />
          // </ProtectedRoute>
        )
      },
      {
        path: "help",
        element: (
          // <ProtectedRoute>
            <Help />
          // </ProtectedRoute>
        )
      }
    ],
  },
]);