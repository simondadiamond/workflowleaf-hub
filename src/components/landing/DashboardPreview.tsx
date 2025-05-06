import { Container } from '../common/Container';
import { motion } from 'framer-motion';

export function DashboardPreview() {
  const mockData = [
    { unit: 'Apt 101', category: 'Plumbing', issue: 'No hot water', status: 'New' },
    { unit: 'Apt 203', category: 'Electrical', issue: 'Light fixture not working', status: 'Assigned' },
    { unit: 'Apt 305', category: 'HVAC', issue: 'AC not cooling properly', status: 'In Progress' },
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
            A Centralized Hub for Efficient Management
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Experience a unified dashboard that brings all property management tasks into one place.
          </motion.p>
        </div>

        <motion.div 
          className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="border-b border-gray-200 bg-primary text-white px-6 py-4">
            <h3 className="text-xl font-medium">Property Manager Dashboard</h3>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/3">
                <div className="bg-primary/5 p-5 rounded-lg border border-primary/20">
                  <h4 className="font-medium text-lg mb-4">Submit New Request</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                      <div className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-400 text-sm">
                        Select Unit
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <div className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-400 text-sm">
                        Select Category
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <div className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-400 text-sm h-20">
                        Enter description
                      </div>
                    </div>
                    <button className="w-full bg-primary text-white py-2 rounded-md font-medium">
                      Submit Request
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-2/3">
                <div className="mb-6">
                  <h4 className="font-medium text-lg mb-3">Open Requests</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockData.map((item, index) => (
                          <tr key={index}>
                            <td className="px-3 py-4 text-sm text-gray-900">{item.unit}</td>
                            <td className="px-3 py-4 text-sm text-gray-900">{item.category}</td>
                            <td className="px-3 py-4 text-sm text-gray-900">{item.issue}</td>
                            <td className="px-3 py-4 text-sm">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                item.status === 'New' ? 'bg-blue-100 text-blue-800' :
                                item.status === 'Assigned' ? 'bg-purple-100 text-purple-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">Routing Intelligence</h4>
                  <div className="text-sm text-blue-700">
                    <p className="mb-2">
                      <strong>Keywords detected:</strong> "no hot water"
                    </p>
                    <p>
                      <strong>Automatic categorization:</strong> <span className="font-medium">Plumbing</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}