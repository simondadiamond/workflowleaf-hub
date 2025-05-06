import { Container } from '../common/Container';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export function BenefitsSection() {
  const benefits = [
    {
      title: 'Effortless Tenant Maintenance Requests',
      description: 'Simple submission process for tenants that captures all necessary details.',
      isMVP: true,
    },
    {
      title: 'Intelligent Request Routing & Automation',
      description: 'Automatically categorize and route requests to the appropriate personnel.',
      isMVP: true,
    },
    {
      title: 'Centralized Communication Hub',
      description: 'One platform for all property-related communications between all stakeholders.',
      isMVP: false,
    },
    {
      title: 'Automated Lease & Document Management',
      description: 'Digital lease generation, renewals, and document storage with compliance checks.',
      isMVP: false,
    },
    {
      title: 'Actionable Performance Insights',
      description: 'Data-driven reports and analytics on key property management metrics.',
      isMVP: false,
    },
    {
      title: 'Enhanced Tenant Satisfaction',
      description: 'Faster response times and greater transparency leads to happier tenants.',
      isMVP: true,
    },
    {
      title: 'Reduced Administrative Overhead',
      description: 'Automation of routine tasks frees up time for higher-value activities.',
      isMVP: true,
    },
    {
      title: 'Scalable Solution for Growth',
      description: 'Easily manage additional properties as your portfolio expands.',
      isMVP: true,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <Container>
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Empowering Efficiency at Every Level
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            WorkflowLeaf transforms property management with tangible benefits for both property managers and tenants.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
            >
              <div className="flex items-start">
                <CheckCircle2 className="text-primary shrink-0 w-6 h-6 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {benefit.title}
                    {benefit.isMVP && (
                      <span className="ml-2 text-xs text-accent font-medium px-2 py-0.5 rounded-full bg-accent/10">
                        MVP
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
