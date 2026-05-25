import { motion } from "framer-motion";
import { Code2, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { getSkills } from "@/services/portfolioApi";
import {
  JavaScriptLogo,
  ReactLogo,
  TypeScriptLogo,
  NodeLogo,
  MongoDBLogo,
  VSCodeLogo,
  GitLogo,
  TailwindLogo,
  NextjsLogo,
  VercelLogo,
  PythonLogo,
  ReduxLogo,
  ExpressLogo,
  BcryptLogo,
  JWTLogo,
  AWSLogo,
  RenderLogo,
  PostmanLogo,
  BashLogo,
  WindowsLogo,
  UbuntuLogo,
  LinuxLogo,
} from "@/components/TechLogos";

// Map icon names to actual components
const iconMap = {
  JavaScriptLogo,
  ReactLogo,
  TypeScriptLogo,
  NodeLogo,
  MongoDBLogo,
  VSCodeLogo,
  GitLogo,
  TailwindLogo,
  NextjsLogo,
  VercelLogo,
  PythonLogo,
  ReduxLogo,
  ExpressLogo,
  BcryptLogo,
  JWTLogo,
  AWSLogo,
  RenderLogo,
  PostmanLogo,
  BashLogo,
  WindowsLogo,
  UbuntuLogo,
  LinuxLogo,
};

const getCategoryIcon = (iconName) => {
  return iconMap[iconName] || Code2;
};

const SkillIcon = ({ iconName, skillName }) => {
  const IconComponent = iconMap[iconName];
  
  if (!IconComponent) {
    return (
      <div className="w-8 h-8 flex items-center justify-center">
        <Code2 className="w-6 h-6 text-blue-400" />
      </div>
    );
  }

  return <IconComponent />;
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkills();
        setSkills(data || []);
      } catch (error) {
        console.error('Failed to fetch skills:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

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
            <Zap className="w-8 h-8 text-yellow-400" />
            <h2 className="text-4xl font-bold gradient-text">Skills & Expertise</h2>
          </div>
          <p className="text-gray-400 text-lg max-w-3xl">
            A comprehensive overview of my technical skills and tools I use to build modern web applications.
          </p>
        </div>
      </ScrollAnimation>

      {/* Skills Grid */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {loading ? (
          <div className="col-span-full text-center py-12 text-gray-400">Loading skills...</div>
        ) : skills.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-400">No skills added yet.</div>
        ) : (
          skills.map((category, index) => {
            const CategoryIcon = categoryIcons[category.icon] || Code2;
            
            return (
            <ScrollAnimation key={category.category}>
              <motion.div
                variants={itemVariants}
                className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl p-6 md:p-8 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/40 group-hover:to-purple-500/40 transition-all duration-300">
                    <CategoryIcon className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                    {category.category}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-3">
                  {category.skills.map((skill, idx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="group/skill flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <SkillIcon iconName={skill.icon} skillName={skill.name} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-300 group-hover/skill:text-white transition-colors truncate">
                          {skill.name}
                        </p>
                        <p className="text-xs text-gray-500">{skill.level}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                </div>
              </motion.div>
            </ScrollAnimation>
          );
        }))}
      </motion.div>

      {/* Stats Section */}
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
              <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-2">
                {skills.length}
              </div>
              <p className="text-gray-400">Skill Categories</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-2">
                {skills.reduce((acc, cat) => acc + cat.skills.length, 0)}+
              </div>
              <p className="text-gray-400">Technologies Mastered</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-2">
                5+
              </div>
              <p className="text-gray-400">Years of Learning</p>
            </div>
          </div>
        </motion.div>
      </ScrollAnimation>
    </div>
  );
};

// Category icons mapping
const categoryIcons = {
  'Code2': Code2,
  'Layout': Code2,
  'Server': Code2,
  'Database': Code2,
  'Cloud': Code2,
  'GitLogo': GitLogo,
  'Wrench': Code2,
};

export default Skills;
