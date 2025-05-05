import { AuthForm } from '../components/auth/AuthForm';
import { Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { ArrowLeft } from 'lucide-react';

export function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Container className="py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>
      </Container>
      
      <AuthForm />
    </div>
  );
}
