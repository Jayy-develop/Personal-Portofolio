<<<<<<< HEAD
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
=======
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, ArrowLeft } from 'lucide-react';
import { educationAPI } from '../services/api';

export default function Education() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    institution: '',
    description: '',
    image: '',
    duration: '',
    achievement: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const response = await educationAPI.getAll();
      setEducation(response.data);
    } catch (error) {
      console.error('Error fetching education:', error);
      alert('Error loading education');
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
        await educationAPI.update(editingId, formData);
        alert('Education updated!');
      } else {
        await educationAPI.create(formData);
        alert('Education created!');
      }

      setShowForm(false);
      setEditingId(null);
      setFormData({
        title: '',
        institution: '',
        description: '',
        image: '',
        duration: '',
        achievement: '',
      });
      fetchEducation();
    } catch (error) {
      console.error('Error saving education:', error);
      alert('Error saving education');
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
        await educationAPI.delete(id);
        alert('Education deleted!');
        fetchEducation();
      } catch (error) {
        console.error('Error deleting education:', error);
        alert('Error deleting education');
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
            <h1 className="text-4xl font-bold text-white">Education Management</h1>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({
                title: '',
                institution: '',
                description: '',
                image: '',
                duration: '',
                achievement: '',
              });
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus className="w-5 h-5" />
            Add Education
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId ? 'Edit Education' : 'Add Education'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Education Title"
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                  required
                />
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  placeholder="Institution/School"
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                  required
                />
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 h-20"
              />
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Duration (e.g., 2020-2024)"
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                />
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Image URL"
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                />
              </div>
              <textarea
                name="achievement"
                value={formData.achievement}
                onChange={handleChange}
                placeholder="Achievement/Honors"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 h-16"
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
                      institution: '',
                      description: '',
                      image: '',
                      duration: '',
                      achievement: '',
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
          {education.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-8 text-center text-gray-400 border border-gray-700">
              No education records. Add one to get started!
            </div>
          ) : (
            education.map(item => (
              <div key={item.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-blue-400 text-sm">{item.institution}</p>
                    {item.duration && <p className="text-gray-400 text-sm mt-1">{item.duration}</p>}
                    {item.description && <p className="text-gray-300 mt-2">{item.description}</p>}
                    {item.achievement && <p className="text-yellow-400 text-sm mt-2">Achievement: {item.achievement}</p>}
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
