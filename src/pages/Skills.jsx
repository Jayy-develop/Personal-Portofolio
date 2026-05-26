<<<<<<< HEAD
import { motion } from "framer-motion";
import { Code2, Zap } from "lucide-react";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import localSkills from "@/config/skills";
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
  const skills = localSkills || [];

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
        {skills.length === 0 ? (
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

export default Skills;
=======
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, ArrowLeft, X } from 'lucide-react';
import { skillAPI } from '../services/api';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    skills: [],
  });
  const [skillInput, setSkillInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await skillAPI.getAll();
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
      alert('Error loading skills');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category || formData.skills.length === 0) {
      alert('Please fill in all fields and add at least one skill');
      return;
    }
    try {
      if (editingId) {
        await skillAPI.update(editingId, formData);
        alert('Skill category updated!');
      } else {
        await skillAPI.create(formData);
        alert('Skill category created!');
      }

      setShowForm(false);
      setEditingId(null);
      setFormData({ category: '', skills: [] });
      setSkillInput('');
      fetchSkills();
    } catch (error) {
      console.error('Error saving skill:', error);
      alert('Error saving skill');
    }
  };

  const handleEdit = (item) => {
    setFormData({
      category: item.category,
      skills: Array.isArray(item.skills) ? item.skills : []
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      try {
        await skillAPI.delete(id);
        alert('Skill category deleted!');
        fetchSkills();
      } catch (error) {
        console.error('Error deleting skill:', error);
        alert('Error deleting skill');
      }
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400 p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-4xl font-bold text-white">Skills Management</h1>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({ category: '', skills: [] });
              setSkillInput('');
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus className="w-5 h-5" />
            Add Skill Category
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId ? 'Edit Skill Category' : 'Add Skill Category'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category (e.g., Frontend, Backend, Tools)"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                required
              />

              <div>
                <label className="block text-gray-300 font-medium mb-2">Skills</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    placeholder="Enter skill and press Enter or click Add"
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-blue-600 text-white px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="hover:bg-blue-700 rounded-full p-1 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                >
                  {editingId ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({ category: '', skills: [] });
                    setSkillInput('');
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* List */}
        <div className="grid gap-6">
          {skills.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-8 text-center text-gray-400 border border-gray-700">
              No skill categories. Add one to get started!
            </div>
          ) : (
            skills.map(item => (
              <div key={item.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3">{item.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(item.skills) && item.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition"
                    >
                      <Edit2 className="w-5 h-5 text-white" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition"
                    >
                      <Trash2 className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
>>>>>>> 860324800f4424f00784c63bd8f8713db7790ba5
