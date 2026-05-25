import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { getCertificates } from "@/services/portfolioApi";

const Certificates = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const data = await getCertificates();
        setCertificates(data || []);
      } catch (error) {
        console.error('Failed to fetch certificates:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  const categories = [...new Set(certificates.map(c => c.issuer))];

  const filteredCertificates = selectedCategory
    ? certificates.filter(c => c.issuer === selectedCategory)
    : certificates;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="min-h-screen pt-24 px-4 max-w-6xl mx-auto pb-20">
      {/* Header */}
      <ScrollAnimation>
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-8 h-8 text-yellow-400" />
            <h2 className="text-4xl font-bold gradient-text">Certificates & Achievements</h2>
          </div>
          <p className="text-gray-400 text-lg max-w-3xl">
            Professional certifications and achievements earned through continuous learning and skill development.
          </p>
        </div>
      </ScrollAnimation>

      {/* Filter Buttons */}
      {categories.length > 0 && (
        <ScrollAnimation>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-5 h-5 text-gray-400" />
              <p className="text-sm font-semibold text-gray-300">Filter by Issuer:</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === null
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                All ({certificates.length})
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      )}

      {/* Certificates Grid */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {loading ? (
          <div className="col-span-full text-center py-12 text-gray-400">Loading certificates...</div>
        ) : filteredCertificates.map((cert, index) => (
          <ScrollAnimation key={cert.id}>
            <motion.div
              variants={itemVariants}
              className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/10 flex flex-col"
            >
              {/* Image Badge */}
              {cert.image && (
                <div className="mb-4 h-24 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg overflow-hidden border border-yellow-500/30 flex items-center justify-center">
                  <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                </div>
              )}

              {/* Issuer Badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                  {cert.issuer}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                {/* Title */}
                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-yellow-300 transition-colors leading-tight">
                  {cert.title}
                </h3>

                {/* Date */}
                {cert.issued_date && (
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-4 pb-4 border-b border-white/10">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{cert.issued_date}</span>
                  </div>
                )}
              </div>

              {/* View Certificate Button */}
              {cert.credential_url && (
                <motion.a
                  href={cert.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium transition-all duration-300 group/link hover:shadow-lg hover:shadow-yellow-500/50"
                  whileHover={{ scale: 1.02 }}
                >
                  <span>View Certificate</span>
                  <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </motion.a>
              )}

              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
              </div>
            </motion.div>
          </ScrollAnimation>
        ))}
      </motion.div>

      {/* Empty State */}
      {!loading && filteredCertificates.length === 0 && (
        <ScrollAnimation>
          <div className="text-center py-20">
            <Award className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400 text-lg">No certificates found in this category.</p>
          </div>
        </ScrollAnimation>
      )}

      {/* Stats */}
      <ScrollAnimation>
        <motion.div
          className="mt-20 pt-20 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text mb-2">
                {certificates.length}
              </div>
              <p className="text-gray-400">Total Certificates</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text mb-2">
                {categories.length}
              </div>
              <p className="text-gray-400">Categories</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text mb-2">
                100%
              </div>
              <p className="text-gray-400">Completion Rate</p>
            </div>
          </div>
        </motion.div>
      </ScrollAnimation>
    </div>
  );
};

export default Certificates;
