import Layout from "@/components/Layout";

export default function HomePage() {
  return (
    <Layout isAuthorized={false}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome to Ubuzima Connect</h1>
      <p className="text-lg text-gray-600">Your comprehensive healthcare management platform.</p>
    </div>
    </Layout>
  );
}