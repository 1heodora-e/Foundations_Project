import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { LoginFormData } from "../types";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const { register, handleSubmit } = useForm<LoginFormData>();

  const handleLogin = async (data: LoginFormData) => {
    try {
      await login(data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    // <Layout isAuthorized={false}>
    <div className="min-h-screen flex">
      {/* Left side - Preview */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 p-12 flex-col text-white justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Welcome Back to
            <br />
            Ubuzima Connect
          </h2>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Login to your account
            </h1>
            <p className="text-gray-600">
              Welcome back! Please enter your details
            </p>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            <Input
              {...register("email")}
              label="Email"
              type="email"
              icon={Mail}
              required
              placeholder="Enter your email"
            />

            <Input
              {...register("password")}
              label="Password"
              type="password"
              icon={Lock}
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
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </Link>
            </div>

            <div className="space-y-3">
              <Button type="submit" isLoading={isLoading}>
                Sign in
              </Button>

              <Button variant="outline" type="button">
                <section className="flex items-center">
                  <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    className="w-5 h-5 mr-2"
                  />
                  Sign in with Google
                </section>
              </Button>
            </div>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:text-blue-500">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
    // </Layout>
  );
}
