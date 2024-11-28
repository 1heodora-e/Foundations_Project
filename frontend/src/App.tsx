import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import Button from './components/ui/Button';
import Input from './components/ui/Input';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Preview */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 p-12 flex-col text-white justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-4">Welcome Back to<br />Ubuzima Connect</h2>
          <p className="text-blue-100">Your healthcare management platform</p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070"
          alt="Healthcare dashboard"
          className="rounded-lg shadow-2xl"
        />
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex items-center">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Login to your account</h1>
            <p className="text-gray-600">Welcome back! Please enter your details</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />

            <Input
              label="Password"
              type="password"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>

            <div className="space-y-3">
              <Button type="submit">
                Sign in
              </Button>
              
              <Button variant="outline" type="button">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
                Sign in with Google
              </Button>
            </div>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="text-blue-600 hover:text-blue-500">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;