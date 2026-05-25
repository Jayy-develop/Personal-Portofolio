<<<<<<< HEAD
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Building2,
  ExternalLink,
  Calendar,
  Award,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { getExperience } from "@/services/portfolioApi";

const Experience = () => {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const data = await getExperience();
        setExperience(data || []);
      } catch (error) {
        console.error('Failed to fetch experience:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchExperience();
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
    <div className="min-h-screen pt-24 px-4 max-w-5xl mx-auto pb-20">
      <ScrollAnimation>
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="w-8 h-8 text-emerald-400" />
            <h2 className="text-4xl font-bold gradient-text">Professional Experience</h2>
          </div>
          <p className="text-gray-400 text-lg max-w-3xl">
            My journey in tech through internships and professional roles, where I developed real-world skills and delivered impactful solutions.
          </p>
        </div>
      </ScrollAnimation>

      <motion.div
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Loading experience...</p>
          </div>
        ) : experience.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No experience records yet.</p>
          </div>
        ) : (
          experience.map((exp, index) => (
            <ScrollAnimation key={exp.id}>
              <motion.div
                variants={itemVariants}
                className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10"
              >
                <div className="grid md:grid-cols-[1fr,300px]">
                  {/* Left Content */}
                  <div className="p-6 md:p-8">
                    {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 group-hover:from-emerald-500/40 group-hover:to-teal-500/40 transition-all duration-300 flex-shrink-0">
                      <Building2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-1 text-white group-hover:text-emerald-300 transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-emerald-400 font-semibold">{exp.company}</p>
                    </div>
                  </div>

                  {/* Meta Information */}
                  <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{exp.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Award className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-emerald-400">{exp.type}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-3 mb-6">
                    {(Array.isArray(exp.description) ? exp.description : (exp.description || '').split('\n').filter(Boolean)).map((point, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex gap-3 text-gray-300"
                      >
                        <span className="text-emerald-400 mt-1">→</span>
                        <p className="leading-relaxed">{point}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(exp.skills) ? exp.skills : (exp.skills || '').split(',').map(s => s.trim()).filter(Boolean)).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-medium bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30 hover:border-emerald-500/50 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Image Section */}
                {exp.image && (
                  <div className="hidden md:block relative h-80 overflow-hidden bg-gradient-to-br from-emerald-500/20 to-teal-500/20">
                    <img
                      src={exp.image}
                      alt={exp.company}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                    {exp.certificateUrl && (
                      <a
                        href={exp.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all duration-300 group/cert"
                      >
                        <span>Certificate</span>
                        <ExternalLink className="w-4 h-4 group-hover/cert:scale-110 transition-transform" />
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
              </div>
            </motion.div>
          </ScrollAnimation>
        ))
        )}
      </motion.div>

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
              <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text mb-2">
                {experience.length}
              </div>
              <p className="text-gray-400">Internships & Roles</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text mb-2">
                {experience.reduce((acc, exp) => {
                  const months = exp.duration?.split(' ')[0];
                  return acc + parseInt(months || 0);
                }, 0)}+
              </div>
              <p className="text-gray-400">Months Experienced</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text mb-2">
                100%
              </div>
              <p className="text-gray-400">Success Rate</p>
            </div>
          </div>
        </motion.div>
      </ScrollAnimation>
    </div>
  );
};

export default Experience;
=======
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, ArrowLeft } from 'lucide-react';
import { experienceAPI } from '../services/api';

export default function Experience() {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    image: '',
    duration: '',
    location: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      const response = await experienceAPI.getAll();
      setExperience(response.data);
    } catch (error) {
      console.error('Error fetching experience:', error);
      alert('Error loading experience');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await experienceAPI.update(editingId, formData);
        alert('Experience updated!');
      } else {
        await experienceAPI.create(formData);
        alert('Experience created!');
      }

      setShowForm(false);
      setEditingId(null);
      setFormData({
        title: '',
        company: '',
        description: '',
        image: '',
        duration: '',
        location: '',
      });
      fetchExperience();
    } catch (error) {
      console.error('Error saving experience:', error);
      alert('Error saving experience');
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      try {
        await experienceAPI.delete(id);
        alert('Experience deleted!');
        fetchExperience();
      } catch (error) {
        console.error('Error deleting experience:', error);
        alert('Error deleting experience');
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
            <h1 className="text-4xl font-bold text-white">Experience Management</h1>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({
                title: '',
                company: '',
                description: '',
                image: '',
                duration: '',
                location: '',
              });
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus className="w-5 h-5" />
            Add Experience
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId ? 'Edit Experience' : 'Add Experience'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Job Title"
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                  required
                />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company Name"
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                  required
                />
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Job Description"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 h-20"
              />
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Duration (e.g., Jan 2020 - Dec 2023)"
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                />
              </div>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Company Logo/Image URL"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
              />
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
                    setFormData({
                      title: '',
                      company: '',
                      description: '',
                      image: '',
                      duration: '',
                      location: '',
                    });
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
          {experience.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-8 text-center text-gray-400 border border-gray-700">
              No experience records. Add one to get started!
            </div>
          ) : (
            experience.map(item => (
              <div key={item.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-purple-400 text-sm">{item.company}</p>
                    {item.duration && <p className="text-gray-400 text-sm mt-1">{item.duration}</p>}
                    {item.location && <p className="text-gray-400 text-sm">{item.location}</p>}
                    {item.description && <p className="text-gray-300 mt-2">{item.description}</p>}
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
