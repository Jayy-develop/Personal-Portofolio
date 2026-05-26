import { motion } from 'framer-motion'
import { GraduationCap, Calendar, MapPin, BookOpen, Award, FileText, ExternalLink, Sparkles } from 'lucide-react'
import { ScrollAnimation } from '@/components/ScrollAnimation'
import localEducation from '@/config/education'

const Education = () => {
  const education = localEducation || []

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
            <GraduationCap className="w-8 h-8 text-indigo-400" />
            <h2 className="text-4xl font-bold gradient-text">Education</h2>
          </div>
          <p className="text-gray-400 text-lg max-w-3xl">
            My academic journey and technical foundation built through rigorous coursework and hands-on learning.
          </p>
        </div>
      </ScrollAnimation>

      {/* Education Cards */}
      <motion.div
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {education.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No education records yet.</p>
          </div>
        ) : (
          education.map((edu, index) => (
            <ScrollAnimation key={edu.id}>
              <motion.div
                variants={itemVariants}
                className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
              >
                <div className="grid md:grid-cols-[1fr,350px]">
                  {/* Left Column - Content */}
                  <div className="p-6 md:p-8 flex flex-col justify-between">
                    {/* Top Section */}
                    <div>
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-6">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-500/20 to-blue-500/20 group-hover:from-indigo-500/40 group-hover:to-blue-500/40 transition-all duration-300 flex-shrink-0">
                          <BookOpen className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-1 text-white group-hover:text-indigo-300 transition-colors">
                            {edu.title}
                          </h3>
                          <p className="text-indigo-400 font-semibold">{edu.institution}</p>
                        </div>
                      </div>

                      {/* Meta Information */}
                      <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-white/10">
                        {edu.duration && (
                          <div className="flex items-center gap-2 text-gray-300">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{edu.duration}</span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      {edu.description && (
                        <p className="text-gray-300 leading-relaxed mb-6">
                          {edu.description}
                        </p>
                      )}

                      {/* Achievement */}
                      {edu.achievement && (
                        <div className="mb-6">
                          <p className="text-sm font-semibold text-gray-200 mb-3">Achievement</p>
                          <p className="text-gray-300 text-sm">{edu.achievement}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column - Image */}
                  {edu.image && (
                    <div className="hidden md:block relative h-96 overflow-hidden bg-gradient-to-br from-indigo-500/20 to-blue-500/20">
                      <img
                        src={edu.image}
                        alt={edu.institution}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                    </div>
                  )}
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                </div>
              </motion.div>
            </ScrollAnimation>
          ))
        )}
      </motion.div>

      {/* Stats */}
      {education.length > 0 && (
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
                <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text mb-2">
                  {education.length}
                </div>
                <p className="text-gray-400">Educational Institutions</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text mb-2">
                  4+
                </div>
                <p className="text-gray-400">Years of Study</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text mb-2">
                  100%
                </div>
                <p className="text-gray-400">Academic Excellence</p>
              </div>
            </div>
          </motion.div>
        </ScrollAnimation>
      )}
    </div>
  )
}

export default Education
