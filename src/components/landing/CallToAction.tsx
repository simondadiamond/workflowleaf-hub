import { Link } from 'react-router-dom';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { motion } from 'framer-motion';

export function CallToAction() {
  return (
    <section className="py-20">
      <Container>
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Property Management Experience?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join MaintenanceFlow AI today and be part of the property management revolution.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Now
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Login
              </Button>
            </Link>
          </div>
          
          <div className="mt-16 bg-gray-50 p-8 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Early Access Benefits</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Shape the Platform</h4>
                <p className="text-gray-600">
                  Your feedback directly influences our development priorities.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Exclusive Updates</h4>
                <p className="text-gray-600">
                  Be the first to access new features as they become available.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Priority Support</h4>
                <p className="text-gray-600">
                  Dedicated assistance to ensure your success with the platform.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}