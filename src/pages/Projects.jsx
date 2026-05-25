import { motion } from "framer-motion";
import { Github, ExternalLink, Code2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { getProjects } from "@/services/portfolioApi";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data || []);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

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
      <ScrollAnimation>
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="w-8 h-8 text-blue-400" />
            <h2 className="text-4xl font-bold gradient-text">Featured Projects</h2>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl">
            Explore my latest full-stack projects built with modern technologies and best practices.
          </p>
        </div>
      </ScrollAnimation>

      {projects.length === 0 ? (
        <ScrollAnimation>
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">{loading ? 'Loading projects...' : 'No projects yet. Check back soon!'}</p>
          </div>
        </ScrollAnimation>
      ) : (
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project, index) => (
            <ScrollAnimation key={project.id}>
              <motion.div
                variants={itemVariants}
                className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 hover:border-white/20 h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Code2 className="w-12 h-12 text-blue-500/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 flex-grow leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {Array.isArray(project.tags) && project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-gray-300 rounded border border-blue-500/30 hover:border-blue-500/50 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 pt-4 border-t border-white/10">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 group/link"
                        aria-label={`View ${project.title} source code`}
                      >
                        <Github className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                        <span className="text-sm font-medium">Code</span>
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 group/link"
                        aria-label={`View ${project.title} live demo`}
                      >
                        <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                        <span className="text-sm font-medium">Live</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                </div>
              </motion.div>
            </ScrollAnimation>
          ))}
        </motion.div>
      )}

      {/* CTA Section */}
      <ScrollAnimation>
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gray-400 mb-6">
            Want to see more? Check out my GitHub profile.
          </p>
          <a
            href="https://github.com/Jayy-develop"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 group"
          >
            <Github className="w-5 h-5" />
            <span>Explore More on GitHub</span>
          </a>
        </motion.div>
      </ScrollAnimation>
    </div>
  );
};

export default Projects;
