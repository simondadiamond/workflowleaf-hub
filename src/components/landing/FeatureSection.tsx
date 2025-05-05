import { Container } from '../common/Container';
import { motion } from 'framer-motion';

export function FeatureSection() {
  const features = [
    {
      title: 'MaintenanceFlow AI',
      subtitle: 'Intelligent Maintenance, Simplified',
      description: 'Seamless tenant request submission and intelligent routing to the right personnel. Our system automatically categorizes and prioritizes maintenance issues.',
      isMVP: true,
      image: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      title: 'TenantConnect',
      subtitle: 'Unified Communication & Support',
      description: 'Integrated communication channels for streamlined interaction between tenants and property managers. Centralize all tenant communications in one place.',
      isMVP: false,
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      title: 'Lease Management Automation',
      subtitle: 'Streamlined Documentation & Compliance',
      description: 'Automate lease generation, renewals, and ensure compliance with relevant regulations, including special considerations for Québec properties.',
      isMVP: false,
      image: 'https://images.pexels.com/photos/5673487/pexels-photo-5673487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      title: 'Performance Insights & Analytics',
      subtitle: 'Data-Driven Decision Making',
      description: 'Dashboards and reports providing actionable insights into key property metrics. Identify trends and opportunities for improvement.',
      isMVP: false,
      image: 'https://images.pexels.com/photos/7821738/pexels-photo-7821738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  return (
    <section className="py-20">
      <Container>
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Introducing the Intelligent Ecosystem for Property Management
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A comprehensive solution designed to address the unique challenges of modern property management.
          </motion.p>
        </div>

        <div className="space-y-20">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="lg:w-1/2">
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-full h-[300px] lg:h-[400px] object-cover"
                  />
                  {feature.isMVP ? (
                    <div className="absolute top-4 right-4 bg-accent text-white text-sm font-medium px-3 py-1 rounded-full shadow-sm">
                      Current MVP
                    </div>
                  ) : (
                    <div className="absolute top-4 right-4 bg-gray-800/60 text-white text-sm font-medium px-3 py-1 rounded-full shadow-sm">
                      Coming Soon
                    </div>
                  )}
                </div>
              </div>
              <div className="lg:w-1/2">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-primary font-medium mb-4">{feature.subtitle}</p>
                <p className="text-gray-600 text-lg mb-6">{feature.description}</p>
                
                {feature.isMVP ? (
                  <div className="inline-flex items-center text-sm font-medium text-accent">
                    Available Now
                  </div>
                ) : (
                  <div className="inline-flex items-center text-sm font-medium text-gray-500">
                    Available in Future Release
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
