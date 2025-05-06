import { Container } from '../common/Container';
import { motion } from 'framer-motion';

export function ChallengeSection() {
  const challenges = [
    {
      title: 'Time-Consuming Tasks',
      description: 'Manual processing of maintenance requests and communications drains valuable time and resources.',
      icon: '⏱️',
    },
    {
      title: 'Communication Silos',
      description: 'Disconnected systems create barriers between property managers, maintenance teams, and tenants.',
      icon: '🔄',
    },
    {
      title: 'Reactive Maintenance',
      description: 'Without proper systems, property management becomes reactive rather than proactive.',
      icon: '🔧',
    },
    {
      title: 'Tenant Frustration',
      description: 'Slow response times and lack of transparency leads to tenant dissatisfaction and turnover.',
      icon: '😞',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            The Hurdles of Modern Property Management
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Property managers face unique challenges that impact efficiency, tenant satisfaction, and overall profitability.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {challenges.map((challenge, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="text-4xl mb-4">{challenge.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{challenge.title}</h3>
              <p className="text-gray-600">{challenge.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}