import { AuthForm } from '../components/auth/AuthForm';
import { Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { ArrowLeft } from 'lucide-react';

export function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Container className="py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>
      </Container>

      <AuthForm />

      <Container className="py-4 text-center">
        <p className="text-gray-700">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </Container>
    </div>
  );
}
